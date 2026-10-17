import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { BOSS_ENEMIES } from '../../data/bosses';
import { CHEMISTRY_QUESTIONS } from '../../data/questions';
import { BossEnemy } from '../../types/chemistry';
import { sound } from '../../utils/audio';
import { ChemFormula } from '../../utils/chemFormatter';
import { 
  Swords, 
  Heart, 
  Timer, 
  Flame, 
  HelpCircle, 
  FastForward, 
  Sparkles, 
  Trophy, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Lightbulb,
  Shield,
  Zap
} from 'lucide-react';

export const BattleArena: React.FC = () => {
  const { 
    setActiveRoute, 
    addXp, 
    recordQuestionResult, 
    recordBossVictory, 
    triggerConfetti 
  } = useGame();

  const [selectedBoss, setSelectedBoss] = useState<BossEnemy | null>(null);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [playerHp, setPlayerHp] = useState(100);
  const [bossHp, setBossHp] = useState(1000);
  const [timer, setTimer] = useState(35);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [combo, setCombo] = useState(1);
  const [showHint, setShowHint] = useState(false);
  const [battleWon, setBattleWon] = useState(false);
  const [battleLost, setBattleLost] = useState(false);
  const [attackAnimation, setAttackAnimation] = useState<'player' | 'boss' | null>(null);

  const startBossBattle = (boss: BossEnemy) => {
    sound.playClick();
    setSelectedBoss(boss);
    setCurrentStageIdx(0);
    setPlayerHp(100);
    setBossHp(boss.maxHealth);
    setTimer(35);
    setIsTimerActive(true);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setCombo(1);
    setShowHint(false);
    setBattleWon(false);
    setBattleLost(false);
    setAttackAnimation(null);
  };

  // Timer countdown
  useEffect(() => {
    if (!isTimerActive || isAnswerSubmitted || battleWon || battleLost) return;

    if (timer <= 0) {
      // Time out penalty
      handleTimeout();
      return;
    }

    const interval = setInterval(() => {
      setTimer(t => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isTimerActive, isAnswerSubmitted, battleWon, battleLost]);

  const handleTimeout = () => {
    sound.playWrong();
    setIsAnswerSubmitted(true);
    setPlayerHp(prev => Math.max(0, prev - 25));
    setCombo(1);
    setAttackAnimation('boss');
    setTimeout(() => setAttackAnimation(null), 800);

    if (playerHp - 25 <= 0) {
      setBattleLost(true);
      setIsTimerActive(false);
    }
  };

  // Current Question
  const currentStage = selectedBoss ? selectedBoss.stages[currentStageIdx] : null;
  const currentQuestion = currentStage
    ? CHEMISTRY_QUESTIONS.find(q => q.id === currentStage.questionId) || CHEMISTRY_QUESTIONS[0]
    : null;

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedAnswer(idx);
  };

  const handleUseHint = () => {
    if (showHint) return;
    sound.playClick();
    setShowHint(true);
  };

  const handleSkipQuestion = () => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    // Skip with minor damage penalty
    setPlayerHp(prev => Math.max(0, prev - 15));
    setCombo(1);
    advanceStage();
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || isAnswerSubmitted || !currentQuestion || !selectedBoss) return;

    setIsAnswerSubmitted(true);
    setIsTimerActive(false);

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    recordQuestionResult(currentQuestion.id, isCorrect, currentQuestion.chapter);

    if (isCorrect) {
      sound.playAttack();
      setTimeout(() => sound.playCorrect(), 200);

      const speedMultiplier = timer > 20 ? 1.3 : timer > 10 ? 1.1 : 1.0;
      const damagePerHit = Math.ceil(
        (selectedBoss.maxHealth / selectedBoss.stages.length) * (combo * 0.2 + 0.9)
      );

      setAttackAnimation('player');
      setTimeout(() => {
        setAttackAnimation(null);
        setBossHp(prev => {
          const next = Math.max(0, prev - damagePerHit);
          if (next <= 0) {
            handleVictory();
          }
          return next;
        });
      }, 600);

      setCombo(c => Math.min(5, c + 1));
      addXp(Math.round(40 * combo * speedMultiplier));
    } else {
      sound.playWrong();
      setCombo(1);
      setAttackAnimation('boss');
      setTimeout(() => {
        setAttackAnimation(null);
        setPlayerHp(prev => {
          const next = Math.max(0, prev - 25);
          if (next <= 0) {
            setBattleLost(true);
          }
          return next;
        });
      }, 600);
    }
  };

  const advanceStage = () => {
    if (!selectedBoss) return;
    if (currentStageIdx + 1 < selectedBoss.stages.length) {
      setCurrentStageIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
      setTimer(35);
      setIsTimerActive(true);
    } else {
      // If no more stages but boss still has HP, repeat or conclude
      if (bossHp <= 100) {
        handleVictory();
      } else {
        // Final strike round
        setCurrentStageIdx(0);
        setSelectedAnswer(null);
        setIsAnswerSubmitted(false);
        setShowHint(false);
        setTimer(35);
        setIsTimerActive(true);
      }
    }
  };

  const handleVictory = () => {
    if (!selectedBoss) return;
    setBattleWon(true);
    setIsTimerActive(false);
    triggerConfetti();
    sound.playLevelUp();
    addXp(selectedBoss.rewardXp, `Defeated Boss: ${selectedBoss.name}`);
    recordBossVictory(selectedBoss.id, selectedBoss.rewardBadgeId);
  };

  // If no boss selected, show Boss Selection Arena
  if (!selectedBoss) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
        
        {/* Arena Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#151C2C] via-[#101522] to-[#151C2C] border border-cyan-500/25 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Swords className="w-3.5 h-3.5" />
              Core Game Mode
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Chemistry Battle Arena
            </h1>
            <p className="text-sm text-[#9BA6BC] max-w-xl">
              Duel chapter-based JEE guardians. Answer high-yield conceptual problems to unleash devastating molecular attacks and claim legendary ranks.
            </p>
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <button
              onClick={() => setActiveRoute('home')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Return Home
            </button>
          </div>

          {/* Background Ambient Glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />
        </div>

        {/* Boss Cards Grid */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Select Your Opponent ({BOSS_ENEMIES.length} Guardians)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BOSS_ENEMIES.map(boss => (
              <div
                key={boss.id}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#151C2C] border border-white/10 hover:border-cyan-400/50 shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  
                  {/* Top tags */}
                  <div className="flex items-center justify-between">
                    <span 
                      className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                      style={{ 
                        backgroundColor: `${boss.accentColor}20`, 
                        color: boss.accentColor,
                        border: `1px solid ${boss.accentColor}40`
                      }}
                    >
                      {boss.branch} Chemistry
                    </span>
                    <span className="text-xs font-bold text-gray-400">
                      {boss.stages.length} Stages
                    </span>
                  </div>

                  {/* Boss Avatar & Info */}
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                      style={{ 
                        backgroundColor: `${boss.accentColor}15`,
                        border: `1px solid ${boss.accentColor}40`
                      }}
                    >
                      {boss.avatar === 'atom' && <Swords className="w-7 h-7 text-cyan-400" />}
                      {boss.avatar === 'scale' && <Shield className="w-7 h-7 text-emerald-400" />}
                      {boss.avatar === 'flask-conical' && <Sparkles className="w-7 h-7 text-violet-400" />}
                      {boss.avatar === 'zap' && <Zap className="w-7 h-7 text-amber-400" />}
                      {boss.avatar === 'shield' && <Shield className="w-7 h-7 text-cyan-400" />}
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {boss.name}
                      </h3>
                      <p className="text-xs font-medium text-cyan-400/80">
                        {boss.chapter}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#9BA6BC] leading-relaxed italic border-l-2 border-white/10 pl-3">
                    "{boss.dialogueIntro}"
                  </p>

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-gray-400">
                      <span>Guardian HP</span>
                      <span className="font-mono font-bold text-white">{boss.maxHealth} HP</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Victory Bounty</span>
                      <span className="font-mono font-bold text-amber-400">+{boss.rewardXp} XP</span>
                    </div>
                  </div>

                </div>

                <div className="pt-6">
                  <button
                    onClick={() => startBossBattle(boss)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-black shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all cursor-pointer"
                  >
                    <Swords className="w-4 h-4 fill-black" />
                    <span>Challenge Guardian</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  // Active Boss Battle HUD
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-200">
      
      {/* Top HUD Bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#151C2C] border border-white/10">
        
        <button
          onClick={() => {
            sound.playClick();
            setSelectedBoss(null);
          }}
          className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Arena</span>
        </button>

        <div className="flex items-center gap-4 text-xs">
          {/* Difficulty */}
          <span className="px-2.5 py-1 rounded bg-violet-500/15 text-violet-300 border border-violet-500/30 font-semibold">
            {currentQuestion?.difficulty}
          </span>

          {/* Combo Multiplier */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            <span>Combo x{combo.toFixed(1)}</span>
          </div>

          {/* Turn Timer */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono font-bold ${
            timer <= 10 
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse' 
              : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
          }`}>
            <Timer className="w-3.5 h-3.5" />
            <span>{timer}s</span>
          </div>
        </div>

      </div>

      {/* Duel Health Bars & Arena Stage */}
      <div className={`p-6 rounded-3xl bg-gradient-to-b from-[#151C2C] to-[#101522] border border-cyan-500/20 relative overflow-hidden transition-all duration-300 ${
        attackAnimation === 'boss' ? 'ring-2 ring-rose-500 animate-shake' : 
        attackAnimation === 'player' ? 'ring-2 ring-cyan-400' : ''
      }`}>
        
        {/* Opponent (Boss) Bar */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base">{selectedBoss.name}</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                Stage {currentStageIdx + 1} of {selectedBoss.stages.length}
              </span>
            </div>
            <span className="font-mono font-bold text-cyan-300">
              {bossHp} / {selectedBoss.maxHealth} HP
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-[#080B12] overflow-hidden p-0.5 border border-cyan-500/20">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-500"
              style={{ width: `${(bossHp / selectedBoss.maxHealth) * 100}%` }}
            />
          </div>

          {/* Boss Dialogue Pill */}
          <p className="text-xs text-[#9BA6BC] italic pt-1">
            "{currentStage?.dialogue}"
          </p>
        </div>

        {/* Player Bar */}
        <div className="space-y-2 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Your Health</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </div>
            <span className="font-mono font-bold text-emerald-400">
              {playerHp} / 100 HP
            </span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-[#080B12] overflow-hidden p-0.5 border border-white/10">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300"
              style={{ width: `${playerHp}%` }}
            />
          </div>
        </div>

      </div>

      {/* Victory State View */}
      {battleWon && (
        <div className="p-8 rounded-3xl bg-[#151C2C] border border-emerald-400/50 text-center space-y-4 animate-in zoom-in-95 duration-300 shadow-2xl shadow-emerald-500/20">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">Guardian Vanquished!</h2>
          <p className="text-xs text-[#9BA6BC] max-w-md mx-auto italic">
            "{selectedBoss.dialogueDefeat}"
          </p>
          <div className="p-4 rounded-2xl bg-[#080B12] border border-white/10 max-w-xs mx-auto text-xs space-y-1">
            <p className="text-gray-400">Bounty Earned</p>
            <p className="text-lg font-mono font-bold text-cyan-400">+{selectedBoss.rewardXp} XP</p>
          </div>
          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={() => setSelectedBoss(null)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-bold text-xs cursor-pointer shadow-lg shadow-cyan-400/20"
            >
              Continue to Arena
            </button>
          </div>
        </div>
      )}

      {/* Defeat State View */}
      {battleLost && (
        <div className="p-8 rounded-3xl bg-[#151C2C] border border-rose-500/50 text-center space-y-4 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">Defeat in Battle</h2>
          <p className="text-xs text-[#9BA6BC] max-w-md mx-auto">
            Your chemical equilibrium faltered. Revise the concepts and return to claim victory!
          </p>
          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={() => startBossBattle(selectedBoss)}
              className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs cursor-pointer"
            >
              Retry Boss Fight
            </button>
            <button
              onClick={() => setSelectedBoss(null)}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs cursor-pointer"
            >
              Exit to Menu
            </button>
          </div>
        </div>
      )}

      {/* Question & Options Section */}
      {!battleWon && !battleLost && currentQuestion && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#151C2C] border border-white/10 space-y-6">
          
          {/* Question Text */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-cyan-400/80 font-semibold">
              <span>{currentQuestion.chapter}</span>
              <span className="text-gray-400">{currentQuestion.source || 'JEE Main Model'}</span>
            </div>
            
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              <ChemFormula formula={currentQuestion.question} />
            </h3>
          </div>

          {/* Hint Drawer */}
          {showHint && currentQuestion.hints.length > 0 && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <Lightbulb className="w-4 h-4" />
                Conceptual Hint:
              </div>
              <p>{currentQuestion.hints[0]}</p>
            </div>
          )}

          {/* Options List */}
          {currentQuestion.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = isAnswerSubmitted && idx === currentQuestion.correctAnswer;
                const isWrongSelected = isAnswerSubmitted && isSelected && !isCorrect;

                let borderStyle = 'border-white/10 hover:border-cyan-400/40 bg-[#101522]';
                if (isSelected && !isAnswerSubmitted) {
                  borderStyle = 'border-cyan-400 bg-cyan-500/10 shadow-sm shadow-cyan-400/20';
                } else if (isCorrect) {
                  borderStyle = 'border-emerald-400 bg-emerald-500/15 text-emerald-300';
                } else if (isWrongSelected) {
                  borderStyle = 'border-rose-500 bg-rose-500/15 text-rose-300';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswerSubmitted}
                    className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all duration-150 flex items-start gap-3 cursor-pointer disabled:cursor-default ${borderStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 font-mono text-xs font-bold text-gray-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 pt-0.5 leading-normal">
                      <ChemFormula formula={opt} />
                    </span>
                    {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                    {isWrongSelected && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Action Bar (Hint, Skip, Submit) */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleUseHint}
                disabled={showHint || isAnswerSubmitted}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-40 text-xs font-semibold text-amber-300 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{showHint ? 'Hint Active' : 'Use Hint (-10 pts)'}</span>
              </button>

              <button
                onClick={handleSkipQuestion}
                disabled={isAnswerSubmitted}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-40 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <FastForward className="w-4 h-4" />
                <span>Skip (-15 HP)</span>
              </button>
            </div>

            <div>
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-black shadow-lg shadow-cyan-400/20 cursor-pointer"
                >
                  Confirm & Strike!
                </button>
              ) : (
                <button
                  onClick={advanceStage}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-400 to-violet-500 hover:from-cyan-300 hover:to-violet-400 text-black shadow-lg cursor-pointer"
                >
                  Proceed to Next Turn →
                </button>
              )}
            </div>

          </div>

          {/* Deep Conceptual Explanation Panel (Shown post answer) */}
          {isAnswerSubmitted && currentQuestion.explanation && (
            <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-[#0B0F19] border border-cyan-500/30 space-y-4 animate-in fade-in duration-300">
              
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <Sparkles className="w-4 h-4" />
                Detailed JEE Conceptual Breakdown
              </div>

              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                {currentQuestion.explanation.overview}
              </p>

              {currentQuestion.explanation.stepByStep && (
                <div className="space-y-1.5 text-xs text-[#9BA6BC] bg-[#151C2C]/50 p-3.5 rounded-xl border border-white/5 font-mono">
                  {currentQuestion.explanation.stepByStep.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              )}

              {currentQuestion.explanation.keyFormula && (
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-xs text-cyan-300 font-mono">
                  <strong className="text-white">Core Principle: </strong>
                  {currentQuestion.explanation.keyFormula}
                </div>
              )}

              {currentQuestion.explanation.commonTrap && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200">
                  <strong className="text-amber-400">JEE Coaching Trap Warning: </strong>
                  {currentQuestion.explanation.commonTrap}
                </div>
              )}

            </div>
          )}

        </div>
      )}

    </div>
  );
};
