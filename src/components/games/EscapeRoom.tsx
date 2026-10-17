import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/audio';
import { ChemFormula } from '../../utils/chemFormatter';
import { 
  KeyRound, 
  Lock, 
  Unlock, 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle, 
  ArrowLeft, 
  Sparkles, 
  Trophy, 
  RotateCcw 
} from 'lucide-react';

interface ChamberPuzzle {
  id: number;
  title: string;
  scenario: string;
  riddle: string;
  passcodeHint: string;
  correctCode: string;
  explanation: string;
}

const CHAMBERS: ChamberPuzzle[] = [
  {
    id: 1,
    title: 'Chamber 1: The Redox Airlock',
    scenario: 'You are sealed inside the cryogenic decompression bay. The oxygen purge system demands the stoichiometric integer coefficients for the redox balancing in acidic medium: a MnO4- + b Fe2+ + c H+ -> a Mn2+ + b Fe3+ + d H2O.',
    riddle: 'Enter the 4-digit code formed by the stoichiometric coefficients [a][b][c][d] in order.',
    passcodeHint: 'Balance: 1 MnO4- accepts 5e-, 1 Fe2+ releases 1e-. So 1 MnO4- + 5 Fe2+ + 8 H+ -> 1 Mn2+ + 5 Fe3+ + 4 H2O.',
    correctCode: '1584',
    explanation: 'Equivalence requires 5 electrons transferred. The balanced half-reactions are: MnO4- + 8H+ + 5e- -> Mn2+ + 4H2O, and 5 Fe2+ -> 5 Fe3+ + 5e-. Hence, a=1, b=5, c=8, d=4 => Code: 1584.'
  },
  {
    id: 2,
    title: 'Chamber 2: The Cryogenic Acid-Base Vault',
    scenario: 'The thermal stabilizer has overheated! To reset the coolant core, enter the rounded whole number pH of a solution formed by mixing 500 mL of 0.2 M CH3COOH and 500 mL of 0.2 M CH3COONa (given pKa = 4.74).',
    riddle: 'Enter the integer pH value rounded to the nearest whole number (e.g. 5).',
    passcodeHint: 'When [Salt] = [Acid], log([Salt]/[Acid]) = log(1) = 0, so pH = pKa = 4.74.',
    correctCode: '5',
    explanation: 'Equal moles of acetic acid and sodium acetate form an equimolar buffer where pH = pKa + log(1) = 4.74. Rounded to the nearest integer, the code is 5.'
  },
  {
    id: 3,
    title: 'Chamber 3: The Coordination Spectrometer',
    scenario: 'The laser shield is locked by an octahedral complex of Cobalt(III). The magnetometer reveals 4 unpaired electrons (high spin). How many fluoride ligands are coordinated around the cobalt atom?',
    riddle: 'Enter the coordination number of the complex [CoF_x]^3-.',
    passcodeHint: 'Cobalt(III) is 3d6. Weak field F- gives t2g^4 eg^2 (4 unpaired electrons). Octahedral geometry requires 6 ligands.',
    correctCode: '6',
    explanation: '[CoF6]3- is the classic high-spin octahedral complex with coordination number 6.'
  },
  {
    id: 4,
    title: 'Chamber 4: The Core Reactor Terminal',
    scenario: 'The central reactor overload sequence is ticking! To deactivate the meltdown, calculate the temperature in Kelvin where a reaction with ΔH = -60 kJ/mol and ΔS = -100 J/(K·mol) reaches dynamic equilibrium (ΔG = 0).',
    riddle: 'Enter the 3-digit equilibrium temperature in Kelvin.',
    passcodeHint: 'T = ΔH / ΔS = 60,000 J / 100 J·K-1 = 600 K.',
    correctCode: '600',
    explanation: 'At equilibrium, ΔG = ΔH - TΔS = 0 => T = (-60,000) / (-100) = 600 K.'
  }
];

