import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/audio';
import { ChemFormula } from '../../utils/chemFormatter';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  Sparkles, 
  Trophy, 
  RotateCcw,
  SearchCheck
} from 'lucide-react';

interface MistakeChallenge {
  id: string;
  title: string;
  chapter: string;
  problem: string;
  studentSteps: {
    stepNum: number;
    text: string;
    isError: boolean;
    explanationIfError?: string;
  }[];
  verdict: string;
}

const MISTAKE_CHALLENGES: MistakeChallenge[] = [
  {
    id: 'trap-ph-10-8',
    title: 'The Dilute Strong Acid Fallacy',
    chapter: 'Ionic Equilibrium',
    problem: 'Calculate the pH of a 10⁻⁸ M aqueous solution of HCl at 298 K.',
    studentSteps: [
      { stepNum: 1, text: 'HCl is a strong acid that undergoes 100% dissociation: HCl -> H+ + Cl-.', isError: false },
      { stepNum: 2, text: 'Therefore, the concentration of hydrogen ions [H+] = 10⁻⁸ M.', isError: false },
      { stepNum: 3, text: 'pH = -log10[H+] = -log10(10⁻⁸) = 8.00.', isError: true, explanationIfError: 'Flawed step! An acid dissolved in water cannot have a basic pH > 7. At concentrations ≤ 10⁻⁶ M, the contribution of H+ from water auto-ionization (10⁻⁷ M) cannot be neglected!' },
      { stepNum: 4, text: 'Conclusion: The solution of HCl is slightly basic with pH = 8.', isError: false }
    ],
    verdict: 'Total [H+] = [H+]_HCl + [H+]_H2O = 10⁻⁸ + 10⁻⁷ = 1.1 × 10⁻⁷ M => pH = -log(1.1 × 10⁻⁷) ≈ 6.96 (slightly acidic, exactly as required by nature).'
  },
  {
    id: 'trap-carbocation',
    title: 'The Forgotten Carbocation Rearrangement',
    chapter: 'Hydrocarbons & Carbocations',
    problem: 'Predict the major product when 3,3-dimethylbut-1-ene reacts with concentrated aqueous HBr.',
    studentSteps: [
      { stepNum: 1, text: 'Electrophilic addition starts with proton (H+) attack on the double bond.', isError: false },
      { stepNum: 2, text: 'H+ adds to C1 according to Markovnikov\'s rule to form a secondary carbocation at C2: (CH3)3C-CH(+)-CH3.', isError: false },
      { stepNum: 3, text: 'Bromide ion (Br-) immediately attacks the secondary carbocation to yield 2-bromo-3,3-dimethylbutane as the major product.', isError: true, explanationIfError: 'Flawed step! Secondary carbocations adjacent to quaternary carbons undergo rapid 1,2-methyl shifts to form the far more stable tertiary carbocation (CH3)2C(+)-CH(CH3)2 before nucleophilic capture by bromide!' },
      { stepNum: 4, text: 'Final product: 2-bromo-3,3-dimethylbutane.', isError: false }
    ],
    verdict: 'The true major product is 2-bromo-2,3-dimethylbutane formed via 1,2-methyl shift to a tertiary carbocation with 7 hyperconjugative hydrogens.'
  },
  {
    id: 'trap-octet-ncl5',
    title: 'The Non-Existent Pentavalent Nitrogen',
    chapter: 'Chemical Bonding & Periodicity',
    problem: 'Explain why PCl5 exists as a stable molecule, but NCl5 does not.',
    studentSteps: [
      { stepNum: 1, text: 'Both Nitrogen and Phosphorus belong to Group 15 and have ns² np³ valence electron configuration.', isError: false },
      { stepNum: 2, text: 'Nitrogen forms 5 coordinate covalent bonds by promoting a 2s electron to the 2d subshell.', isError: true, explanationIfError: 'Fatal error! Principal quantum number n = 2 has only 2s and 2p subshells (l = 0, 1). There are no 2d orbitals in existence! Nitrogen cannot expand its octet beyond 4 covalency.' },
      { stepNum: 3, text: 'Phosphorus expands its octet by utilizing vacant 3d orbitals to form sp³d hybrid orbitals in PCl5.', isError: false }
    ],
    verdict: 'Period 2 elements (B, C, N, O, F) strictly obey the octet rule because of the absence of d-orbitals in their valence shell. Maximum covalency of nitrogen is 4 (e.g. in NH4+).'
  }
];

