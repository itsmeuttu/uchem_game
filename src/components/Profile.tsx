import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { CHEMISTRY_QUESTIONS } from '../data/questions';
import { sound } from '../utils/audio';
import { ChemFormula } from '../utils/chemFormatter';
import { 
  User, 
  Trophy, 
  Target, 
  Flame, 
  RotateCcw, 
  Bookmark, 
  BookX, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft, 
  Edit2, 
  Check, 
  Award,
  Layers,
  Swords,
  ShieldCheck
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { 
    setActiveRoute, 
    stats, 
    achievements, 
    incorrectQuestionIds, 
    bookmarkedQuestionIds, 
    removeIncorrectQuestion, 
    recordQuestionResult, 
    updateUsername,
    resetProgress 
  } = useGame();

  const [activeTab, setActiveTab] = useState<'overview' | 'revision' | 'bookmarks' | 'achievements'>('overview');
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(stats.username);

  // Retry question state in revision notebook
  const [retryingQuestionId, setRetryingQuestionId] = useState<string | null>(null);
  const [retryAnswer, setRetryAnswer] = useState<number | null>(null);

  const handleSaveName = () => {
    sound.playClick();
    updateUsername(nameInput);
    setIsEditingName(false);
  };

  const handleRetrySubmit = (qId: string, correctAns: number | string | number[]) => {
    if (retryAnswer === null) return;
    if (retryAnswer === correctAns) {
      sound.playCorrect();
      recordQuestionResult(qId, true);
      removeIncorrectQuestion(qId);
      setRetryingQuestionId(null);
      setRetryAnswer(null);
    } else {
      sound.playWrong();
    }
  };

  const incorrectQuestions = CHEMISTRY_QUESTIONS.filter(q => incorrectQuestionIds.includes(q.id));
  const bookmarkedQuestions = CHEMISTRY_QUESTIONS.filter(q => bookmarkedQuestionIds.includes(q.id));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#151C2C] via-[#101522] to-[#151C2C] border border-cyan-500/20 relative overflow-hidden">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-5">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-cyan-400 via-violet-500 to-emerald-400 p-0.5 shadow-xl shadow-cyan-500/20">
              <div className="w-full h-full rounded-2xl bg-[#080B12] flex items-center justify-center text-white">
                <User className="w-9 h-9 text-cyan-400" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={e => setNameInput(e.target.value)}
                      className="px-3 py-1 rounded-lg bg-[#080B12] border border-cyan-400 text-white font-bold text-base outline-none"
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-1.5 rounded-lg bg-cyan-400 text-black font-bold cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-black text-white">{stats.username}</h1>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="text-gray-400 hover:text-cyan-400 cursor-pointer"
                      title="Edit Username"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                  Level {stats.level} • {stats.rankTitle}
                </span>
                <span className="text-[#9BA6BC] font-mono">
                  {stats.xp} / {stats.nextLevelXp} XP
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveRoute('battle-arena')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-bold text-xs shadow-lg shadow-cyan-400/20 cursor-pointer flex items-center gap-2"
            >
              <Swords className="w-4 h-4" />
              Enter Arena
            </button>
            <button
              onClick={() => setActiveRoute('home')}
              className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Level XP Progress Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Current Progress</span>
            <span className="font-mono text-cyan-300 font-bold">
              {Math.min(100, Math.round((stats.xp / stats.nextLevelXp) * 100))}% to Next Rank
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-[#080B12] overflow-hidden p-0.5 border border-cyan-500/20">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${Math.min(100, (stats.xp / stats.nextLevelXp) * 100)}%` }}
            />
          </div>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('overview');
          }}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'overview'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'bg-[#151C2C] text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          Performance & Analytics
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('revision');
          }}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'revision'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              : 'bg-[#151C2C] text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          <BookX className="w-3.5 h-3.5" />
          Revision Notebook ({incorrectQuestions.length})
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('bookmarks');
          }}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'bookmarks'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-[#151C2C] text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          Bookmarks ({bookmarkedQuestions.length})
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('achievements');
          }}
          className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'achievements'
              ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
              : 'bg-[#151C2C] text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Achievements ({achievements.filter(a => a.unlocked).length} / {achievements.length})
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* 4 Stat Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#151C2C] border border-white/10 space-y-1">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Problems Solved</span>
              <p className="text-2xl font-mono font-black text-white">{stats.questionsSolved}</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#151C2C] border border-white/10 space-y-1">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Accuracy Rate</span>
              <p className="text-2xl font-mono font-black text-emerald-400">{stats.accuracy}%</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#151C2C] border border-white/10 space-y-1">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Current Streak</span>
              <p className="text-2xl font-mono font-black text-amber-400">{stats.currentStreak}🔥</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#151C2C] border border-white/10 space-y-1">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Bosses Defeated</span>
              <p className="text-2xl font-mono font-black text-cyan-400">{stats.bossesDefeated}</p>
            </div>
          </div>

          {/* Chemistry Branch Breakdown */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#151C2C] border border-white/10 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Syllabus Branch Mastery Breakdown
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Physical */}
              <div className="p-5 rounded-2xl bg-[#101522] border border-cyan-500/30 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-cyan-400">Physical Chemistry</span>
                  <span className="font-mono text-white font-bold">88%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#080B12] overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '88%' }} />
                </div>
                <p className="text-[11px] text-[#9BA6BC]">
                  Strong in Thermodynamics & Kinetics. Suggested review: Ionic Equilibrium buffer calculations.
                </p>
              </div>

              {/* Organic */}
              <div className="p-5 rounded-2xl bg-[#101522] border border-violet-500/30 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-violet-400">Organic Chemistry</span>
                  <span className="font-mono text-white font-bold">82%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#080B12] overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: '82%' }} />
                </div>
                <p className="text-[11px] text-[#9BA6BC]">
                  Proficient in Carbocation rearrangements & Aromatic substitutions. Practice multi-step synthesis.
                </p>
              </div>

              {/* Inorganic */}
              <div className="p-5 rounded-2xl bg-[#101522] border border-emerald-500/30 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-emerald-400">Inorganic Chemistry</span>
                  <span className="font-mono text-white font-bold">92%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#080B12] overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '92%' }} />
                </div>
                <p className="text-[11px] text-[#9BA6BC]">
                  High accuracy in Coordination CFT and Periodic Trends. Excellent retention of exceptions.
                </p>
              </div>

            </div>
          </div>

          {/* Reset Progress Section */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to reset your local progress to initial state?')) {
                  resetProgress();
                }
              }}
              className="text-xs text-rose-400/80 hover:text-rose-400 underline cursor-pointer"
            >
              Reset Local Progress Data
            </button>
          </div>

        </div>
      )}

      {/* Revision Notebook Tab */}
      {activeTab === 'revision' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#151C2C] border border-rose-500/20 text-xs text-[#9BA6BC]">
            Questions you missed during games are automatically stored here. Review the step-by-step logic and retry them to purge them from your notebook and reinforce weak concepts!
          </div>

          {incorrectQuestions.length === 0 ? (
            <div className="p-12 text-center text-gray-400 space-y-2 rounded-3xl bg-[#151C2C] border border-white/5">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <p className="font-bold text-white text-sm">Your Revision Notebook is Clean!</p>
              <p className="text-xs text-gray-400">All questions answered correctly or revised successfully.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {incorrectQuestions.map(q => (
                <div key={q.id} className="p-6 rounded-3xl bg-[#151C2C] border border-rose-500/30 space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="px-2.5 py-0.5 rounded bg-rose-500/15 text-rose-300 font-bold border border-rose-500/25">
                      {q.chapter}
                    </span>
                    <button
                      onClick={() => removeIncorrectQuestion(q.id)}
                      className="text-gray-400 hover:text-white cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>

                  <p className="text-sm font-bold text-white leading-relaxed">
                    <ChemFormula formula={q.question} />
                  </p>

                  {/* Retry Interface */}
                  {retryingQuestionId === q.id ? (
                    <div className="p-4 rounded-2xl bg-[#080B12] border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-cyan-400">Select Correct Answer:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options?.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => setRetryAnswer(idx)}
                            className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                              retryAnswer === idx ? 'border-cyan-400 bg-cyan-500/20 text-white' : 'border-white/10 text-gray-300'
                            }`}
                          >
                            <ChemFormula formula={opt} />
                          </button>
                        ))}
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setRetryingQuestionId(null)}
                          className="px-4 py-1.5 rounded-lg bg-white/5 text-xs text-gray-400 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleRetrySubmit(q.id, q.correctAnswer)}
                          className="px-4 py-1.5 rounded-lg bg-emerald-400 text-black font-bold text-xs cursor-pointer"
                        >
                          Submit Retry
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        sound.playClick();
                        setRetryingQuestionId(q.id);
                        setRetryAnswer(null);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/25 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Retry Question Now
                    </button>
                  )}

                  {/* Explanation */}
                  <div className="p-4 rounded-2xl bg-[#080B12] border border-white/5 text-xs space-y-2">
                    <strong className="text-cyan-400">Conceptual Explanation: </strong>
                    <p className="text-gray-300 leading-relaxed">{q.explanation.overview}</p>
                    {q.explanation.commonTrap && (
                      <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-[11px]">
                        <strong>Trap Warning: </strong> {q.explanation.commonTrap}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bookmarks Tab */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          {bookmarkedQuestions.length === 0 ? (
            <div className="p-12 text-center text-gray-400 space-y-2 rounded-3xl bg-[#151C2C] border border-white/5">
              <Bookmark className="w-10 h-10 text-amber-400 mx-auto" />
              <p className="font-bold text-white text-sm">No Bookmarks Saved Yet</p>
              <p className="text-xs text-gray-400">Bookmark challenging questions during practice to quickly revise them here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarkedQuestions.map(q => (
                <div key={q.id} className="p-5 rounded-2xl bg-[#151C2C] border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs text-cyan-400 font-bold">
                    <span>{q.chapter}</span>
                    <span className="text-gray-400">{q.difficulty}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    <ChemFormula formula={q.question} />
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed pt-1">
                    {q.explanation.overview}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map(ach => (
            <div
              key={ach.id}
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                ach.unlocked
                  ? 'bg-gradient-to-b from-[#151C2C] to-[#101522] border-cyan-400/40 shadow-lg shadow-cyan-400/5'
                  : 'bg-[#151C2C]/50 border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  ach.unlocked ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/40' : 'bg-white/5 text-gray-500'
                }`}>
                  <Award className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  ach.unlocked ? 'text-emerald-400' : 'text-gray-500'
                }`}>
                  {ach.unlocked ? 'Unlocked' : 'Locked'}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">{ach.title}</h4>
                <p className="text-xs text-[#9BA6BC] leading-relaxed mt-1">{ach.description}</p>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                <span className="font-mono text-amber-400 font-bold">+{ach.xpReward} XP</span>
                <span className="text-[10px] text-gray-400 capitalize">{ach.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
