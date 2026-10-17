import React from 'react';
import { useGame, GameRoute } from '../context/GameContext';
import { MoleculeCanvas } from './MoleculeCanvas';
import { sound } from '../utils/audio';
import { 
  Swords, 
  FlaskConical, 
  Calculator, 
  Atom, 
  TableProperties, 
  KeyRound, 
  BookOpen, 
  Users, 
  Droplets, 
  SearchCheck, 
  ArrowRight, 
  Flame, 
  Sparkles, 
  Trophy, 
  CheckCircle2, 
  Play,
  RotateCcw,
  Zap,
  Target
} from 'lucide-react';

interface GameModeCard {
  id: GameRoute;
  title: string;
  badge: string;
  description: string;
  topics: string[];
  difficulty: 'Class 11 & 12' | 'JEE Main' | 'JEE Advanced';
  icon: React.ReactNode;
  accentHex: string;
}

export const HomeDashboard: React.FC = () => {
  const { 
    setActiveRoute, 
    stats, 
    dailyQuests, 
    claimQuestReward, 
    incorrectQuestionIds,
    setFormulaSheetOpen 
  } = useGame();

  const handleLaunchGame = (route: GameRoute) => {
    sound.playClick();
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const GAME_MODES: GameModeCard[] = [
    {
      id: 'battle-arena',
      title: 'Chemistry Battle Arena',
      badge: 'Main RPG Boss Mode',
      description: 'Face off against chapter guardians like The Mole Concept Guardian and Equilibrium Overlord. Answer correctly to unleash molecular attacks!',
      topics: ['Stoichiometry', 'Equilibrium', 'CFT', 'Electrochemistry'],
      difficulty: 'JEE Advanced',
      icon: <Swords className="w-6 h-6 text-cyan-400" />,
      accentHex: '#42E8F5'
    },
    {
      id: 'organic-lab',
      title: 'Reaction Mechanism Lab',
      badge: 'Synthesis Puzzle',
      description: 'Assemble multi-step reaction sequences, select reagents and catalysts, and predict intermediates across SN1, SN2, E1, E2, and named reactions.',
      topics: ['Rearrangements', 'Aromatic Substitution', 'Grignard', 'Aldol'],
      difficulty: 'JEE Main',
      icon: <FlaskConical className="w-6 h-6 text-violet-400" />,
      accentHex: '#8B5CF6'
    },
    {
      id: 'molecular-builder',
      title: 'Molecular Builder',
      badge: 'VSEPR & Lewis',
      description: 'Place atoms, valence electrons, single and double bonds. Verify steric number, formal charges, molecular geometry, and dipole moments.',
      topics: ['Hybridisation', 'VSEPR Theory', 'Formal Charge', 'Polarity'],
      difficulty: 'Class 11 & 12',
      icon: <Atom className="w-6 h-6 text-emerald-400" />,
      accentHex: '#35D07F'
    },
    {
      id: 'physical-chemistry',
      title: 'Numerical Speedrun',
      badge: 'Precision & Timer',
      description: 'Solve fast-paced thermodynamics, buffer equilibria, and kinetics numericals with scientific keypad input and step-by-step derivations.',
      topics: ['Nernst Eq', 'Henderson-Hasselbalch', 'Gibbs ΔG', 'Kinetics'],
      difficulty: 'JEE Main',
      icon: <Calculator className="w-6 h-6 text-amber-400" />,
      accentHex: '#FFC857'
    },
    {
      id: 'inorganic-chemistry',
      title: 'Periodic Table Conquest',
      badge: 'Interactive Explorer',
      description: 'Inspect 118 elements with dynamic heatmaps for electronegativity and ionization energy. Solve tricky inorganic periodic exception quizzes.',
      topics: ['Periodic Trends', 'Electronic Config', 'Inert Pair Effect', 'Lanthanides'],
      difficulty: 'Class 11 & 12',
      icon: <TableProperties className="w-6 h-6 text-cyan-400" />,
      accentHex: '#42E8F5'
    },
    {
      id: 'escape-room',
      title: 'Chemistry Escape Room',
      badge: 'Multi-Chamber Lockdown',
      description: 'Trapped in a futuristic laboratory! Balance redox equations, compute buffer pH, and decipher coordination complexes to crack each chamber.',
      topics: ['Redox Balancing', 'Cryogenic pH', 'Octahedral CFT', 'Thermodynamics'],
      difficulty: 'JEE Advanced',
      icon: <KeyRound className="w-6 h-6 text-rose-400" />,
      accentHex: '#FF4757'
    },
    {
      id: 'jee-bank',
      title: 'JEE Practice Question Engine',
      badge: 'Verified Question Bank',
      description: 'Filter verified questions by branch, difficulty, and chapter. Practice single-choice, multiple-choice, and assertion-reason problems.',
      topics: ['Physical', 'Organic', 'Inorganic', 'Previous Years'],
      difficulty: 'JEE Advanced',
      icon: <BookOpen className="w-6 h-6 text-violet-400" />,
      accentHex: '#8B5CF6'
    },
    {
      id: 'multiplayer',
      title: 'Multiplayer Quiz Lobby',
      badge: '1v1 Matchmaking',
      description: 'Compete in real-time or pass-and-play against friends using room codes, or spar against the simulated AI JEE Topper Bot.',
      topics: ['Speed Challenge', 'Live Leaderboard', 'Bot Sparring'],
      difficulty: 'JEE Main',
      icon: <Users className="w-6 h-6 text-cyan-400" />,
      accentHex: '#42E8F5'
    },
    {
      id: 'virtual-lab',
      title: 'Virtual Chemistry Lab',
      badge: 'Titration & Flame',
      description: 'Interactive acid-base titration with phenolphthalein dropwise burette control, pH curves, and authentic Bunsen burner flame test colors.',
      topics: ['Acid-Base Titration', 'Qualitative Salt Analysis', 'Flame Tests'],
      difficulty: 'Class 11 & 12',
      icon: <Droplets className="w-6 h-6 text-emerald-400" />,
      accentHex: '#35D07F'
    },
    {
      id: 'find-mistake',
      title: 'Find the Mistake',
      badge: 'Coaching Trap Debunker',
      description: 'Spot subtle scientific blunders in common student solutions — from ignoring water auto-ionization in 10⁻⁸ M HCl to carbocation traps.',
      topics: ['JEE Traps', 'Water Auto-ionization', 'Carbocations', 'Octet Rules'],
      difficulty: 'JEE Advanced',
      icon: <SearchCheck className="w-6 h-6 text-amber-400" />,
      accentHex: '#FFC857'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-[#080B12] via-[#101522] to-[#080B12]">
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-scientific-grid pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Headline & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                <span>The Ultimate Chemistry Gaming Platform for JEE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Chemistry Is Your Next{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                  Superpower.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#9BA6BC] max-w-xl leading-relaxed">
                Train your brain, master reactions, defeat chemistry challenges, and level up your JEE preparation.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => handleLaunchGame('battle-arena')}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-black font-extrabold text-sm tracking-wide shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  <Swords className="w-4 h-4 fill-black" />
                  <span>Enter the Arena</span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('game-modes-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#151C2C] hover:bg-[#1A2337] border border-white/10 hover:border-cyan-400/40 text-white font-bold text-sm transition-all duration-200 cursor-pointer"
                >
                  <span>Explore Game Modes</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </button>
              </div>

              {/* Compact Genuine Stats Bar */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg">
                <div className="p-3 rounded-xl bg-[#151C2C]/70 border border-white/5">
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Questions Solved</span>
                  <span className="text-lg font-mono font-bold text-white">{stats.questionsSolved}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#151C2C]/70 border border-white/5">
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Current Rank</span>
                  <span className="text-lg font-mono font-bold text-cyan-400">Lvl {stats.level}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#151C2C]/70 border border-white/5">
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Total XP</span>
                  <span className="text-lg font-mono font-bold text-amber-400">{stats.xp}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#151C2C]/70 border border-white/5">
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Accuracy</span>
                  <span className="text-lg font-mono font-bold text-emerald-400">{stats.accuracy}%</span>
                </div>
              </div>

            </div>

            {/* Right: Stylized Animated 3D-inspired Molecule Visualization */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="w-full relative rounded-3xl p-1 bg-gradient-to-b from-cyan-500/20 via-transparent to-violet-500/20 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
                <MoleculeCanvas />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-cyan-300 bg-[#080B12]/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Interactive Quantum Orbital Core
                  </span>
                  <span className="text-gray-400">Move mouse to repel</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Continue Your Journey Dashboard Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#151C2C] border border-white/10 space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Your JEE Preparation Hub
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Continue Your Journey
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleLaunchGame('battle-arena')}
                className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                Resume Battle
              </button>
              <button
                onClick={() => setFormulaSheetOpen(true)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors cursor-pointer"
              >
                Formula Sheet
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Level & Rank Card */}
            <div className="p-5 rounded-2xl bg-[#101522] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400">Current Rank</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Level {stats.level}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center font-black text-black text-lg">
                  L{stats.level}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{stats.rankTitle}</h4>
                  <p className="text-xs font-mono text-gray-400">{stats.xp} / {stats.nextLevelXp} XP</p>
                </div>
              </div>

              <div className="w-full h-2 rounded-full bg-[#080B12] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
                  style={{ width: `${Math.min(100, (stats.xp / stats.nextLevelXp) * 100)}%` }}
                />
              </div>
            </div>

            {/* Daily Challenge Quest Card */}
            <div className="p-5 rounded-2xl bg-[#101522] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Daily Chemistry Quest
                </span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  +{dailyQuests[0]?.xpReward} XP
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">{dailyQuests[0]?.title}</h4>
                <p className="text-xs text-[#9BA6BC] leading-relaxed mt-0.5">
                  {dailyQuests[0]?.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono text-gray-400">
                  Progress: {dailyQuests[0]?.current} / {dailyQuests[0]?.target}
                </span>
                {dailyQuests[0]?.completed && !dailyQuests[0]?.claimed ? (
                  <button
                    onClick={() => claimQuestReward(dailyQuests[0].id)}
                    className="px-3 py-1 rounded-lg bg-emerald-400 text-black text-xs font-bold shadow-md cursor-pointer"
                  >
                    Claim Reward
                  </button>
                ) : (
                  <button
                    onClick={() => handleLaunchGame(dailyQuests[0]?.gameRoute as GameRoute || 'battle-arena')}
                    className="text-xs text-cyan-400 hover:underline font-semibold cursor-pointer"
                  >
                    Start Quest →
                  </button>
                )}
              </div>
            </div>

            {/* Weak Topics & Revision Card */}
            <div className="p-5 rounded-2xl bg-[#101522] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-rose-400" />
                  Recommended Revision
                </span>
                <span className="text-xs text-rose-400 font-bold">
                  {incorrectQuestionIds.length} Missed
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">
                  {incorrectQuestionIds.length > 0 ? 'Review Missed Questions' : 'Ionic Equilibrium & Buffers'}
                </h4>
                <p className="text-xs text-[#9BA6BC] leading-relaxed mt-0.5">
                  {incorrectQuestionIds.length > 0
                    ? 'Reinforce concepts from your recent mistakes to prevent recurring traps.'
                    : 'Class 11 high-yield buffer calculation & Henderson-Hasselbalch equations.'}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleLaunchGame('profile')}
                  className="text-xs text-rose-400 hover:underline font-semibold cursor-pointer"
                >
                  Open Revision Notebook →
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. 10 Game Modes Grid Section */}
      <section id="game-modes-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            10 Interactive Game Modes
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Explore All uChem Game Arenas
          </h2>
          <p className="text-sm text-[#9BA6BC] max-w-2xl">
            Every arena is crafted specifically for Class 11 and 12 JEE aspirants. Select your challenge and conquer the syllabus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAME_MODES.map((mode, index) => (
            <div
              key={mode.id}
              className="group relative flex flex-col justify-between p-6 rounded-3xl bg-[#151C2C] border border-white/10 hover:border-cyan-400/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="space-y-4">
                
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between">
                  <span 
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                    style={{ 
                      backgroundColor: `${mode.accentHex}15`, 
                      color: mode.accentHex,
                      border: `1px solid ${mode.accentHex}30` 
                    }}
                  >
                    {mode.badge}
                  </span>
                  <span className="font-mono text-xs font-bold text-gray-500 group-hover:text-cyan-400 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="flex items-start gap-3.5">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                    style={{ 
                      backgroundColor: `${mode.accentHex}15`,
                      border: `1px solid ${mode.accentHex}40`
                    }}
                  >
                    {mode.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {mode.title}
                    </h3>
                    <span className="text-[11px] font-medium text-gray-400">
                      Target: {mode.difficulty}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#9BA6BC] leading-relaxed">
                  {mode.description}
                </p>

                {/* Topics Tag List */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {mode.topics.map(t => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#080B12] text-gray-400 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>

              {/* Working Launch Button */}
              <div className="pt-6">
                <button
                  onClick={() => handleLaunchGame(mode.id)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs bg-[#101522] hover:bg-gradient-to-r hover:from-cyan-400 hover:to-cyan-500 text-gray-300 hover:text-black border border-white/10 hover:border-transparent transition-all duration-200 cursor-pointer shadow-sm group-hover:shadow-cyan-500/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Arena</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

    </div>
  );
};
