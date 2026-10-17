import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { CHEMISTRY_QUESTIONS } from '../../data/questions';
import { ChemistryQuestion } from '../../types/chemistry';
import { sound } from '../../utils/audio';
import { ChemFormula } from '../../utils/chemFormatter';
import { 
  Calculator, 
  Timer, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowLeft, 
  Sparkles, 
  Flame, 
  BookOpen, 
  RotateCcw 
} from 'lucide-react';

export const NumericalSpeedrun: React.FC = () => {
  const { 
    setActiveRoute, 
    addXp, 
    recordQuestionResult, 
    setFormulaSheetOpen, 
    triggerConfetti,
    updateQuestProgress 
  } = useGame();

  // Filter physical numerical questions and add more high-yield physical challenges
  const physicalQuestions: ChemistryQuestion[] = CHEMISTRY_QUESTIONS.filter(
    q => q.branch === 'Physical'
  );

  const [currentIdx, setCurrentIdx] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [timer, setTimer] = useState(45);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const currentQ = physicalQuestions[currentIdx] || physicalQuestions[0];

  useEffect(() => {
    if (!isTimerRunning || isSubmitted) return;
    if (timer <= 0) {
      handleTimeExpire();
      return;
    }
    const timerInterval = setInterval(() => {
      setTimer(t => t - 1);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [timer, isTimerRunning, isSubmitted]);

  const handleTimeExpire = () => {
    sound.playWrong();
    setIsSubmitted(true);
    setIsCorrect(false);
    setStreak(0);
  };

  const handleKeypadPress = (val: string) => {
    if (isSubmitted) return;
    sound.playClick();
    if (val === 'C') {
      setInputValue('');
    } else if (val === 'DEL') {
      setInputValue(prev => prev.slice(0, -1));
    } else {
      setInputValue(prev => prev + val);
    }
  };

  const handleSubmit = (overrideChoice?: number) => {
    if (isSubmitted) return;

    let correct = false;
    if (currentQ.format === 'numerical') {
      const userNum = parseFloat(inputValue.trim());
      const targetNum = parseFloat(currentQ.correctAnswer as string);
      const tol = currentQ.tolerance || 0.05 * Math.abs(targetNum);
      correct = !isNaN(userNum) && Math.abs(userNum - targetNum) <= tol;
    } else {
      correct = overrideChoice === currentQ.correctAnswer;
    }

    setIsSubmitted(true);
    setIsCorrect(correct);
    recordQuestionResult(currentQ.id, correct, currentQ.chapter);

    if (correct) {
      sound.playCorrect();
      setStreak(s => s + 1);
      const speedBonus = timer > 30 ? 1.5 : timer > 15 ? 1.2 : 1.0;
      addXp(Math.round(50 * speedBonus), 'Physical Numerical Speedrun Solve');
      updateQuestProgress('physical-chemistry', 1);

      if (streak + 1 >= 3) {
        triggerConfetti();
      }
    } else {
      sound.playWrong();
      setStreak(0);
    }
  };

  const handleNext = () => {
    sound.playClick();
    const nextIndex = (currentIdx + 1) % physicalQuestions.length;
    setCurrentIdx(nextIndex);
    setInputValue('');
    setTimer(45);
    setIsTimerRunning(true);
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#151C2C] to-[#101522] border border-cyan-500/20">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            Physical Chemistry Speedrun
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Numerical Speedrun
          </h1>
          <p className="text-xs text-[#9BA6BC]">
            Rapid calculation rounds with scientific decimal inputs, tolerance checks, and step-by-step derivations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setFormulaSheetOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/25 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Formulas
          </button>
          <button
            onClick={() => setActiveRoute('home')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Exit
          </button>
        </div>
      </div>

      {/* Speedrun HUD Status */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#151C2C] border border-white/10 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white">Question {currentIdx + 1} of {physicalQuestions.length}</span>
          <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 font-semibold">
            {currentQ.chapter}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            <span>Streak: {streak}</span>
          </div>

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

      {/* Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#151C2C] border border-white/10 space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
            {currentQ.topic}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            <ChemFormula formula={currentQ.question} />
          </h2>
        </div>

        {/* Hints */}
        {showHint && currentQ.hints.length > 0 && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
            <strong className="text-amber-400">Hint:</strong> {currentQ.hints[0]}
          </div>
        )}

        {/* Input Mode: Either Multiple Choice or Numerical Keypad */}
        {currentQ.format === 'single-choice' && currentQ.options ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, idx) => {
              const isCorrectOpt = isSubmitted && idx === currentQ.correctAnswer;

              return (
                <button
                  key={idx}
                  onClick={() => handleSubmit(idx)}
                  disabled={isSubmitted}
                  className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                    isCorrectOpt
                      ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300'
                      : isSubmitted
                      ? 'border-white/5 opacity-50 bg-[#101522]'
                      : 'border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 bg-[#101522] text-white'
                  }`}
                >
                  <ChemFormula formula={opt} />
                  {isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        ) : (
          /* Numerical Keypad Mode */
          <div className="space-y-4 max-w-sm mx-auto">
            
            {/* Input Display */}
            <div className="p-3.5 rounded-xl bg-[#080B12] border border-cyan-500/30 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono">Value:</span>
              <div className="flex items-center gap-1.5 font-mono text-xl font-bold text-cyan-300">
                <span>{inputValue || '0'}</span>
                {currentQ.units && <span className="text-xs text-gray-400">{currentQ.units}</span>}
              </div>
            </div>

            {/* Scientific Keypad */}
            {!isSubmitted && (
              <div className="grid grid-cols-3 gap-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '-'].map(key => (
                  <button
                    key={key}
                    onClick={() => handleKeypadPress(key)}
                    className="py-3 rounded-xl bg-[#101522] hover:bg-white/10 border border-white/10 text-sm font-bold text-white transition-colors cursor-pointer"
                  >
                    {key}
                  </button>
                ))}
                <button
                  onClick={() => handleKeypadPress('DEL')}
                  className="py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 transition-colors cursor-pointer"
                >
                  DEL
                </button>
                <button
                  onClick={() => handleKeypadPress('C')}
                  className="py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-bold text-rose-300 transition-colors cursor-pointer"
                >
                  CLEAR
                </button>
                <button
                  onClick={() => handleSubmit()}
                  disabled={!inputValue.trim()}
                  className="py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 disabled:opacity-40 text-xs font-black text-black shadow-lg shadow-cyan-400/20 cursor-pointer"
                >
                  SUBMIT
                </button>
              </div>
            )}

          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
          <button
            onClick={() => setShowHint(true)}
            disabled={showHint || isSubmitted}
            className="flex items-center gap-1.5 text-gray-400 hover:text-amber-300 transition-colors cursor-pointer disabled:opacity-40"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Need a Hint?</span>
          </button>

          {isSubmitted && (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-bold text-xs shadow-lg cursor-pointer"
            >
              <span>Next Problem</span>
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Step-by-Step Derivation Breakdown */}
        {isSubmitted && (
          <div className="p-5 rounded-2xl bg-[#080B12] border border-cyan-500/30 space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Correct Answer! Precise Calculation.</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                  <XCircle className="w-4 h-4" />
                  <span>Incorrect. Correct value: {String(currentQ.correctAnswer)} {currentQ.units || ''}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-gray-200 leading-relaxed">
              {currentQ.explanation.overview}
            </p>

            {currentQ.explanation.stepByStep && (
              <div className="space-y-1 font-mono text-[11px] text-gray-300 bg-[#151C2C] p-3 rounded-xl border border-white/5">
                {currentQ.explanation.stepByStep.map((s, idx) => (
                  <p key={idx} className="leading-tight">
                    <span className="text-cyan-400 font-bold">• </span>
                    {s}
                  </p>
                ))}
              </div>
            )}

            {currentQ.explanation.commonTrap && (
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
                <strong className="text-amber-400">JEE Unit / Calculation Trap: </strong>
                {currentQ.explanation.commonTrap}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
