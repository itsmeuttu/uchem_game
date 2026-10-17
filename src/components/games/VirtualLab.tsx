import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/audio';
import { 
  FlaskConical, 
  Flame, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft, 
  Droplet 
} from 'lucide-react';

export const VirtualLab: React.FC = () => {
  const { setActiveRoute, addXp, triggerConfetti } = useGame();

  const [activeTab, setActiveTab] = useState<'titration' | 'flame'>('titration');

  // Titration State
  // 25 mL of 0.1 M HCl titrated with 0.1 M NaOH
  const [naohAdded, setNaohAdded] = useState(0);
  const [titrationCompleted, setTitrationCompleted] = useState(false);

  // Flame test state
  const [selectedFlameSalt, setSelectedFlameSalt] = useState<{
    cation: string;
    name: string;
    color: string;
    glowHex: string;
    description: string;
  } | null>(null);

  const calculatePh = (vol: number) => {
    // Initial 25 mL of 0.1 M HCl => 2.5 millimoles H+
    const initialH = 2.5;
    const addedOH = vol * 0.1;
    const totalVol = 25 + vol;

    if (vol < 25) {
      const remainingH = (initialH - addedOH) / totalVol;
      const ph = -Math.log10(remainingH);
      return Math.max(1.0, ph).toFixed(2);
    } else if (vol === 25) {
      return '7.00';
    } else {
      const excessOH = (addedOH - initialH) / totalVol;
      const poh = -Math.log10(excessOH);
      const ph = 14 - poh;
      return Math.min(13.0, ph).toFixed(2);
    }
  };

  const currentPh = calculatePh(naohAdded);
  const phNumber = parseFloat(currentPh);
  const isPink = phNumber >= 8.2;

  const handleAddTitrant = (amount: number) => {
    sound.playClick();
    const nextVol = Math.round((naohAdded + amount) * 10) / 10;
    setNaohAdded(nextVol);

    if (nextVol === 25.0 && !titrationCompleted) {
      sound.playCorrect();
      triggerConfetti();
      setTitrationCompleted(true);
      addXp(120, 'Reached exact equivalence point in titration');
    }
  };

  const handleResetTitration = () => {
    sound.playClick();
    setNaohAdded(0);
    setTitrationCompleted(false);
  };

  const SALTS = [
    { cation: 'Na+', name: 'Sodium Chloride (NaCl)', color: 'Intense Golden Yellow', glowHex: '#FFD700', description: 'Excitation of 3s valence electron to 3p subshell; characteristic yellow doublet (589.0 nm and 589.6 nm).' },
    { cation: 'K+', name: 'Potassium Chloride (KCl)', color: 'Lilac / Pale Violet', glowHex: '#D8B4F8', description: 'Viewed through cobalt blue glass to filter out persistent sodium yellow traces.' },
    { cation: 'Ca2+', name: 'Calcium Chloride (CaCl2)', color: 'Brick Red', glowHex: '#FF4500', description: 'Group 2 alkaline earth flame; characteristic brick-red flash.' },
    { cation: 'Sr2+', name: 'Strontium Chloride (SrCl2)', color: 'Crimson Red', glowHex: '#DC143C', description: 'Persistent deep crimson color; widely utilized in pyrotechnics and distress flares.' },
    { cation: 'Ba2+', name: 'Barium Chloride (BaCl2)', color: 'Apple Green', glowHex: '#7CFC00', description: 'Appears as crisp grassy apple green; viewed through non-luminous oxidizing zone.' },
    { cation: 'Cu2+', name: 'Copper(II) Sulfate (CuSO4)', color: 'Vivid Blue-Green', glowHex: '#00FA9A', description: 'Forms volatile copper halides on platinum wire with concentrated HCl.' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#151C2C] to-[#101522] border border-cyan-500/20">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5" />
            Practical Chemistry & Laboratory Simulator
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Virtual Chemistry Lab
          </h1>
          <p className="text-xs text-[#9BA6BC]">
            Hands-on simulation of Acid-Base Titration (pH curves) and Qualitative Salt Flame Analysis.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-xl bg-[#080B12] p-1 border border-white/10 text-xs">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('titration');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                activeTab === 'titration' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:text-white'
              }`}
            >
              Titration
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('flame');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                activeTab === 'flame' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:text-white'
              }`}
            >
              Flame Tests
            </button>
          </div>

          <button
            onClick={() => setActiveRoute('home')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
        </div>
      </div>

      {activeTab === 'titration' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Flask & Burette Visualizer */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-[#151C2C] border border-white/10 flex flex-col items-center justify-between min-h-[420px] relative">
            
            <div className="w-full flex items-center justify-between text-xs pb-4 border-b border-white/10">
              <span className="font-bold text-gray-400">Analyte: <strong className="text-white">25 mL 0.1 M HCl</strong></span>
              <span className="font-bold text-gray-400">Titrant: <strong className="text-cyan-400">0.1 M NaOH</strong></span>
            </div>

            {/* Burette & Conical Flask Graphic */}
            <div className="relative flex flex-col items-center my-6">
              
              {/* Burette Tube */}
              <div className="w-6 h-36 bg-cyan-950/40 border border-cyan-400/50 rounded-t relative flex flex-col justify-end">
                <div 
                  className="w-full bg-cyan-400/30 transition-all duration-300"
                  style={{ height: `${Math.max(0, 100 - (naohAdded / 50) * 100)}%` }}
                />
                <span className="absolute -left-12 top-2 text-[10px] font-mono text-gray-400">0 mL</span>
                <span className="absolute -left-14 bottom-2 text-[10px] font-mono text-gray-400">50 mL</span>
              </div>

              {/* Stopcock */}
              <div className="w-8 h-2 bg-gray-500 rounded my-1" />

              {/* Conical Flask */}
              <div className="w-28 h-32 border-2 border-white/40 rounded-b-3xl relative overflow-hidden flex flex-col justify-end bg-black/40">
                {/* Solution Fluid */}
                <div 
                  className={`w-full transition-all duration-500 ${
                    isPink ? 'bg-pink-500/40 shadow-inner' : 'bg-cyan-500/10'
                  }`}
                  style={{ height: `${Math.min(90, 40 + (naohAdded / 50) * 40)}%` }}
                />
                <span className="absolute bottom-2 left-0 right-0 text-center text-[10px] font-mono font-bold text-white">
                  {isPink ? 'Faint Pink' : 'Colorless'}
                </span>
              </div>

            </div>

            {/* Droplet Controls */}
            <div className="w-full pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAddTitrant(0.1)}
                  className="px-3 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 text-xs font-bold border border-cyan-500/30 cursor-pointer flex items-center gap-1"
                >
                  <Droplet className="w-3.5 h-3.5" />
                  +0.1 mL (Drop)
                </button>
                <button
                  onClick={() => handleAddTitrant(1.0)}
                  className="px-3 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 text-xs font-bold border border-cyan-500/30 cursor-pointer"
                >
                  +1.0 mL
                </button>
                <button
                  onClick={() => handleAddTitrant(5.0)}
                  className="px-3 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 text-xs font-bold border border-cyan-500/30 cursor-pointer"
                >
                  +5.0 mL
                </button>
              </div>

              <button
                onClick={handleResetTitration}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-400 hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Flask
              </button>
            </div>

          </div>

          {/* Right: pH Meter & Equivalence Analysis */}
          <div className="p-6 rounded-3xl bg-[#151C2C] border border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Digital pH Sensor & Readout
              </h3>

              <div className="p-4 rounded-2xl bg-[#080B12] border border-cyan-500/30 text-center space-y-1">
                <span className="text-[10px] text-gray-400 uppercase font-mono">Current pH</span>
                <p className="text-4xl font-mono font-black text-cyan-400">{currentPh}</p>
                <span className="text-xs font-semibold text-gray-400">
                  {phNumber < 7 ? 'Acidic' : phNumber === 7 ? 'Neutral Equivalence' : 'Basic / Alkaline'}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-[#080B12] border border-white/5">
                  <span className="text-gray-400">NaOH Titrant Added</span>
                  <span className="font-mono font-bold text-white">{naohAdded.toFixed(1)} mL</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-[#080B12] border border-white/5">
                  <span className="text-gray-400">Target Equivalence Vol</span>
                  <span className="font-mono font-bold text-emerald-400">25.0 mL</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-[#080B12] border border-white/5">
                  <span className="text-gray-400">Indicator</span>
                  <span className="font-semibold text-pink-400">Phenolphthalein (pH 8.2 - 10)</span>
                </div>
              </div>
            </div>

            {titrationCompleted ? (
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-200 text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Equivalence Point Reached!
                </div>
                <p className="leading-relaxed">
                  Exactly 25.0 mL of 0.1 M NaOH neutralizes 25.0 mL of 0.1 M HCl. The pH transitions sharply from ~3.5 to ~10.5 around the equivalence point!
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-400 leading-relaxed">
                Add NaOH until the solution reaches exactly pH 7.0 (or turns faint pink with phenolphthalein)!
              </div>
            )}
          </div>

        </div>
      ) : (
        /* Flame Test Laboratory Simulator */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Bunsen Burner Flame Stage */}
          <div className="lg:col-span-2 p-8 rounded-3xl bg-[#151C2C] border border-white/10 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
            
            {/* Ambient Flame Glow */}
            <div 
              className="absolute w-72 h-72 rounded-full blur-3xl opacity-40 pointer-events-none transition-all duration-700"
              style={{ backgroundColor: selectedFlameSalt?.glowHex || '#42E8F5' }}
            />

            {/* Bunsen Burner Silhouette */}
            <div className="relative flex flex-col items-center z-10">
              
              {/* Flame Graphic */}
              <div 
                className="w-16 h-36 rounded-full blur-[1px] animate-pulse transition-all duration-500"
                style={{ 
                  backgroundColor: selectedFlameSalt?.glowHex || '#38bdf8',
                  boxShadow: `0 0 40px ${selectedFlameSalt?.glowHex || '#38bdf8'}`
                }}
              />

              {/* Burner Chimney */}
              <div className="w-10 h-28 bg-gradient-to-r from-gray-700 to-gray-800 border-x border-gray-600 shadow-2xl mt-1" />
              {/* Base */}
              <div className="w-28 h-6 bg-gray-800 rounded-b-xl border-t border-gray-700" />
            </div>

            <p className="text-xs text-gray-400 font-mono mt-6 z-10">
              {selectedFlameSalt ? `Flame Color: ${selectedFlameSalt.color}` : 'Non-luminous blue oxidizing flame'}
            </p>

          </div>

          {/* Right: Salt Loop Selection Tray */}
          <div className="p-6 rounded-3xl bg-[#151C2C] border border-white/10 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Flame className="w-4 h-4" />
              Select Metal Salt on Platinum Wire
            </h3>

            <div className="space-y-2">
              {SALTS.map(salt => (
                <button
                  key={salt.cation}
                  onClick={() => {
                    sound.playClick();
                    setSelectedFlameSalt(salt);
                    addXp(20, `Tested flame for ${salt.cation}`);
                  }}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                    selectedFlameSalt?.cation === salt.cation
                      ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                      : 'bg-[#101522] border-white/10 text-gray-300 hover:border-white/30'
                  }`}
                >
                  <span className="font-bold">{salt.name}</span>
                  <span 
                    className="w-3.5 h-3.5 rounded-full border border-white/30"
                    style={{ backgroundColor: salt.glowHex }}
                  />
                </button>
              ))}
            </div>

            {selectedFlameSalt && (
              <div className="p-3.5 rounded-2xl bg-[#080B12] border border-cyan-500/20 text-xs space-y-1 animate-in fade-in">
                <span className="font-bold text-cyan-300">Qualitative Analysis Note:</span>
                <p className="text-gray-300 leading-relaxed text-[11px]">{selectedFlameSalt.description}</p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