export const EscapeRoom: React.FC = () => {
  const { setActiveRoute, addXp, triggerConfetti, recordEscapeRoomCleared, updateQuestProgress } = useGame();

  const [currentChamberIdx, setCurrentChamberIdx] = useState(0);
  const [codeInput, setCodeInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const [isEscaped, setIsEscaped] = useState(false);

  const chamber = CHAMBERS[currentChamberIdx];

  const handleKeypadPress = (val: string) => {
    sound.playClick();
    setErrorFeedback(null);
    if (val === 'C') {
      setCodeInput('');
    } else if (val === 'DEL') {
      setCodeInput(prev => prev.slice(0, -1));
    } else if (codeInput.length < 6) {
      setCodeInput(prev => prev + val);
    }
  };

  const handleUnlock = () => {
    if (codeInput.trim() === chamber.correctCode) {
      sound.playCorrect();
      triggerConfetti();
      addXp(150, `Unlocked ${chamber.title}`);
      updateQuestProgress('escape-room', 1);

      if (currentChamberIdx + 1 < CHAMBERS.length) {
        setCurrentChamberIdx(prev => prev + 1);
        setCodeInput('');
        setShowHint(false);
        setErrorFeedback(null);
      } else {
        setIsEscaped(true);
        recordEscapeRoomCleared();
        sound.playLevelUp();
      }
    } else {
      sound.playWrong();
      setErrorFeedback('Security override rejected: Incorrect numeric code.');
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setCurrentChamberIdx(0);
    setCodeInput('');
    setShowHint(false);
    setErrorFeedback(null);
    setIsEscaped(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#151C2C] to-[#101522] border border-rose-500/25">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
            <KeyRound className="w-3.5 h-3.5" />
            Lab Lockdown Scenario
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Chemistry Escape Room
          </h1>
          <p className="text-xs text-[#9BA6BC]">
            Trapped in the Quantum Chem-Lab! Solve redox coefficients, buffer pH, and coordination riddles to unlock successive security gates.
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

      {/* Progress Track */}
      <div className="grid grid-cols-4 gap-2">
        {CHAMBERS.map((c, idx) => {
          const isDone = currentChamberIdx > idx || isEscaped;
          const isCurrent = currentChamberIdx === idx && !isEscaped;

          return (
            <div
              key={c.id}
              className={`p-3 rounded-2xl border text-center transition-all ${
                isDone
                  ? 'bg-emerald-500/15 border-emerald-400/50 text-emerald-300'
                  : isCurrent
                  ? 'bg-rose-500/20 border-rose-400/60 text-rose-300 ring-2 ring-rose-500/30'
                  : 'bg-[#151C2C] border-white/5 text-gray-500'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold">
                {isDone ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                <span>Gate {idx + 1}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Chamber Challenge */}
      {!isEscaped ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#151C2C] border border-white/10 space-y-6">
          
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              {chamber.title}
            </span>

            <p className="text-sm text-gray-200 leading-relaxed font-medium">
              {chamber.scenario}
            </p>

            <div className="p-4 rounded-2xl bg-[#080B12] border border-cyan-500/30 text-xs text-cyan-300 font-mono">
              <strong className="text-white">Directive: </strong>
              {chamber.riddle}
            </div>
          </div>

          {/* Keypad & Input Display */}
          <div className="max-w-xs mx-auto space-y-4">
            
            <div className="p-4 rounded-2xl bg-[#080B12] border border-rose-500/30 text-center">
              <span className="text-[10px] text-gray-400 uppercase font-mono tracking-widest block mb-1">
                Security Keypad
              </span>
              <span className="text-3xl font-mono font-black text-rose-400 tracking-widest">
                {codeInput || '----'}
              </span>
            </div>

            {errorFeedback && (
              <p className="text-xs text-center text-rose-400 font-semibold animate-in shake">
                {errorFeedback}
              </p>
            )}

            <div className="grid grid-cols-3 gap-2">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'DEL'].map(k => (
                <button
                  key={k}
                  onClick={() => handleKeypadPress(k)}
                  className="py-3 rounded-xl bg-[#101522] hover:bg-white/10 border border-white/10 text-sm font-bold text-white transition-colors cursor-pointer"
                >
                  {k}
                </button>
              ))}
            </div>

            <button
              onClick={handleUnlock}
              disabled={!codeInput.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 disabled:opacity-40 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-rose-500/20 cursor-pointer"
            >
              Authorize Gate Unlock
            </button>
          </div>

          {/* Hint Drawer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                sound.playClick();
                setShowHint(!showHint);
              }}
              className="flex items-center gap-1.5 text-gray-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{showHint ? 'Hide Hint' : 'Request Diagnostic Hint'}</span>
            </button>

            {showHint && (
              <p className="text-xs text-amber-200/90 max-w-sm text-right">
                {chamber.passcodeHint}
              </p>
            )}
          </div>

        </div>
      ) : (
        /* Full Escape Victory */
        <div className="p-8 rounded-3xl bg-[#151C2C] border border-emerald-400/40 text-center space-y-4 shadow-2xl shadow-emerald-500/15">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
            <Trophy className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-white">Laboratory Lockdown Cleared!</h2>
          <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
            You successfully navigated all 4 security chambers by balancing redox equations, computing buffer equilibria, and deriving thermodynamic thresholds!
          </p>

          <div className="p-4 rounded-2xl bg-[#080B12] max-w-xs mx-auto border border-white/10 text-xs">
            <span className="text-gray-400">Bounty Earned</span>
            <p className="text-lg font-mono font-bold text-cyan-400">+500 XP & Badge</p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white cursor-pointer"
            >
              Replay Escape Room
            </button>
            <button
              onClick={() => setActiveRoute('home')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-black text-xs font-bold cursor-pointer shadow-lg"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
