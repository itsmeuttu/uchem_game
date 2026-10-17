import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/audio';
import { 
  Atom, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  ArrowLeft 
} from 'lucide-react';

interface TargetMolecule {
  id: string;
  name: string;
  formula: string;
  centralAtom: string;
  ligandAtom: string;
  targetBonds: number;
  targetLonePairs: number;
  hybridization: string;
  geometry: string;
  bondAngle: string;
  isPolar: boolean;
  notes: string;
}

const TARGET_MOLECULES: TargetMolecule[] = [
  {
    id: 'mol-water',
    name: 'Water',
    formula: 'H2O',
    centralAtom: 'O',
    ligandAtom: 'H',
    targetBonds: 2,
    targetLonePairs: 2,
    hybridization: 'sp³',
    geometry: 'Bent (V-shaped)',
    bondAngle: '104.5° (lone pair repulsion)',
    isPolar: true,
    notes: '2 bonding pairs and 2 lone pairs on Oxygen. Steric number = 4 => sp³ hybridization. Repulsion: lp-lp > lp-bp > bp-bp compresses tetrahedral angle from 109.5° to 104.5°.'
  },
  {
    id: 'mol-co2',
    name: 'Carbon Dioxide',
    formula: 'CO2',
    centralAtom: 'C',
    ligandAtom: 'O',
    targetBonds: 4, // 2 double bonds
    targetLonePairs: 0,
    hybridization: 'sp',
    geometry: 'Linear',
    bondAngle: '180°',
    isPolar: false,
    notes: '2 double bonds (2 σ bonds, 2 π bonds). Steric number = 2 => sp hybridization. Bond dipoles cancel out symmetrically, yielding net dipole moment μ = 0.'
  },
  {
    id: 'mol-nh3',
    name: 'Ammonia',
    formula: 'NH3',
    centralAtom: 'N',
    ligandAtom: 'H',
    targetBonds: 3,
    targetLonePairs: 1,
    hybridization: 'sp³',
    geometry: 'Trigonal Pyramidal',
    bondAngle: '107°',
    isPolar: true,
    notes: '3 bonding pairs and 1 lone pair on Nitrogen. Steric number = 4 => sp³. The lone pair points in same direction as N-H bond dipoles, giving strong net dipole moment μ = 1.47 D.'
  },
  {
    id: 'mol-pcl5',
    name: 'Phosphorus Pentachloride',
    formula: 'PCl5',
    centralAtom: 'P',
    ligandAtom: 'Cl',
    targetBonds: 5,
    targetLonePairs: 0,
    hybridization: 'sp³d',
    geometry: 'Trigonal Bipyramidal',
    bondAngle: '120° (equatorial), 90° (axial)',
    isPolar: false,
    notes: 'Steric number = 5 => sp³d. Expanded octet with 10 valence electrons. The two axial P-Cl bonds (240 pm) are longer and weaker than the three equatorial P-Cl bonds (202 pm) due to greater repulsion.'
  },
  {
    id: 'mol-sf6',
    name: 'Sulfur Hexafluoride',
    formula: 'SF6',
    centralAtom: 'S',
    ligandAtom: 'F',
    targetBonds: 6,
    targetLonePairs: 0,
    hybridization: 'sp³d²',
    geometry: 'Octahedral',
    bondAngle: '90°',
    isPolar: false,
    notes: 'Steric number = 6 => sp³d². Highly symmetrical octahedral structure. Exceptionally unreactive due to steric crowding protecting the central sulfur atom from nucleophilic attack.'
  },
  {
    id: 'mol-xef4',
    name: 'Xenon Tetrafluoride',
    formula: 'XeF4',
    centralAtom: 'Xe',
    ligandAtom: 'F',
    targetBonds: 4,
    targetLonePairs: 2,
    hybridization: 'sp³d²',
    geometry: 'Square Planar',
    bondAngle: '90°',
    isPolar: false,
    notes: 'Steric number = 6 (4 bond pairs + 2 lone pairs). The two lone pairs reside in trans positions to minimize repulsions, giving a symmetrical square planar geometry with μ = 0.'
  }
];

