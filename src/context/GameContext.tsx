import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { UserStats, Achievement, DailyQuest } from '../types/chemistry';
import { INITIAL_ACHIEVEMENTS, INITIAL_DAILY_QUESTS } from '../data/achievements';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

export type GameRoute = 
  | 'home'
  | 'battle-arena'
  | 'organic-lab'
  | 'physical-chemistry'
  | 'inorganic-chemistry'
  | 'escape-room'
  | 'molecular-builder'
  | 'jee-bank'
  | 'multiplayer'
  | 'virtual-lab'
  | 'find-mistake'
  | 'leaderboard'
  | 'profile';

interface NotificationToast {
  id: string;
  title: string;
  message: string;
  type: 'achievement' | 'level-up' | 'quest' | 'info';
}

interface GameContextType {
  activeRoute: GameRoute;
  setActiveRoute: (route: GameRoute) => void;
  stats: UserStats;
  achievements: Achievement[];
  dailyQuests: DailyQuest[];
  incorrectQuestionIds: string[];
  bookmarkedQuestionIds: string[];
  formulaSheetOpen: boolean;
  setFormulaSheetOpen: (open: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  notification: NotificationToast | null;
  addXp: (amount: number, reason?: string) => void;
  recordQuestionResult: (questionId: string, isCorrect: boolean, chapter?: string) => void;
  toggleBookmark: (questionId: string) => void;
  removeIncorrectQuestion: (questionId: string) => void;
  claimQuestReward: (questId: string) => void;
  triggerConfetti: () => void;
  updateQuestProgress: (gameRoute: string, increment?: number) => void;
  recordBossVictory: (bossId: string, badgeId: string) => void;
  recordEscapeRoomCleared: () => void;
  updateUsername: (name: string) => void;
  resetProgress: () => void;
}

const STORAGE_KEY = 'uchem_player_state_v1';

const getRankTitle = (level: number): string => {
  if (level === 1) return 'Atom';
  if (level === 2) return 'Molecule';
  if (level === 3) return 'Catalyst';
  if (level === 4) return 'Alchemist';
  if (level === 5) return 'Master Chemist';
  return 'Quantum JEE Titan';
};

const getLevelThreshold = (level: number): number => {
  if (level === 1) return 300;
  if (level === 2) return 800;
  if (level === 3) return 1600;
  if (level === 4) return 2600;
  if (level === 5) return 4000;
  return level * 1000;
};

const INITIAL_STATS: UserStats = {
  username: 'JEE Aspirant',
  rankTitle: 'Atom',
  level: 1,
  xp: 0,
  nextLevelXp: 300,
  questionsSolved: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  currentStreak: 0,
  bestStreak: 0,
  bossesDefeated: 0,
  escapeRoomsCleared: 0,
  accuracy: 100
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeRoute, setActiveRoute] = useState<GameRoute>('home');
  const [formulaSheetOpen, setFormulaSheetOpen] = useState(false);
  const [soundEnabled, setSoundEnabledState] = useState(true);
  const [notification, setNotification] = useState<NotificationToast | null>(null);