export const FindTheMistake: React.FC = () => {
  const { setActiveRoute, addXp, triggerConfetti } = useGame();

  const [challengeIdx, setChallengeIdx] = useState(0);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const challenge = MISTAKE_CHALLENGES[challengeIdx];

  const handleSelectStep = (stepNum: number) => {
    if (isSubmitted) return;
    sound.playClick();
    setSelectedStep(stepNum);
  };

  const handleSubmit = () => {
    if (selectedStep === null || isSubmitted) return;
    setIsSubmitted(true);

    const step = challenge.studentSteps.find(s => s.stepNum === selectedStep);
    const correct = step?.isError === true;
    setIsCorrect(correct);

    if (correct) {
      sound.playCorrect();
      triggerConfetti();
      addXp(100, 'Exposed JEE Trap & Conceptual Flaw');
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playClick();
    setSelectedStep(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    setChallengeIdx(c => (c + 1) % MISTAKE_CHALLENGES.length);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#151C2C] to-[#101522] border border-amber-500/25">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <SearchCheck className="w-3.5 h-3.5" />
            JEE Coaching Trap Debunker
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Find the Mistake
          </h1>
          <p className="text-xs text-[#9BA6BC]">
            Examine authentic student derivations, spot the hidden scientific error, and avoid fatal JEE coaching traps.
          </p>
        </div>

        <button
          onClick={() => setActiveRoute('home')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </button>
      </div>

      {/* Problem Challenge Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#151C2C] border border-white/10 space-y-6">
        
        <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10">
          <span className="font-bold text-amber-400">{challenge.chapter}</span>
          <span className="text-gray-400">Challenge {challengeIdx + 1} of {MISTAKE_CHALLENGES.length}</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-white">{challenge.title}</h2>
          <p className="text-xs sm:text-sm text-cyan-300 bg-[#080B12] p-3 rounded-xl border border-white/5 font-mono">
            <strong>Problem: </strong> {challenge.problem}
          </p>
        </div>

        {/* Derivation Steps List */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Click on the step where the scientific error occurred:
          </span>

          <div className="space-y-2">
            {challenge.studentSteps.map(step => {
              const isSelected = selectedStep === step.stepNum;
              const isFlaggedAsError = isSubmitted && step.isError;
              const isWrongSelection = isSubmitted && isSelected && !step.isError;

              let style = 'border-white/10 hover:border-amber-400/40 bg-[#101522] text-white';
              if (isSelected && !isSubmitted) {
                style = 'border-amber-400 bg-amber-500/15 text-amber-200';
              } else if (isFlaggedAsError) {
                style = 'border-emerald-400 bg-emerald-500/20 text-emerald-200';
              } else if (isWrongSelection) {
                style = 'border-rose-500 bg-rose-500/20 text-rose-300';
              }

              return (
                <button
                  key={step.stepNum}
                  onClick={() => handleSelectStep(step.stepNum)}
                  disabled={isSubmitted}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${style}`}
                >
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-white/10 shrink-0">
                    Step {step.stepNum}
                  </span>
                  <span className="flex-1 leading-relaxed">
                    <ChemFormula formula={step.text} />
                  </span>
                  {isFlaggedAsError && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
                  {isWrongSelection && <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedStep === null}
              className="px-6 py-2.5 rounded-xl font-bold bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-black shadow-lg shadow-amber-400/20 cursor-pointer"
            >
              Pinpoint Mistake
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-cyan-400 to-amber-400 text-black shadow-lg cursor-pointer"
            >
              <span>Next Challenge</span>
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Verdict & Conceptual Breakdown */}
        {isSubmitted && (
          <div className="p-5 rounded-2xl bg-[#080B12] border border-cyan-500/25 space-y-3 animate-in fade-in">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <span className="text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Sharp Observation! You caught the exact JEE trap.
                </span>
              ) : (
                <span className="text-rose-400 text-xs font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Missed it! Check the marked step above.
                </span>
              )}
            </div>

            <p className="text-xs text-gray-200 leading-relaxed">
              {challenge.studentSteps.find(s => s.isError)?.explanationIfError}
            </p>

            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 font-mono">
              <strong className="text-white">Correct Scientific Resolution: </strong>
              {challenge.verdict}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