export const MolecularBuilder: React.FC = () => {
  const { setActiveRoute, addXp, triggerConfetti } = useGame();

  const [selectedTarget, setSelectedTarget] = useState<TargetMolecule>(TARGET_MOLECULES[0]);
  const [bondsCount, setBondsCount] = useState(0);
  const [lonePairsCount, setLonePairsCount] = useState(0);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    formalCharge: number;
    stericNumber: number;
    detectedHybridization: string;
    message: string;
  } | null>(null);

  const handleSelectMolecule = (mol: TargetMolecule) => {
    sound.playClick();
    setSelectedTarget(mol);
    setBondsCount(0);
    setLonePairsCount(0);
    setValidationResult(null);
  };

  const addBond = () => {
    if (bondsCount >= 6) return;
    sound.playClick();
    setBondsCount(b => b + 1);
    setValidationResult(null);
  };

  const removeBond = () => {
    if (bondsCount <= 0) return;
    sound.playClick();
    setBondsCount(b => b - 1);
    setValidationResult(null);
  };

  const addLonePair = () => {
    if (lonePairsCount >= 4) return;
    sound.playClick();
    setLonePairsCount(lp => lp + 1);
    setValidationResult(null);
  };

  const removeLonePair = () => {
    if (lonePairsCount <= 0) return;
    sound.playClick();
    setLonePairsCount(lp => lp - 1);
    setValidationResult(null);
  };

  const handleReset = () => {
    sound.playClick();
    setBondsCount(0);
    setLonePairsCount(0);
    setValidationResult(null);
  };

  const handleVerify = () => {
    const steric = bondsCount + lonePairsCount;
    let hyb = 'None';
    if (steric === 2) hyb = 'sp';
    else if (steric === 3) hyb = 'sp²';
    else if (steric === 4) hyb = 'sp³';
    else if (steric === 5) hyb = 'sp³d';
    else if (steric === 6) hyb = 'sp³d²';

    const isMatch = bondsCount === selectedTarget.targetBonds && lonePairsCount === selectedTarget.targetLonePairs;

    // Check octet / formal charge logic
    // Valence electrons of central atom:
    const valenceMap: Record<string, number> = { O: 6, C: 4, N: 5, P: 5, S: 6, Xe: 8 };
    const centralValence = valenceMap[selectedTarget.centralAtom] || 4;
    // FC = Valence - NonBonding - (Bonding / 2)
    const formalCharge = centralValence - (lonePairsCount * 2) - bondsCount;

    if (isMatch) {
      sound.playCorrect();
      triggerConfetti();
      addXp(120, `Constructed ${selectedTarget.name} correctly`);
      setValidationResult({
        isValid: true,
        formalCharge,
        stericNumber: steric,
        detectedHybridization: hyb,
        message: `Accurate Structure! Central atom ${selectedTarget.centralAtom} adopts ${hyb} hybridization with ${selectedTarget.geometry} geometry.`
      });
    } else {
      sound.playWrong();
      setValidationResult({
        isValid: false,
        formalCharge,
        stericNumber: steric,
        detectedHybridization: hyb,
        message: `Mismatched configuration. ${selectedTarget.name} requires ${selectedTarget.targetBonds} bond(s) and ${selectedTarget.targetLonePairs} lone pair(s) to achieve stability.`
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#151C2C] to-[#101522] border border-cyan-500/20">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Atom className="w-3.5 h-3.5" />
            VSEPR Geometry & Lewis Structure Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Molecular Builder
          </h1>
          <p className="text-xs text-[#9BA6BC]">
            Construct atoms, valence bonds, and lone pairs. Verify steric number, formal charges, hybridization, and dipole moments.
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

      {/* Target Molecule Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {TARGET_MOLECULES.map(m => (
          <button
            key={m.id}
            onClick={() => handleSelectMolecule(m)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              selectedTarget.id === m.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                : 'bg-[#151C2C] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{m.name} ({m.formula})</span>
          </button>
        ))}
      </div>

      {/* Construction Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Interactive Central Atom & Ligand Visualizer */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-[#151C2C] border border-white/10 flex flex-col items-center justify-between min-h-[380px] relative overflow-hidden">
          
          <div className="w-full flex items-center justify-between text-xs pb-4 border-b border-white/10">
            <span className="font-bold text-gray-400">Target: <strong className="text-white">{selectedTarget.name}</strong></span>
            <span className="font-mono text-cyan-400 font-bold">{selectedTarget.formula}</span>
          </div>

          {/* Central Atom Visualizer SVG */}
          <div className="relative w-64 h-64 flex items-center justify-center my-6">
            
            {/* Central Atom */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-600 border-2 border-cyan-300 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-cyan-500/25 z-10">
              {selectedTarget.centralAtom}
            </div>

            {/* Render Surrounding Ligand Bonds */}
            {Array.from({ length: bondsCount }).map((_, i) => {
              const angle = (i * (360 / Math.max(1, bondsCount))) * (Math.PI / 180);
              const x = Math.cos(angle) * 90;
              const y = Math.sin(angle) * 90;

              return (
                <div
                  key={'bond-' + i}
                  className="absolute flex items-center justify-center"
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#101522] border border-cyan-400 text-cyan-300 font-bold text-xs flex items-center justify-center shadow-lg animate-in zoom-in-50">
                    {selectedTarget.ligandAtom}
                  </div>
                </div>
              );
            })}

            {/* Render Lone Pairs */}
            {Array.from({ length: lonePairsCount }).map((_, i) => {
              const angle = (i * 90 + 45) * (Math.PI / 180);
              const x = Math.cos(angle) * 60;
              const y = Math.sin(angle) * 60;

              return (
                <div
                  key={'lp-' + i}
                  className="absolute flex items-center gap-1"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400 animate-pulse" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400 animate-pulse" />
                </div>
              );
            })}
          </div>

          {/* Control Trays */}
          <div className="w-full grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            {/* Bonds controls */}
            <div className="p-3 rounded-2xl bg-[#080B12] border border-white/5 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-300">Bonds: <strong className="text-cyan-400 font-mono">{bondsCount}</strong></span>
              <div className="flex items-center gap-1">
                <button
                  onClick={removeBond}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
                >
                  -
                </button>
                <button
                  onClick={addBond}
                  className="w-7 h-7 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs border border-cyan-500/30 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Lone Pairs controls */}
            <div className="p-3 rounded-2xl bg-[#080B12] border border-white/5 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-300">Lone Pairs: <strong className="text-amber-400 font-mono">{lonePairsCount}</strong></span>
              <div className="flex items-center gap-1">
                <button
                  onClick={removeLonePair}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
                >
                  -
                </button>
                <button
                  onClick={addLonePair}
                  className="w-7 h-7 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-500/30 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Scientific Property Dossier & Verification */}
        <div className="p-6 rounded-3xl bg-[#151C2C] border border-white/10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Theoretical Parameters
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded-lg bg-[#080B12] border border-white/5">
                <span className="text-gray-400">Hybridization</span>
                <span className="font-mono font-bold text-cyan-300">{selectedTarget.hybridization}</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-[#080B12] border border-white/5">
                <span className="text-gray-400">VSEPR Geometry</span>
                <span className="font-bold text-white">{selectedTarget.geometry}</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-[#080B12] border border-white/5">
                <span className="text-gray-400">Bond Angle</span>
                <span className="font-mono text-gray-300">{selectedTarget.bondAngle}</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-[#080B12] border border-white/5">
                <span className="text-gray-400">Molecular Polarity</span>
                <span className={`font-bold ${selectedTarget.isPolar ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {selectedTarget.isPolar ? 'Polar (μ ≠ 0)' : 'Non-Polar (μ = 0)'}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#9BA6BC] leading-relaxed italic bg-white/5 p-3 rounded-xl border border-white/5">
              "{selectedTarget.notes}"
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={handleVerify}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-black font-bold text-xs shadow-lg shadow-cyan-400/20 cursor-pointer"
            >
              Verify Molecular Structure
            </button>
            <button
              onClick={handleReset}
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-400 hover:text-white cursor-pointer"
            >
              Clear Builder
            </button>
          </div>

          {/* Validation Feedback */}
          {validationResult && (
            <div className={`p-4 rounded-xl border text-xs space-y-1.5 animate-in fade-in duration-200 ${
              validationResult.isValid 
                ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200' 
                : 'bg-rose-500/15 border-rose-500/40 text-rose-200'
            }`}>
              <div className="flex items-center gap-2 font-bold">
                {validationResult.isValid ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
                <span>{validationResult.isValid ? 'Validation Successful' : 'Validation Failed'}</span>
              </div>
              <p className="leading-relaxed">{validationResult.message}</p>
              <div className="flex gap-4 font-mono text-[10px] text-gray-300 pt-1 border-t border-white/10">
                <span>Steric No: {validationResult.stericNumber}</span>
                <span>Formal Charge: {validationResult.formalCharge}</span>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
