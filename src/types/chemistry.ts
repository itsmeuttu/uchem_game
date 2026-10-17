export type ChemistryBranch = 'Physical' | 'Organic' | 'Inorganic' | 'General';

export type QuestionDifficulty = 'JEE Main Easy' | 'JEE Main Medium' | 'JEE Advanced Hard';

export type QuestionFormat = 'single-choice' | 'multiple-choice' | 'numerical' | 'assertion-reason' | 'matrix-match';

export interface ChemistryQuestion {
  id: string;
  branch: ChemistryBranch;
  chapter: string;
  topic: string;
  difficulty: QuestionDifficulty;
  format: QuestionFormat;
  question: string;
  options?: string[];
  correctAnswer: number | number[] | string; // index(es) for choice or numeric string
  tolerance?: number; // for numerical questions e.g. 0.05
  units?: string;
  explanation: {
    overview: string;
    stepByStep?: string[];
    keyFormula?: string;
    commonTrap?: string;
  };
  hints: string[];
  source?: string; // e.g. "JEE Advanced 2023 Paper 1" or "uChem Original"
}

export interface BossStage {
  stage: number;
  name: string;
  questionId: string;
  dialogue: string;
}

export interface BossEnemy {
  id: string;
  name: string;
  title: string;
  chapter: string;
  branch: ChemistryBranch;
  maxHealth: number;
  avatar: string; // SVG icon or color identity
  accentColor: string;
  dialogueIntro: string;
  dialogueDefeat: string;
  stages: BossStage[];
  rewardXp: number;
  rewardBadgeId: string;
}

export interface OrganicReactionPuzzle {
  id: string;
  name: string;
  difficulty: QuestionDifficulty;
  targetMolecule: string;
  startingMolecule: {
    name: string;
    formula: string;
    structureSvg?: string;
    type: string;
  };
  availableReagents: {
    id: string;
    name: string;
    formula: string;
    role: string;
    mechanism: string;
  }[];
  correctPathway: string[]; // sequence of reagent IDs
  intermediates: {
    step: number;
    name: string;
    formula: string;
    structureSvg?: string;
    explanation: string;
  }[];
  finalExplanation: string;
  commonMistakes: {
    reagentId: string;
    whyWrong: string;
  }[];
}

export interface PeriodicElement {
  number: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: 'alkali' | 'alkaline-earth' | 'transition' | 'post-transition' | 'metalloid' | 'nonmetal' | 'halogen' | 'noble-gas' | 'lanthanide' | 'actinide';
  group: number;
  period: number;
  block: 's' | 'p' | 'd' | 'f';
  electronConfig: string;
  electronegativity?: number;
  ionizationEnergy?: number; // kJ/mol
  atomicRadius?: number; // pm
  commonOxidationStates: number[];
  jeeKeyNotes: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  category: 'battle' | 'organic' | 'physical' | 'inorganic' | 'streak' | 'mastery';
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  current: number;
  target: number;
  completed: boolean;
  claimed: boolean;
  gameRoute: string;
}

export interface UserStats {
  username: string;
  rankTitle: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  questionsSolved: number;
  correctAnswers: number;
  wrongAnswers: number;
  currentStreak: number;
  bestStreak: number;
  bossesDefeated: number;
  escapeRoomsCleared: number;
  accuracy: number;
}
