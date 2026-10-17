import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ORGANIC_PUZZLES } from '../../data/reactions';
import { OrganicReactionPuzzle } from '../../types/chemistry';
import { sound } from '../../utils/audio';
import { ChemFormula } from '../../utils/chemFormatter';
import { 
  FlaskConical, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Trophy, 
  Lightbulb, 
  Layers,
  ArrowLeft
} from 'lucide-react';

export const ReactionMechanismLab: React.FC = () => {
  const { setActiveRoute, addXp, triggerConfetti, updateQuestProgress } = useGame();
  
  const [selectedPuzzle, setSelectedPuzzle] = useState<OrganicReactionPuzzle>(ORGANIC_PUZZLES[0]);
  const [selectedPathway, setSelectedPathway] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectPuzzle = (puzzle: OrganicReactionPuzzle) => {
    sound.playClick();
    setSelectedPuzzle(puzzle);
    setSelectedPathway([]);
    setErrorMessage(null);
    setIsCompleted(false);
  };

  const handleAddReagent = (reagentId: string) => {
    sound.playClick();
    setErrorMessage(null);

    // Check if step is already filled
    const currentStep = selectedPathway.length;
    const expectedReagentId = selectedPuzzle.correctPathway[currentStep];

    if (reagentId === expectedReagentId) {
      sound.playCorrect();
      const nextPathway = [...selectedPathway, reagentId];
      setSelectedPathway(nextPathway);

      // Check if complete
      if (nextPathway.length === selectedPuzzle.correctPathway.length) {
        setIsCompleted(true);
        triggerConfetti();
        sound.playLevelUp();
        addXp(200, `Completed Synthesis: ${selectedPuzzle.name}`);
        updateQuestProgress('organic-lab', 1);
      }
    } else {
      sound.playWrong();
      // Provide conceptual hint from commonMistakes or role
      const mistake = selectedPuzzle.commonMistakes.find(m => m.reagentId === reagentId);
      if (mistake) {
        setErrorMessage(mistake.whyWrong);
      } else {
        const reagentInfo = selectedPuzzle.availableReagents.find(r => r.id === reagentId);
        setErrorMessage(`Incompatible Step: ${reagentInfo?.name} operates via ${reagentInfo?.role}, which does not yield the required intermediate at Step ${currentStep + 1}.`);
      }
    }
  };

  const handleReset = () => {
    sound.playClick();
    setSelectedPathway([]);
    setErrorMessage(null);
    setIsCompleted(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#151C2C] to-[#101522] border border-violet-500/25">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5" />
            Organic Synthesis & Mechanism Lab
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Reaction Mechanism Lab
          </h1>
          <p className="text-xs sm:text-sm text-[#9BA6BC] max-w-xl">
            Synthesize complex target molecules by selecting the exact reagents, intermediates, and reaction mechanisms (SN1, SN2, E1, E2, Friedel-Crafts, Grignard).
          </p>
        </div>

        <button
          onClick={() => setActiveRoute('home')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </button>
      </div>

      {/* Synthesis Puzzle Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {ORGANIC_PUZZLES.map(p => (
          <button
            key={p.id}
            onClick={() => handleSelectPuzzle(p)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              selectedPuzzle.id === p.id
                ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40 shadow-sm shadow-violet-500/20'
                : 'bg-[#151C2C] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{p.name}</span>
          </button>
        ))}
      </div>

      {/* Target & Pathway Canvas */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#151C2C] border border-white/10 space-y-6">
        
        {/* Goal Indicator */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">
              Target Compound to Synthesize
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              <ChemFormula formula={selectedPuzzle.targetMolecule} />
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/30">
              {selectedPuzzle.difficulty}
            </span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Pathway
            </button>
          </div>
        </div>

        {/* Visual Multi-Step Pathway Pipeline */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Current Synthetic Sequence ({selectedPathway.length} / {selectedPuzzle.correctPathway.length} Steps)
          </span>

          <div className="flex flex-col md:flex-row items-center gap-3 overflow-x-auto p-4 rounded-2xl bg-[#080B12] border border-white/10 min-h-[140px]">
            
            {/* Starting Molecule */}
            <div className="p-4 rounded-xl bg-[#151C2C] border border-cyan-400/40 text-center min-w-[150px] shadow-lg shadow-cyan-500/10">
              <span className="text-[10px] font-bold text-cyan-400 uppercase">Starting Material</span>
              <p className="text-sm font-bold text-white mt-1">
                <ChemFormula formula={selectedPuzzle.startingMolecule.name} />
              </p>
              <p className="text-xs font-mono text-cyan-300">
                <ChemFormula formula={selectedPuzzle.startingMolecule.formula} />
              </p>
            </div>

            {/* Sequence Steps */}
            {selectedPuzzle.correctPathway.map((reagentId, idx) => {
              const isFilled = selectedPathway.length > idx;
              const reagent = selectedPuzzle.availableReagents.find(r => r.id === reagentId);
              const intermediate = selectedPuzzle.intermediates[idx];

              return (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center justify-center shrink-0 text-cyan-400">
                    <ArrowRight className="w-5 h-5 hidden md:block" />
                    <span className="text-[10px] font-mono font-bold text-gray-500 md:hidden">↓</span>
                    {isFilled && (
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 mt-1 max-w-[120px] truncate text-center">
                        {reagent?.formula}
                      </span>
                    )}
                  </div>

                  {/* Intermediate Node */}
                  <div className={`p-4 rounded-xl text-center min-w-[170px] border transition-all ${
                    isFilled
                      ? 'bg-emerald-500/10 border-emerald-400/50 text-white shadow-lg shadow-emerald-500/10'
                      : 'bg-white/5 border-dashed border-white/20 text-gray-500'
                  }`}>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Step {idx + 1} {idx + 1 === selectedPuzzle.correctPathway.length ? 'Final Product' : 'Intermediate'}
                    </span>
                    {isFilled ? (
                      <div className="mt-1">
                        <p className="text-xs font-bold text-emerald-300">{intermediate?.name}</p>
                        <p className="text-[11px] font-mono text-gray-300">{intermediate?.formula}</p>
                        <p className="text-[10px] text-gray-400 mt-1 leading-tight">{intermediate?.explanation}</p>
                      </div>
                    ) : (
                      <p className="text-xs font-medium text-gray-500 mt-2 italic">
                        Select Reagent to Form
                      </p>
                    )}
                  </div>
                </React.Fragment>
              );
            })}

          </div>
        </div>

        {/* Conceptual Error / Feedback Alert */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-3 animate-in shake duration-200">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-300">Mechanism Warning & Conceptual Tip:</p>
              <p className="mt-0.5 leading-relaxed">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Reagent Selector Tray */}
        {!isCompleted ? (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                Laboratory Reagents & Catalysts Tray (Choose Step {selectedPathway.length + 1})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedPuzzle.availableReagents.map(reagent => {
                return (
                  <button
                    key={reagent.id}
                    onClick={() => handleAddReagent(reagent.id)}
                    className="p-4 rounded-2xl bg-[#101522] border border-white/10 hover:border-violet-400/50 hover:bg-violet-500/10 text-left transition-all duration-200 cursor-pointer group space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-300 group-hover:text-cyan-200">
                        {reagent.formula}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-white/5 text-gray-400 group-hover:text-white">
                        React
                      </span>
                    </div>

                    <p className="text-xs font-bold text-white group-hover:text-violet-200">
                      {reagent.name}
                    </p>

                    <p className="text-[11px] text-[#9BA6BC] leading-relaxed">
                      {reagent.role}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Victory Completion Panel */
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-[#101522] to-cyan-500/15 border border-emerald-400/40 text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <Trophy className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-black text-white">Synthesis Completed Successfully!</h3>
            
            <p className="text-xs text-gray-300 max-w-xl mx-auto leading-relaxed">
              {selectedPuzzle.finalExplanation}
            </p>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white cursor-pointer"
              >
                Replay Synthesis
              </button>
              <button
                onClick={() => {
                  const nextIdx = (ORGANIC_PUZZLES.findIndex(p => p.id === selectedPuzzle.id) + 1) % ORGANIC_PUZZLES.length;
                  handleSelectPuzzle(ORGANIC_PUZZLES[nextIdx]);
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-black text-xs font-bold shadow-lg cursor-pointer"
              >
                Next Organic Challenge →
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
