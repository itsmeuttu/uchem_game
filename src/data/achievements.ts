import { Achievement, DailyQuest } from '../types/chemistry';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'badge-first-solve',
    title: 'Atom Initiate',
    description: 'Solve your very first chemistry challenge correctly.',
    icon: 'sparkles',
    xpReward: 50,
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    category: 'mastery'
  },
  {
    id: 'badge-mole-master',
    title: 'Stoichiometry Slayer',
    description: 'Defeat The Mole Concept Guardian in the Chemistry Battle Arena.',
    icon: 'atom',
    xpReward: 350,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'battle'
  },
  {
    id: 'badge-equil-slayer',
    title: 'Equilibrium Overlord Defeated',
    description: 'Conquer the Le Chatelier shifts and triumph over The Equilibrium Overlord.',
    icon: 'scale',
    xpReward: 450,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'battle'
  },
  {
    id: 'badge-mechanism-king',
    title: 'Mechanism Grandmaster',
    description: 'Outsmart the carbocation rearrangements of The Organic Mechanism Master.',
    icon: 'flask-conical',
    xpReward: 600,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'battle'
  },
  {
    id: 'badge-faraday-champion',
    title: 'Faraday\'s Lightning',
    description: 'Calculate under pressure and dethrone The Electrochemistry Titan.',
    icon: 'zap',
    xpReward: 500,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'battle'
  },
  {
    id: 'badge-sentinel-overcome',
    title: 'Spectrochemical Sage',
    description: 'Break the crystal field shield of The Coordination Sentinel.',
    icon: 'shield',
    xpReward: 750,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'battle'
  },
  {
    id: 'badge-organic-synth',
    title: 'Synthesis Architect',
    description: 'Successfully complete an organic synthesis pathway in Reaction Mechanism Lab.',
    icon: 'git-merge',
    xpReward: 200,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'organic'
  },
  {
    id: 'badge-speedrun-ace',
    title: 'Numerical Speed Demon',
    description: 'Answer 3 consecutive physical numerical questions without a single mistake.',
    icon: 'timer',
    xpReward: 250,
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    category: 'physical'
  },
  {
    id: 'badge-periodic-explorer',
    title: 'Periodic Recon Specialist',
    description: 'Inspect 5 unique elements in the Periodic Table Conquest.',
    icon: 'table-properties',
    xpReward: 150,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: 'inorganic'
  },
  {
    id: 'badge-escape-cleared',
    title: 'Lab Lockdown Breaker',
    description: 'Unlock all 5 security chambers in the Chemistry Escape Room.',
    icon: 'key',
    xpReward: 500,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: 'mastery'
  },
  {
    id: 'badge-streak-master',
    title: 'Unstoppable Momentum',
    description: 'Build a combo streak of 5 consecutive correct answers.',
    icon: 'flame',
    xpReward: 300,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: 'streak'
  },
  {
    id: 'badge-jee-topper',
    title: 'JEE AIR-1 Mindset',
    description: 'Reach Level 4 (Alchemist) or accumulate over 2,000 XP.',
    icon: 'trophy',
    xpReward: 1000,
    unlocked: false,
    progress: 0,
    maxProgress: 2000,
    category: 'mastery'
  }
];

export const INITIAL_DAILY_QUESTS: DailyQuest[] = [
  {
    id: 'quest-arena',
    title: 'Battle Arena Duelist',
    description: 'Damage or defeat any Chapter Boss in Chemistry Battle Arena.',
    xpReward: 150,
    current: 0,
    target: 1,
    completed: false,
    claimed: false,
    gameRoute: 'battle-arena'
  },
  {
    id: 'quest-synth',
    title: 'Reaction Pathway Solver',
    description: 'Assemble a valid multi-step pathway in Reaction Mechanism Lab.',
    xpReward: 120,
    current: 0,
    target: 1,
    completed: false,
    claimed: false,
    gameRoute: 'organic-lab'
  },
  {
    id: 'quest-numerical',
    title: 'Precision Speedrun',
    description: 'Solve 2 numerical problems in Physical Chemistry Speedrun.',
    xpReward: 100,
    current: 0,
    target: 2,
    completed: false,
    claimed: false,
    gameRoute: 'physical-chemistry'
  },
  {
    id: 'quest-periodic',
    title: 'Elemental Analysis',
    description: 'Inspect 3 elements and study their JEE key notes in Periodic Table.',
    xpReward: 80,
    current: 0,
    target: 3,
    completed: false,
    claimed: false,
    gameRoute: 'inorganic-chemistry'
  },
  {
    id: 'quest-escape',
    title: 'Chamber Cracker',
    description: 'Solve at least 1 lock puzzle in the Chemistry Escape Room.',
    xpReward: 150,
    current: 0,
    target: 1,
    completed: false,
    claimed: false,
    gameRoute: 'escape-room'
  }
];