  // Load state from localStorage or initialize
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_stats');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_STATS;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_achievements');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_ACHIEVEMENTS;
  });

  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_quests');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_DAILY_QUESTS;
  });

  const [incorrectQuestionIds, setIncorrectQuestionIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_incorrect');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [];
  });

  const [bookmarkedQuestionIds, setBookmarkedQuestionIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [];
  });

  // Keep audio synchronized
  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
    sound.enabled = enabled;
  };

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_stats', JSON.stringify(stats));
      localStorage.setItem(STORAGE_KEY + '_achievements', JSON.stringify(achievements));
      localStorage.setItem(STORAGE_KEY + '_quests', JSON.stringify(dailyQuests));
      localStorage.setItem(STORAGE_KEY + '_incorrect', JSON.stringify(incorrectQuestionIds));
      localStorage.setItem(STORAGE_KEY + '_bookmarks', JSON.stringify(bookmarkedQuestionIds));
    } catch {
      // LocalStorage quota or privacy mode
    }
  }, [stats, achievements, dailyQuests, incorrectQuestionIds, bookmarkedQuestionIds]);

  const showNotification = useCallback((toast: NotificationToast) => {
    setNotification(toast);
    setTimeout(() => {
      setNotification(prev => (prev?.id === toast.id ? null : prev));
    }, 4000);
  }, []);

  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#42E8F5', '#8B5CF6', '#35D07F', '#FFC857']
      });
    } catch {
      // Ignore
    }
  }, []);

  const unlockAchievement = useCallback((achievementId: string) => {
    setAchievements(prev =>
      prev.map(item => {
        if (item.id === achievementId && !item.unlocked) {
          sound.playLevelUp();
          triggerConfetti();
          showNotification({
            id: 'ach-' + Date.now(),
            title: 'Achievement Unlocked!',
            message: `${item.title}: +${item.xpReward} XP`,
            type: 'achievement'
          });
          return { ...item, unlocked: true, progress: item.maxProgress };
        }
        return item;
      })
    );
  }, [showNotification, triggerConfetti]);

  const addXp = useCallback((amount: number, reason?: string) => {
    if (amount <= 0) return;
    setStats(prev => {
      let currentXp = prev.xp + amount;
      let currentLevel = prev.level;
      let threshold = getLevelThreshold(currentLevel);
      let leveledUp = false;

      while (currentXp >= threshold) {
        currentLevel += 1;
        threshold = getLevelThreshold(currentLevel);
        leveledUp = true;
      }

      if (leveledUp) {
        sound.playLevelUp();
        triggerConfetti();
        const newTitle = getRankTitle(currentLevel);
        showNotification({
          id: 'lvl-' + Date.now(),
          title: `Rank Up! Level ${currentLevel}`,
          message: `You attained the rank of ${newTitle}!`,
          type: 'level-up'
        });
      } else if (reason) {
        showNotification({
          id: 'xp-' + Date.now(),
          title: `+${amount} XP Gained`,
          message: reason,
          type: 'info'
        });
      }

      // Check level achievements
      if (currentLevel >= 4 || currentXp >= 2000) {
        unlockAchievement('badge-jee-topper');
      }

      return {
        ...prev,
        xp: currentXp,
        level: currentLevel,
        rankTitle: getRankTitle(currentLevel),
        nextLevelXp: threshold
      };
    });
  }, [showNotification, triggerConfetti, unlockAchievement]);

  const updateQuestProgress = useCallback((route: string, increment: number = 1) => {
    setDailyQuests(prev =>
      prev.map(q => {
        if (q.gameRoute === route && !q.completed) {
          const nextVal = Math.min(q.target, q.current + increment);
          const isDone = nextVal >= q.target;
          if (isDone && !q.completed) {
            showNotification({
              id: 'quest-' + Date.now(),
              title: 'Quest Completed!',
              message: `${q.title} ready to claim (+${q.xpReward} XP)`,
              type: 'quest'
            });
          }
          return {
            ...q,
            current: nextVal,
            completed: isDone
          };
        }
        return q;
      })
    );
  }, [showNotification]);

  const claimQuestReward = useCallback((questId: string) => {
    setDailyQuests(prev =>
      prev.map(q => {
        if (q.id === questId && q.completed && !q.claimed) {
          addXp(q.xpReward, `Completed quest: ${q.title}`);
          sound.playCorrect();
          return { ...q, claimed: true };
        }
        return q;
      })
    );
  }, [addXp]);

  const recordQuestionResult = useCallback((questionId: string, isCorrect: boolean) => {
    setStats(prev => {
      const nextSolved = prev.questionsSolved + 1;
      const nextCorrect = prev.correctAnswers + (isCorrect ? 1 : 0);
      const nextWrong = prev.wrongAnswers + (isCorrect ? 0 : 1);
      const nextStreak = isCorrect ? prev.currentStreak + 1 : 0;
      const nextBestStreak = Math.max(prev.bestStreak, nextStreak);
      const nextAccuracy = Math.round((nextCorrect / nextSolved) * 100);

      // Streak achievement check
      if (nextStreak >= 5) {
        unlockAchievement('badge-streak-master');
      }
      if (isCorrect && prev.questionsSolved === 0) {
        unlockAchievement('badge-first-solve');
      }

      return {
        ...prev,
        questionsSolved: nextSolved,
        correctAnswers: nextCorrect,
        wrongAnswers: nextWrong,
        currentStreak: nextStreak,
        bestStreak: nextBestStreak,
        accuracy: nextAccuracy
      };
    });

    if (isCorrect) {
      // Award base question XP with streak multiplier
      const baseXP = 30;
      addXp(baseXP);
      // Remove from revision list if previously incorrect
      setIncorrectQuestionIds(prev => prev.filter(id => id !== questionId));
    } else {
      // Add to revision list
      setIncorrectQuestionIds(prev => (prev.includes(questionId) ? prev : [...prev, questionId]));
    }
  }, [addXp, unlockAchievement]);

  const toggleBookmark = useCallback((questionId: string) => {
    sound.playClick();
    setBookmarkedQuestionIds(prev =>
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
    );
  }, []);

  const removeIncorrectQuestion = useCallback((questionId: string) => {
    setIncorrectQuestionIds(prev => prev.filter(id => id !== questionId));
  }, []);

  const recordBossVictory = useCallback((_bossId: string, badgeId: string) => {
    setStats(prev => ({
      ...prev,
      bossesDefeated: prev.bossesDefeated + 1
    }));
    unlockAchievement(badgeId);
    updateQuestProgress('battle-arena', 1);
  }, [unlockAchievement, updateQuestProgress]);

  const recordEscapeRoomCleared = useCallback(() => {
    setStats(prev => ({
      ...prev,
      escapeRoomsCleared: prev.escapeRoomsCleared + 1
    }));
    unlockAchievement('badge-escape-cleared');
    updateQuestProgress('escape-room', 1);
  }, [unlockAchievement, updateQuestProgress]);

  const updateUsername = useCallback((name: string) => {
    if (!name.trim()) return;
    setStats(prev => ({ ...prev, username: name.trim() }));
  }, []);

  const resetProgress = useCallback(() => {
    setStats(INITIAL_STATS);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setDailyQuests(INITIAL_DAILY_QUESTS);
    setIncorrectQuestionIds([]);
    setBookmarkedQuestionIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY + '_stats');
      localStorage.removeItem(STORAGE_KEY + '_achievements');
      localStorage.removeItem(STORAGE_KEY + '_quests');
      localStorage.removeItem(STORAGE_KEY + '_incorrect');
      localStorage.removeItem(STORAGE_KEY + '_bookmarks');
    } catch {
      // Ignore
    }
    showNotification({
      id: 'reset-' + Date.now(),
      title: 'Progress Reset',
      message: 'Clean state initialized successfully.',
      type: 'info'
    });
  }, [showNotification]);

  return (
    <GameContext.Provider
      value={{
        activeRoute,
        setActiveRoute,
        stats,
        achievements,
        dailyQuests,
        incorrectQuestionIds,
        bookmarkedQuestionIds,
        formulaSheetOpen,
        setFormulaSheetOpen,
        soundEnabled,
        setSoundEnabled,
        notification,
        addXp,
        recordQuestionResult,
        toggleBookmark,
        removeIncorrectQuestion,
        claimQuestReward,
        triggerConfetti,
        updateQuestProgress,
        recordBossVictory,
        recordEscapeRoomCleared,
        updateUsername,
        resetProgress
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
