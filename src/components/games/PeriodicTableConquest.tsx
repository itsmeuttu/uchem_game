import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { PERIODIC_ELEMENTS } from '../../data/elements';
import { PeriodicElement } from '../../types/chemistry';
import { sound } from '../../utils/audio';
import { 
  TableProperties, 
  Sparkles, 
  Info, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft,
  Flame,
  Zap
} from 'lucide-react';

export const PeriodicTableConquest: React.FC = () => {
  const { setActiveRoute, addXp, triggerConfetti, updateQuestProgress } = useGame();

  const [selectedElement, setSelectedElement] = useState<PeriodicElement>(PERIODIC_ELEMENTS[0]);
  const [colorMode, setColorMode] = useState<'category' | 'block' | 'electronegativity' | 'ionization'>('category');
  const [activeTab, setActiveTab] = useState<'explore' | 'quiz'>('explore');

  // Mini Quiz Mode State
  const [quizScore, setQuizScore] = useState(0);
  const [quizQuestionIdx, setQuizQuestionIdx] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);

  const QUIZ_CHALLENGES = [
    {
      question: 'Which element has the highest negative electron gain enthalpy in the entire periodic table?',
      options: ['Fluorine (F)', 'Chlorine (Cl)', 'Bromine (Br)', 'Oxygen (O)'],
      correct: 1,
      explanation: 'Chlorine releases -349 kJ/mol, exceeding Fluorine (-328 kJ/mol) because Fluorine suffers from strong inter-electronic repulsions in its compact 2p subshell.'
    },
    {
      question: 'Which alkali metal is the strongest reducing agent in aqueous solution?',
      options: ['Cesium (Cs)', 'Lithium (Li)', 'Sodium (Na)', 'Potassium (K)'],
      correct: 1,
      explanation: 'Lithium has the most negative standard reduction potential (E° = -3.04 V) due to its exceptionally high hydration enthalpy compensating for its high ionization energy.'
    },
    {
      question: 'Which element exhibits an anomalous ground-state electron configuration of [Ar] 3d5 4s1?',
      options: ['Manganese (Mn)', 'Chromium (Cr)', 'Vanadium (V)', 'Iron (Fe)'],
      correct: 1,
      explanation: 'Chromium has [Ar] 3d5 4s1 due to the extra exchange energy and symmetrical charge distribution of the exactly half-filled 3d subshell.'
    }
  ];

  const handleSelectElement = (el: PeriodicElement) => {
    sound.playClick();
    setSelectedElement(el);
    updateQuestProgress('inorganic-chemistry', 1);
  };

  const handleQuizAnswer = (idx: number) => {
    if (quizAnswered !== null) return;
    setQuizAnswered(idx);

    const q = QUIZ_CHALLENGES[quizQuestionIdx];
    if (idx === q.correct) {
      sound.playCorrect();
      setQuizScore(s => s + 1);
      addXp(60, 'Periodic Exception Quiz Solve');
      triggerConfetti();
    } else {
      sound.playWrong();
    }
  };

  const handleNextQuiz = () => {
    sound.playClick();
    setQuizAnswered(null);
    setQuizQuestionIdx(q => (q + 1) % QUIZ_CHALLENGES.length);
  };

  const getElementColor = (el: PeriodicElement) => {
    if (colorMode === 'block') {
      if (el.block === 's') return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      if (el.block === 'p') return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      if (el.block === 'd') return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
    if (colorMode === 'electronegativity') {
      const en = el.electronegativity || 1.0;
      if (en >= 3.0) return 'bg-rose-600/30 text-rose-200 border-rose-500/50';
      if (en >= 2.0) return 'bg-amber-500/30 text-amber-200 border-amber-500/50';
      return 'bg-cyan-500/20 text-cyan-200 border-cyan-500/40';
    }
    if (colorMode === 'ionization') {
      const ie = el.ionizationEnergy || 500;
      if (ie >= 1300) return 'bg-violet-600/30 text-violet-200 border-violet-500/50';
      if (ie >= 800) return 'bg-cyan-500/25 text-cyan-200 border-cyan-500/40';
      return 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40';
    }

    // Default category colors
    switch (el.category) {
      case 'alkali': return 'bg-rose-500/20 text-rose-300 border-rose-500/35';
      case 'alkaline-earth': return 'bg-amber-500/20 text-amber-300 border-amber-500/35';
      case 'transition': return 'bg-blue-500/20 text-blue-300 border-blue-500/35';
      case 'post-transition': return 'bg-teal-500/20 text-teal-300 border-teal-500/35';
      case 'metalloid': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/35';
      case 'nonmetal': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/35';
      case 'halogen': return 'bg-violet-500/20 text-violet-300 border-violet-500/35';
      case 'noble-gas': return 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/35';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/35';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#151C2C] to-[#101522] border border-cyan-500/20">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <TableProperties className="w-3.5 h-3.5" />
            Inorganic Chemistry Conquest
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Periodic Table Conquest
          </h1>
          <p className="text-xs text-[#9BA6BC]">
            Inspect atomic radii, ionization energies, electron configurations, and conquer JEE inorganic exceptions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-xl bg-[#080B12] p-1 border border-white/10 text-xs">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('explore');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                activeTab === 'explore' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:text-white'
              }`}
            >
              Explorer
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('quiz');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                activeTab === 'quiz' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:text-white'
              }`}
            >
              Exception Quiz
            </button>
          </div>

          <button
            onClick={() => setActiveRoute('home')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Exit
          </button>
        </div>
      </div>

      {activeTab === 'explore' ? (
        <div className="space-y-6">
          
          {/* Heatmap Mode Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#151C2C] border border-white/10 text-xs">
            <span className="font-bold text-gray-300">Highlight & Heatmap Mode:</span>
            
            <div className="flex flex-wrap gap-2">
              {(['category', 'block', 'electronegativity', 'ionization'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => {
                    sound.playClick();
                    setColorMode(mode);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer capitalize ${
                    colorMode === mode
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-[#101522] text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  {mode === 'category' ? 'Chemical Family' : 
                   mode === 'block' ? 'Orbital Block (s/p/d/f)' : 
                   mode === 'electronegativity' ? 'Electronegativity Trend' : 
                   'Ionization Energy Trend'}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Elements Grid */}
          <div className="p-6 rounded-3xl bg-[#151C2C] border border-white/10 space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Click any element to inspect its full JEE dossier</span>
              <span>Showing high-yield JEE elements</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-2">
              {PERIODIC_ELEMENTS.map(el => {
                const isSelected = selectedElement.number === el.number;
                const colorStyle = getElementColor(el);

                return (
                  <button
                    key={el.number}
                    onClick={() => handleSelectElement(el)}
                    className={`relative p-2 rounded-xl border flex flex-col items-center justify-between min-h-[64px] transition-all duration-150 cursor-pointer ${colorStyle} ${
                      isSelected ? 'ring-2 ring-cyan-400 scale-105 shadow-lg shadow-cyan-400/25' : 'hover:scale-102 hover:border-white/40'
                    }`}
                  >
                    <span className="text-[9px] font-mono opacity-70 self-start">{el.number}</span>
                    <span className="text-base font-black tracking-tight">{el.symbol}</span>
                    <span className="text-[8px] font-semibold truncate max-w-full">{el.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Element Dossier */}
          {selectedElement && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#151C2C] border border-cyan-500/30 space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border-2 border-cyan-400 flex flex-col items-center justify-center text-white shadow-xl shadow-cyan-500/20">
                    <span className="text-[10px] font-mono text-cyan-300">{selectedElement.number}</span>
                    <span className="text-2xl font-black">{selectedElement.symbol}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{selectedElement.name}</h3>
                    <p className="text-xs text-cyan-400 font-semibold capitalize">
                      {selectedElement.category.replace('-', ' ')} • {selectedElement.block}-block • Group {selectedElement.group}, Period {selectedElement.period}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-gray-400">Atomic Mass</span>
                  <p className="text-base font-mono font-bold text-white">{selectedElement.atomicMass} u</p>
                </div>
              </div>

              {/* Physical & Chemical Constants Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#080B12] border border-white/5 space-y-1">
                  <span className="text-gray-400">Electron Configuration</span>
                  <p className="font-mono font-bold text-cyan-300">{selectedElement.electronConfig}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#080B12] border border-white/5 space-y-1">
                  <span className="text-gray-400">Electronegativity (Pauling)</span>
                  <p className="font-mono font-bold text-amber-300">
                    {selectedElement.electronegativity ? `${selectedElement.electronegativity}` : 'N/A (Noble gas)'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#080B12] border border-white/5 space-y-1">
                  <span className="text-gray-400">First Ionization Enthalpy</span>
                  <p className="font-mono font-bold text-violet-300">{selectedElement.ionizationEnergy} kJ/mol</p>
                </div>

                <div className="p-3 rounded-xl bg-[#080B12] border border-white/5 space-y-1">
                  <span className="text-gray-400">Atomic Radius</span>
                  <p className="font-mono font-bold text-emerald-300">{selectedElement.atomicRadius} pm</p>
                </div>
              </div>

              {/* JEE Key Notes & Anomalies */}
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                  High-Yield JEE Key Notes & Anomalies
                </div>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                  {selectedElement.jeeKeyNotes}
                </p>
              </div>

            </div>
          )}

        </div>
      ) : (
        /* Exception Quiz Mode */
        <div className="p-6 sm:p-8 rounded-3xl bg-[#151C2C] border border-white/10 space-y-6">
          <div className="flex items-center justify-between text-xs pb-4 border-b border-white/10">
            <span className="font-bold text-cyan-400">Inorganic Exceptions Challenge</span>
            <span className="font-mono text-gray-300">Solved: {quizScore}</span>
          </div>

          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-white">
              {QUIZ_CHALLENGES[quizQuestionIdx].question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {QUIZ_CHALLENGES[quizQuestionIdx].options.map((opt, idx) => {
                const isSelected = quizAnswered === idx;
                const isCorrect = idx === QUIZ_CHALLENGES[quizQuestionIdx].correct;

                let btnStyle = 'border-white/10 hover:border-cyan-400/40 bg-[#101522] text-white';
                if (quizAnswered !== null) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-400 bg-emerald-500/20 text-emerald-300';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-500 bg-rose-500/20 text-rose-300';
                  } else {
                    btnStyle = 'border-white/5 opacity-40 bg-[#101522] text-gray-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(idx)}
                    disabled={quizAnswered !== null}
                    className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {quizAnswered !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {quizAnswered !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {quizAnswered !== null && (
            <div className="p-4 rounded-2xl bg-[#080B12] border border-cyan-500/20 space-y-3">
              <p className="text-xs text-gray-300 leading-relaxed">
                {QUIZ_CHALLENGES[quizQuestionIdx].explanation}
              </p>
              <button
                onClick={handleNextQuiz}
                className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold cursor-pointer"
              >
                Next Periodic Challenge →
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
