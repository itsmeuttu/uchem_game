import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { CHEMISTRY_QUESTIONS } from '../../data/questions';
import { ChemistryQuestion, ChemistryBranch, QuestionDifficulty } from '../../types/chemistry';
import { sound } from '../../utils/audio';
import { ChemFormula } from '../../utils/chemFormatter';
import { 
  BookOpen, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Filter, 
  ArrowLeft, 
  RotateCcw,
  Lightbulb
} from 'lucide-react';

export const JeePracticeBank: React.FC = () => {
  const { 
    setActiveRoute, 
    addXp, 
    recordQuestionResult, 
    bookmarkedQuestionIds, 
    toggleBookmark 
  } = useGame();

  const [selectedBranch, setSelectedBranch] = useState<'All' | ChemistryBranch>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | QuestionDifficulty>('All');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const filteredQuestions = CHEMISTRY_QUESTIONS.filter(q => {
    const matchBranch = selectedBranch === 'All' || q.branch === selectedBranch;
    const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    return matchBranch && matchDiff;
  });

  const question: ChemistryQuestion | undefined = filteredQuestions[currentIdx] || filteredQuestions[0];
  const isBookmarked = question ? bookmarkedQuestionIds.includes(question.id) : false;

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedAnswer(idx);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || isAnswerSubmitted || !question) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedAnswer === question.correctAnswer;
    recordQuestionResult(question.id, isCorrect, question.chapter);

    if (isCorrect) {
      sound.playCorrect();
      addXp(35, 'JEE Practice Problem Solved');
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playClick();
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setCurrentIdx(prev => (prev + 1) % filteredQuestions.length);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#151C2C] to-[#101522] border border-cyan-500/20">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            Verified Question Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            JEE Practice Question Engine
          </h1>
          <p className="text-xs text-[#9BA6BC]">
            Targeted drills by branch, difficulty, and chapter with comprehensive step-by-step solutions.
          </p>
        </div>

        <button
          onClick={() => setActiveRoute('home')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-[#151C2C] border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
        
        {/* Branch Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="font-bold text-gray-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            Branch:
          </span>
          {(['All', 'Physical', 'Organic', 'Inorganic'] as const).map(b => (
            <button
              key={b}
              onClick={() => {
                sound.playClick();
                setSelectedBranch(b);
                setCurrentIdx(0);
                setSelectedAnswer(null);
                setIsAnswerSubmitted(false);
              }}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                selectedBranch === b
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'bg-[#101522] text-gray-400 hover:text-white'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Difficulty Filters */}
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-gray-400 mr-1">Difficulty:</span>
          {(['All', 'JEE Main Easy', 'JEE Main Medium', 'JEE Advanced Hard'] as const).map(d => (
            <button
              key={d}
              onClick={() => {
                sound.playClick();
                setSelectedDifficulty(d);
                setCurrentIdx(0);
                setSelectedAnswer(null);
                setIsAnswerSubmitted(false);
              }}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer text-[11px] ${
                selectedDifficulty === d
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                  : 'bg-[#101522] text-gray-400 hover:text-white'
              }`}
            >
              {d.replace('JEE ', '')}
            </button>
          ))}
        </div>

      </div>

      {/* Question Card */}
      {question ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#151C2C] border border-white/10 space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/25 font-bold">
                {question.chapter}
              </span>
              <span className="text-gray-400 font-medium">
                {question.topic}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-gray-400 text-xs">
                {currentIdx + 1} / {filteredQuestions.length}
              </span>
              <button
                onClick={() => toggleBookmark(question.id)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-cyan-400 cursor-pointer"
                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            <ChemFormula formula={question.question} />
          </h2>

          {/* Hint Drawer */}
          {showHint && question.hints.length > 0 && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
              <strong className="text-amber-400">Conceptual Hint: </strong>
              {question.hints[0]}
            </div>
          )}

          {/* Options */}
          {question.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = isAnswerSubmitted && idx === question.correctAnswer;
                const isWrongSelected = isAnswerSubmitted && isSelected && !isCorrect;

                let borderStyle = 'border-white/10 hover:border-cyan-400/40 bg-[#101522] text-white';
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
                    className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer disabled:cursor-default ${borderStyle}`}
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

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 text-gray-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
            </button>

            <div className="flex items-center gap-3">
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 text-black shadow-lg cursor-pointer"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-400 to-violet-500 text-black shadow-lg cursor-pointer"
                >
                  <span>Next Question</span>
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Explanation Panel */}
          {isAnswerSubmitted && question.explanation && (
            <div className="p-5 rounded-2xl bg-[#080B12] border border-cyan-500/25 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <Sparkles className="w-4 h-4" />
                Step-by-Step Educational Solution
              </div>

              <p className="text-xs text-gray-200 leading-relaxed">
                {question.explanation.overview}
              </p>

              {question.explanation.stepByStep && (
                <div className="space-y-1 font-mono text-[11px] text-gray-300 bg-[#151C2C] p-3 rounded-xl border border-white/5">
                  {question.explanation.stepByStep.map((s, idx) => (
                    <p key={idx} className="leading-tight">
                      <span className="text-cyan-400 font-bold">• </span>
                      {s}
                    </p>
                  ))}
                </div>
              )}

              {question.explanation.commonTrap && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200">
                  <strong className="text-amber-400">Common JEE Trap: </strong>
                  {question.explanation.commonTrap}
                </div>
              )}
            </div>
          )}

        </div>
      ) : (
        <div className="p-12 text-center text-gray-400">
          No questions found with selected filter criteria.
        </div>
      )}

    </div>
  );
};
