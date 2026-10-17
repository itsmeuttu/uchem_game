import { ChemistryQuestion } from '../types/chemistry';

export const CHEMISTRY_QUESTIONS: ChemistryQuestion[] = [
  // Physical Chemistry: Mole Concept & Redox
  {
    id: 'phys-mole-01',
    branch: 'Physical',
    chapter: 'Mole Concept & Redox',
    topic: 'Equivalent Weight & Redox Titration',
    difficulty: 'JEE Main Medium',
    format: 'single-choice',
    question: 'How many moles of acidified KMnO4 are required to completely react with 1 mole of ferrous oxalate (FeC2O4)?',
    options: ['0.6 moles (3/5)', '1.0 mole', '0.4 moles (2/5)', '1.2 moles (6/5)'],
    correctAnswer: 0,
    explanation: {
      overview: 'Ferrous oxalate (FeC2O4) undergoes oxidation at both the iron cation (Fe2+ -> Fe3+) and the oxalate anion (C2O4^2- -> 2CO2). The total n-factor for FeC2O4 is 1 + 2 = 3. In acidic medium, KMnO4 reduces from Mn(+7) to Mn(+2), with an n-factor of 5.',
      stepByStep: [
        'Oxidation of Fe2+: Fe2+ -> Fe3+ + 1e- (n1 = 1)',
        'Oxidation of C2O4^2-: C2O4^2- -> 2CO2 + 2e- (n2 = 2)',
        'Total n-factor of FeC2O4 = 1 + 2 = 3',
        'Reduction of KMnO4 in acidic medium: MnO4- + 8H+ + 5e- -> Mn2+ + 4H2O (n-factor = 5)',
        'By Law of Chemical Equivalence: Equivalents of KMnO4 = Equivalents of FeC2O4',
        'n(KMnO4) * 5 = n(FeC2O4) * 3',
        'n(KMnO4) * 5 = 1 * 3 => n(KMnO4) = 3/5 = 0.6 moles'
      ],
      keyFormula: 'Equivalents = Moles * n-factor; (n1 * v1 = n2 * v2)',
      commonTrap: 'A classic JEE trap is calculating n-factor for only Fe2+ (1) or only oxalate (2), arriving at 1/5 or 2/5!'
    },
    hints: [
      'Both iron and carbon in oxalate undergo oxidation during the reaction with KMnO4.',
      'Check the n-factor of FeC2O4 carefully: 1 mole of Fe2+ releases 1 electron, 1 mole of C2O4^2- releases 2 electrons.'
    ],
    source: 'JEE Main 2021 / Standard JEE Concept'
  },
  {
    id: 'phys-equil-01',
    branch: 'Physical',
    chapter: 'Chemical & Ionic Equilibrium',
    topic: 'Buffer Solutions & Henderson-Hasselbalch',
    difficulty: 'JEE Main Medium',
    format: 'single-choice',
    question: 'A buffer solution contains 0.1 M CH3COOH and 0.1 M CH3COONa. If pKa of CH3COOH is 4.74, what is the pH of the solution after adding 0.02 moles of HCl to 1 liter of this buffer?',
    options: ['4.56', '4.74', '4.92', '5.10'],
    correctAnswer: 0,
    explanation: {
      overview: 'Adding strong acid HCl (0.02 mol) consumes the conjugate base CH3COO- to form more undissociated CH3COOH.',
      stepByStep: [
        'Initial moles: [CH3COOH] = 0.10 mol, [CH3COO-] = 0.10 mol',
        'Reaction with HCl: CH3COO- + H+ -> CH3COOH',
        'Remaining [CH3COO-] = 0.10 - 0.02 = 0.08 M',
        'Formed [CH3COOH] = 0.10 + 0.02 = 0.12 M',
        'Apply Henderson-Hasselbalch equation: pH = pKa + log([Salt] / [Acid])',
        'pH = 4.74 + log(0.08 / 0.12) = 4.74 + log(2/3)',
        'log(2/3) = log 2 - log 3 = 0.301 - 0.477 = -0.176',
        'pH = 4.74 - 0.176 ≈ 4.56'
      ],
      keyFormula: 'pH = pKa + log([Conjugate Base] / [Weak Acid])',
      commonTrap: 'Assuming pH remains unchanged; a buffer resists pH change but slightly decreases when strong acid is added.'
    },
    hints: [
      'The added H+ ions from HCl react completely with acetate ions to produce acetic acid.',
      'Use the Henderson-Hasselbalch equation with the new concentrations of acetate and acetic acid.'
    ],
    source: 'JEE Main 2022'
  },
  {
    id: 'phys-thermo-01',
    branch: 'Physical',
    chapter: 'Thermodynamics',
    topic: 'Spontaneity & Gibbs Free Energy',
    difficulty: 'JEE Advanced Hard',
    format: 'numerical',
    question: 'For a reaction at 300 K, ΔH = -60 kJ/mol and ΔS = -100 J/(K·mol). Calculate the temperature in Kelvin (T) at which the reaction transitions from spontaneous to non-spontaneous (at standard pressure).',
    correctAnswer: '600',
    tolerance: 5,
    units: 'K',
    explanation: {
      overview: 'A reaction transitions between spontaneous (ΔG < 0) and non-spontaneous (ΔG > 0) at the equilibrium temperature where ΔG = 0.',
      stepByStep: [
        'ΔG = ΔH - T·ΔS',
        'Set ΔG = 0 => ΔH = T·ΔS',
        'T = ΔH / ΔS',
        'Convert units: ΔH = -60 kJ/mol = -60,000 J/mol; ΔS = -100 J/(K·mol)',
        'T = (-60,000 J/mol) / (-100 J/(K·mol)) = 600 K',
        'Below 600 K, the reaction is spontaneous (enthalpy driven). Above 600 K, entropy penalty dominates making ΔG > 0.'
      ],
      keyFormula: 'ΔG = ΔH - TΔS; Transition point at ΔG = 0',
      commonTrap: 'Forgetting to convert kJ to J before dividing ΔH by ΔS, giving an incorrect value of 0.6 K!'
    },
    hints: [
      'Equilibrium condition occurs when ΔG = 0.',
      'Remember to keep ΔH and ΔS in consistent units (both in Joules or kiloJoules).'
    ],
    source: 'JEE Advanced Model Problem'
  },
  {
    id: 'phys-electro-01',
    branch: 'Physical',
    chapter: 'Electrochemistry',
    topic: 'Nernst Equation & Cell Potential',
    difficulty: 'JEE Main Medium',
    format: 'single-choice',
    question: 'For the cell Zn(s) | Zn2+(0.01 M) || Cu2+(1.0 M) | Cu(s), given E°(Zn2+/Zn) = -0.76 V and E°(Cu2+/Cu) = +0.34 V, what is the EMF of the cell at 298 K? (Take 2.303 RT/F = 0.059 V)',
    options: ['1.159 V', '1.100 V', '1.041 V', '1.189 V'],
    correctAnswer: 0,
    explanation: {
      overview: 'Calculate standard cell potential E°cell = E°cathode - E°anode = 0.34 - (-0.76) = 1.10 V. Then apply the Nernst equation.',
      stepByStep: [
        'E°cell = E°(Cu2+/Cu) - E°(Zn2+/Zn) = 0.34 - (-0.76) = 1.10 V',
        'Overall reaction: Zn(s) + Cu2+(aq) -> Zn2+(aq) + Cu(s), n = 2 electrons transferred',
        'Reaction quotient Q = [Zn2+] / [Cu2+] = 0.01 / 1.0 = 10^-2',
        'Nernst Equation: E_cell = E°cell - (0.059 / n) * log10(Q)',
        'E_cell = 1.10 - (0.059 / 2) * log10(10^-2)',
        'log10(10^-2) = -2',
        'E_cell = 1.10 - (0.059 / 2) * (-2) = 1.10 + 0.059 = 1.159 V'
      ],
      keyFormula: 'E_cell = E°cell - (0.0591 / n) * log Q',
      commonTrap: 'Putting [Cu2+] in the numerator of Q instead of the oxidized species [Zn2+].'
    },
    hints: [
      'Anode is oxidation of Zn, Cathode is reduction of Cu.',
      'Q = [Product ions] / [Reactant ions] = [Zn2+] / [Cu2+].'
    ],
    source: 'JEE Main 2023'
  },
  {
    id: 'phys-kinetics-01',
    branch: 'Physical',
    chapter: 'Chemical Kinetics',
    topic: 'First Order Kinetics & Half Life',
    difficulty: 'JEE Main Easy',
    format: 'single-choice',
    question: 'A first order reaction is 75% complete in 60 minutes. How long will it take for the reaction to be 87.5% complete?',
    options: ['90 minutes', '80 minutes', '120 minutes', '150 minutes'],
    correctAnswer: 0,
    explanation: {
      overview: 'For a first-order reaction, the time required for 75% completion corresponds to 2 half-lives, and 87.5% completion corresponds to 3 half-lives.',
      stepByStep: [
        'Remaining fraction after 75% completion = 100% - 75% = 25% = (1/2)^2',
        'Therefore, t_75% = 2 * t_1/2 = 60 minutes => t_1/2 = 30 minutes',
        'Remaining fraction after 87.5% completion = 100% - 87.5% = 12.5% = (1/2)^3',
        'Therefore, t_87.5% = 3 * t_1/2 = 3 * 30 min = 90 minutes'
      ],
      keyFormula: 't = n * t_1/2 where fraction remaining = (1/2)^n',
      commonTrap: 'Using linear proportions (e.g. (87.5 / 75) * 60 = 70 min), forgetting radioactive/first-order decay is exponential!'
    },
    hints: [
      'Express the remaining amount as powers of 1/2.',
      '75% complete means 25% remains (2 half lives).'
    ],
    source: 'JEE Main 2020'
  },

  // Organic Chemistry
  {
    id: 'org-carbocat-01',
    branch: 'Organic',
    chapter: 'Reaction Mechanisms & Intermediates',
    topic: 'Carbocation Rearrangement',
    difficulty: 'JEE Advanced Hard',
    format: 'single-choice',
    question: 'When neopentyl alcohol, (CH3)3C-CH2OH, is treated with concentrated H2SO4 at 170°C, the major alkene obtained is:',
    options: [
      '2-Methylbut-2-ene',
      '2-Methylbut-1-ene',
      '3,3-Dimethylbut-1-ene',
      '2,3-Dimethylbut-2-ene'
    ],
    correctAnswer: 0,
    explanation: {
      overview: 'Protonation of -OH followed by water loss forms a primary neopentyl carbocation, which immediately undergoes a 1,2-methyl shift to form a stable tertiary carbocation, followed by Saytzeff elimination.',
      stepByStep: [
        'Step 1: Protonation of (CH3)3C-CH2OH -> (CH3)3C-CH2-OH2+',
        'Step 2: Departure of H2O generates primary neopentyl carbocation: (CH3)3C-CH2+ (very unstable)',
        'Step 3: 1,2-Methyl shift occurs to yield the 3° carbocation: (CH3)2C+ - CH2 - CH3',
        'Step 4: Saytzeff elimination of a proton from C3 gives the most substituted, hyperconjugated alkene: (CH3)2C=CH-CH3 (2-methylbut-2-ene, with 9 hyperconjugative alpha hydrogens).'
      ],
      keyFormula: 'Carbocation stability: 3° > 2° > 1°; 1,2-hydride / 1,2-methyl shifts occur rapidly.',
      commonTrap: 'Assuming no rearrangement occurs, picking 3,3-dimethylbut-1-ene.'
    },
    hints: [
      'Neopentyl carbocation is a primary carbocation adjacent to a quaternary carbon.',
      'Look for a 1,2-methyl shift that creates a much more stable tertiary carbocation.'
    ],
    source: 'JEE Advanced Classic'
  },
  {
    id: 'org-aromatic-01',
    branch: 'Organic',
    chapter: 'Aromatic Compounds',
    topic: 'Electrophilic Aromatic Substitution',
    difficulty: 'JEE Main Medium',
    format: 'single-choice',
    question: 'In the nitration of acetanilide versus aniline with HNO3/H2SO4, which statement is scientifically correct?',
    options: [
      'Acetanilide gives predominantly para-nitroacetanilide because the acetyl group moderates nitrogen lone-pair donation by resonance.',
      'Aniline gives exclusively ortho-nitroaniline under strongly acidic conditions.',
      'Aniline cannot undergo nitration because the aromatic ring is deactivated.',
      'Acetanilide is meta-directing due to the carbonyl group.'
    ],
    correctAnswer: 0,
    explanation: {
      overview: 'In acetanilide (-NHCOCH3), the lone pair on nitrogen is delocalized into the carbonyl group (-C=O), preventing excessive ring activation and protecting the amino group from protonation, giving predominantly para product.',
      stepByStep: [
        'Aniline in conc. HNO3/H2SO4 is protonated to anilinium ion (-NH3+), which is strongly meta-directing, giving significant (~47%) meta product along with oxidation tar.',
        'To get selective para nitration, aniline is first acetylated with acetic anhydride to acetanilide.',
        'The -NHCOCH3 group is still ortho/para directing, but steric hindrance by the bulky acetamido group strongly favors the para position.'
      ],
      keyFormula: 'Protection of -NH2 by acetylation before electrophilic substitution.',
      commonTrap: 'Thinking -NHCOCH3 is meta directing because of the C=O group; the atom directly attached to the ring is Nitrogen with an active lone pair!'
    },
    hints: [
      'Acetylation is used to protect the amino group and prevent the formation of anilinium ion.',
      'Nitrogen is directly attached to the ring and retains its activating, ortho/para directing ability.'
    ],
    source: 'JEE Main / NCERT Class 12'
  },
  {
    id: 'org-carbonyl-01',
    branch: 'Organic',
    chapter: 'Aldehydes, Ketones & Carboxylic Acids',
    topic: 'Cannizzaro Reaction',
    difficulty: 'JEE Main Easy',
    format: 'single-choice',
    question: 'Which of the following compounds will undergo the Cannizzaro reaction when treated with concentrated NaOH (50%)?',
    options: [
      'Benzaldehyde (C6H5CHO)',
      'Acetaldehyde (CH3CHO)',
      'Acetone (CH3COCH3)',
      'Propanal (CH3CH2CHO)'
    ],
    correctAnswer: 0,
    explanation: {
      overview: 'The Cannizzaro reaction is a disproportionation reaction exhibited by aldehydes that lack alpha-hydrogen atoms (no hydrogen on the carbon adjacent to the carbonyl group).',
      stepByStep: [
        'Acetaldehyde has 3 alpha-hydrogens -> undergoes Aldol condensation.',
        'Propanal has 2 alpha-hydrogens -> undergoes Aldol condensation.',
        'Acetone has 6 alpha-hydrogens -> undergoes Aldol condensation.',
        'Benzaldehyde has NO alpha-hydrogens on the formyl carbon -> undergoes Cannizzaro reaction to yield sodium benzoate and benzyl alcohol: 2 C6H5CHO + NaOH -> C6H5COONa + C6H5CH2OH.'
      ],
      keyFormula: '2 RCHO (no alpha-H) + conc. OH- -> RCOO- + RCH2OH (Disproportionation)',
      commonTrap: 'Confusing alpha-hydrogens on aliphatic carbons with the aromatic ring hydrogens of benzene.'
    },
    hints: [
      'Cannizzaro reaction requires aldehydes without any alpha-hydrogens.',
      'Check which of the choices has zero hydrogen atoms on the alpha-carbon.'
    ],
    source: 'JEE Main 2021'
  },

  // Inorganic Chemistry
  {
    id: 'inorg-cft-01',
    branch: 'Inorganic',
    chapter: 'Coordination Compounds',
    topic: 'Crystal Field Theory & Magnetic Moment',
    difficulty: 'JEE Advanced Hard',
    format: 'single-choice',
    question: 'The spin-only magnetic moment of [CoF6]3- (atomic number of Co = 27) in Bohr Magnetons (BM) is:',
    options: ['4.90 BM', '0.00 BM', '2.83 BM', '3.87 BM'],
    correctAnswer: 0,
    explanation: {
      overview: 'Co is in +3 oxidation state (3d6). Fluoride (F-) is a weak field ligand, resulting in high spin configuration with 4 unpaired electrons.',
      stepByStep: [
        'Cobalt ground state: [Ar] 3d7 4s2',
        'Co3+ ion: [Ar] 3d6',
        'Ligand F- is a weak field halide ligand: Δo < P (pairing energy), so it forms a high-spin complex.',
        'Crystal field electronic configuration: t2g^4 eg^2',
        'Unpaired electrons (n): 4 unpaired electrons',
        'Spin-only formula: μ_s = sqrt(n * (n + 2)) BM',
        'μ_s = sqrt(4 * 6) = sqrt(24) ≈ 4.899 ≈ 4.90 BM'
      ],
      keyFormula: 'μ = sqrt(n(n+2)) BM; Spectrochemical series: I- < Br- < Cl- < F- < H2O < NH3 < CN- < CO',
      commonTrap: 'Treating F- as a strong field ligand like CN-, which would cause pairing to give n = 0 (diamagnetic)!'
    },
    hints: [
      'Determine the oxidation state of Cobalt in [CoF6]3-.',
      'Fluoride is a weak field ligand according to the spectrochemical series, so pairing will not occur in the t2g orbitals until each eg orbital is half-filled.'
    ],
    source: 'JEE Advanced 2022'
  },
  {
    id: 'inorg-periodic-01',
    branch: 'Inorganic',
    chapter: 'Periodic Classification & Trends',
    topic: 'Electron Gain Enthalpy Exceptions',
    difficulty: 'JEE Main Easy',
    format: 'single-choice',
    question: 'The correct order of negative electron gain enthalpy (magnitude) for the Group 17 halogens is:',
    options: [
      'Cl > F > Br > I',
      'F > Cl > Br > I',
      'Cl > Br > F > I',
      'I > Br > Cl > F'
    ],
    correctAnswer: 0,
    explanation: {
      overview: 'Chlorine has the highest negative electron gain enthalpy in the entire periodic table, exceeding Fluorine due to significant inter-electronic repulsions in the compact 2p subshell of Fluorine.',
      stepByStep: [
        'Fluorine atom has a very small atomic size with 7 valence electrons confined to the compact 2p orbital.',
        'When an incoming electron is added to F, it experiences strong inter-electronic repulsion, lowering the energy released.',
        'In Chlorine, the incoming electron enters the larger 3p subshell where inter-electronic repulsions are significantly weaker.',
        'Thus, Chlorine releases more energy: Δ_egH(Cl) = -349 kJ/mol, whereas Δ_egH(F) = -328 kJ/mol.',
        'Order: Cl > F > Br > I'
      ],
      keyFormula: 'Δ_egH magnitude: Cl (-349 kJ/mol) > F (-328 kJ/mol) > Br (-325 kJ/mol) > I (-295 kJ/mol)',
      commonTrap: 'Assuming periodic trends always follow electronegativity (F > Cl > Br > I).'
    },
    hints: [
      'Remember the compact 2p orbital anomaly in the second period elements (F and O).',
      'Chlorine has less inter-electronic repulsion than fluorine.'
    ],
    source: 'NCERT Exemplar / JEE Main'
  },
  {
    id: 'inorg-salt-01',
    branch: 'Inorganic',
    chapter: 'Qualitative Salt Analysis',
    topic: 'Confirmatory Tests & Precipitates',
    difficulty: 'JEE Advanced Hard',
    format: 'single-choice',
    question: 'When an aqueous solution of potassium iodide is added to an aqueous solution of mercuric chloride (HgCl2), a scarlet red precipitate (A) is formed. Upon adding excess KI, the precipitate dissolves to give a colorless solution (B). What are (A) and (B)?',
    options: [
      '(A) HgI2, (B) K2[HgI4]',
      '(A) Hg2I2, (B) K[HgI3]',
      '(A) HgI2, (B) HgI4^2- + KCl',
      '(A) HgO, (B) K2[HgO2]'
    ],
    correctAnswer: 0,
    explanation: {
      overview: 'HgCl2 reacts with KI in 1:2 ratio to precipitate scarlet red mercuric iodide (HgI2). In excess KI, it forms the soluble tetraiodomercurate(II) complex ion [HgI4]2-, which is the active reagent in Nessler\'s reagent.',
      stepByStep: [
        'Reaction 1: HgCl2 + 2 KI -> HgI2 (scarlet red precipitate) + 2 KCl',
        'Reaction 2 (with excess KI): HgI2 + 2 KI -> K2[HgI4] (soluble, colorless complex)',
        'This alkaline solution of K2[HgI4] is Nessler\'s Reagent, used to detect ammonium (NH4+) ions to form Iodide of Millon\'s base (brown precipitate).'
      ],
      keyFormula: 'Hg2+ + 2I- -> HgI2↓ (red); HgI2 + 2I- -> [HgI4]2- (soluble)',
      commonTrap: 'Confusing mercurous (Hg2^2+) with mercuric (Hg2+); mercurous iodide is yellow-green.'
    },
    hints: [
      'Mercuric iodide is famously known for its vivid scarlet red color.',
      'The complex formed in excess KI is the basis of Nessler\'s Reagent for ammonia detection.'
    ],
    source: 'JEE Advanced Qualitative Analysis'
  }
];
