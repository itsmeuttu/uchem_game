import { BossEnemy } from '../types/chemistry';

export const BOSS_ENEMIES: BossEnemy[] = [
  {
    id: 'boss-mole',
    name: 'The Mole Concept Guardian',
    title: 'Keeper of Avogadro\'s Abyss & Redox Equivalence',
    chapter: 'Stoichiometry & Redox Reactions',
    branch: 'Physical',
    maxHealth: 1000,
    avatar: 'atom',
    accentColor: '#42E8F5',
    dialogueIntro: 'Halt, mortal! None may cross the bridge to JEE without mastering the law of chemical equivalence. Calculate, or be oxidized into oblivion!',
    dialogueDefeat: 'Incredible... you have balanced every electron and weighed every mole. The gate to Physical Chemistry opens before you!',
    stages: [
      {
        stage: 1,
        name: 'The Redox Trial of Permanganate',
        questionId: 'phys-mole-01',
        dialogue: 'FeC2O4 stands before you! Beware the dual oxidation of both iron and oxalate!'
      },
      {
        stage: 2,
        name: 'The First-Order Decay Gate',
        questionId: 'phys-kinetics-01',
        dialogue: 'Time is fleeting! Calculate the half-life cascade before the clock runs dry!'
      }
    ],
    rewardXp: 350,
    rewardBadgeId: 'badge-mole-master'
  },
  {
    id: 'boss-equil',
    name: 'The Equilibrium Overlord',
    title: 'Wielder of Le Chatelier & Buffer Systems',
    chapter: 'Chemical & Ionic Equilibrium',
    branch: 'Physical',
    maxHealth: 1200,
    avatar: 'scale',
    accentColor: '#35D07F',
    dialogueIntro: 'You dare disturb the perfect dynamic balance? Every action you take will induce an opposing shift in accordance with my will!',
    dialogueDefeat: 'My equilibrium... disrupted! You have mastered the delicate balance of proton exchange and solubility.',
    stages: [
      {
        stage: 1,
        name: 'The Acetate Buffer Bastion',
        questionId: 'phys-equil-01',
        dialogue: 'A burst of hydronium approaches! Calculate the exact Henderson-Hasselbalch shift!'
      },
      {
        stage: 2,
        name: 'The Gibbs Spontaneity Threshold',
        questionId: 'phys-thermo-01',
        dialogue: 'Feel the thermal entropy clash against enthalpy! At what temperature does the reaction yield?'
      }
    ],
    rewardXp: 450,
    rewardBadgeId: 'badge-equil-slayer'
  },
  {
    id: 'boss-organic',
    name: 'The Organic Mechanism Master',
    title: 'Lord of Carbocation Rearrangements & Resonance',
    chapter: 'Reaction Mechanisms & Aromatic Substitution',
    branch: 'Organic',
    maxHealth: 1400,
    avatar: 'flask-conical',
    accentColor: '#8B5CF6',
    dialogueIntro: 'Molecules bend to my orbital overlaps! Can your mind predict the fleeting carbocation intermediate before it rearranges?',
    dialogueDefeat: 'Impeccable stereochemistry! Your synthetic routes are flawless, young Alchemist.',
    stages: [
      {
        stage: 1,
        name: 'The Neopentyl Shift Trap',
        questionId: 'org-carbocat-01',
        dialogue: 'Beware the primary carbocation! Will you see the 1,2-methyl migration, or fall for the trap?'
      },
      {
        stage: 2,
        name: 'The Aromatic Nitration Shield',
        questionId: 'org-aromatic-01',
        dialogue: 'Aniline burns in acid, yet acetanilide directs the electrophile. Prove your resonance mastery!'
      },
      {
        stage: 3,
        name: 'The Alpha-Hydrogen Inquest',
        questionId: 'org-carbonyl-01',
        dialogue: 'Base is added in high concentration! Which carbonyl molecule submits to Cannizzaro disproportionation?'
      }
    ],
    rewardXp: 600,
    rewardBadgeId: 'badge-mechanism-king'
  },
  {
    id: 'boss-electro',
    name: 'The Electrochemistry Titan',
    title: 'Commander of Nernst Equations & Galvanic Voltage',
    chapter: 'Electrochemistry',
    branch: 'Physical',
    maxHealth: 1500,
    avatar: 'zap',
    accentColor: '#FFC857',
    dialogueIntro: 'Feel the 96,500 Coulombs surging through these galvanic veins! Can your intellect harness the Nernst potential?',
    dialogueDefeat: 'The circuit breaks! Your electrochemical knowledge is grounded with zero resistance.',
    stages: [
      {
        stage: 1,
        name: 'The Concentration Cell Surge',
        questionId: 'phys-electro-01',
        dialogue: 'Non-standard conditions active! Compute the Daniell cell potential under ion disparity!'
      }
    ],
    rewardXp: 500,
    rewardBadgeId: 'badge-faraday-champion'
  },
  {
    id: 'boss-coordination',
    name: 'The Coordination Sentinel',
    title: 'Keeper of Crystal Field Splitting & d-Orbitals',
    chapter: 'Coordination Compounds & Qualitative Analysis',
    branch: 'Inorganic',
    maxHealth: 1800,
    avatar: 'shield',
    accentColor: '#42E8F5',
    dialogueIntro: 'Six ligands surround me in octahedral symmetry! Unravel my crystal field stabilization energy if you dare!',
    dialogueDefeat: 'The spectrochemical seal has shattered. You stand at the zenith of Inorganic Chemistry!',
    stages: [
      {
        stage: 1,
        name: 'The Octahedral Spin-Only Riddle',
        questionId: 'inorg-cft-01',
        dialogue: 'Fluoride approaches Cobalt(III)! Will the d-electrons pair or stay wild in high spin?'
      },
      {
        stage: 2,
        name: 'The Scarlet Nessler Transmutation',
        questionId: 'inorg-salt-01',
        dialogue: 'Iodide drops into mercuric solution! Name the scarlet crystal and its soluble successor!'
      }
    ],
    rewardXp: 750,
    rewardBadgeId: 'badge-sentinel-overcome'
  }
];
