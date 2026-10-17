import { OrganicReactionPuzzle } from '../types/chemistry';

export const ORGANIC_PUZZLES: OrganicReactionPuzzle[] = [
  {
    id: 'synth-01',
    name: 'Synthesis of Benzoic Acid from Benzene',
    difficulty: 'JEE Main Medium',
    targetMolecule: 'Benzoic Acid (C6H5COOH)',
    startingMolecule: {
      name: 'Benzene',
      formula: 'C6H6',
      type: 'Aromatic Hydrocarbon'
    },
    availableReagents: [
      {
        id: 'r-friedel',
        name: 'CH3Cl / anhydrous AlCl3',
        formula: 'CH3Cl + AlCl3',
        role: 'Electrophilic Aromatic Substitution (Friedel-Crafts Alkylation)',
        mechanism: 'Generates CH3+ carbocation-like complex, attacks benzene ring to introduce methyl group.'
      },
      {
        id: 'r-kmno4',
        name: 'Alkaline KMnO4, Δ then H3O+',
        formula: 'KMnO4 / OH-, Δ -> H+',
        role: 'Vigorous Benzylic Oxidation',
        mechanism: 'Oxidizes any benzylic carbon possessing at least one benzylic hydrogen to a carboxylate salt.'
      },
      {
        id: 'r-etard',
        name: 'CrO2Cl2 / CS2 then H2O (Etard Reaction)',
        formula: 'CrO2Cl2 / H2O',
        role: 'Controlled Oxidation to Benzaldehyde',
        mechanism: 'Stops oxidation at the aldehyde stage (C6H5CHO), does not yield benzoic acid directly.'
      },
      {
        id: 'r-nitration',
        name: 'Conc. HNO3 + Conc. H2SO4',
        formula: 'HNO3 / H2SO4',
        role: 'Aromatic Nitration',
        mechanism: 'Generates NO2+ electrophile to produce Nitrobenzene (deactivates ring).'
      },
      {
        id: 'r-bromine',
        name: 'Br2 / FeBr3',
        formula: 'Br2 / FeBr3',
        role: 'Bromination of Benzene',
        mechanism: 'Produces Bromobenzene via electrophilic aromatic substitution.'
      }
    ],
    correctPathway: ['r-friedel', 'r-kmno4'],
    intermediates: [
      {
        step: 1,
        name: 'Toluene (Methylbenzene)',
        formula: 'C6H5CH3',
        explanation: 'Electrophilic substitution by methyl carbocation yields toluene with an active benzylic methyl group.'
      },
      {
        step: 2,
        name: 'Benzoic Acid',
        formula: 'C6H5COOH',
        explanation: 'KMnO4 oxidizes the benzylic carbon cleanly to potassium benzoate, which upon acidification yields pure Benzoic Acid!'
      }
    ],
    finalExplanation: 'Benzene lacks a functional handle for direct carboxylation in typical lab conditions. Friedel-Crafts alkylation introduces a benzylic carbon (Toluene), followed by vigorous oxidation with alkaline KMnO4 to yield Benzoic Acid.',
    commonMistakes: [
      {
        reagentId: 'r-etard',
        whyWrong: 'Etard reagent (CrO2Cl2) selectively stops at Benzaldehyde (C6H5CHO), not Benzoic Acid!'
      },
      {
        reagentId: 'r-nitration',
        whyWrong: 'Nitration introduces -NO2, which strongly deactivates the ring and prevents Friedel-Crafts alkylation entirely.'
      }
    ]
  },
  {
    id: 'synth-02',
    name: 'Position Isomer Inversion: 2-Bromopropane to 1-Bromopropane',
    difficulty: 'JEE Main Medium',
    targetMolecule: '1-Bromopropane (CH3CH2CH2Br)',
    startingMolecule: {
      name: '2-Bromopropane (Isopropyl bromide)',
      formula: 'CH3-CH(Br)-CH3',
      type: 'Secondary Alkyl Halide'
    },
    availableReagents: [
      {
        id: 'r-alc-koh',
        name: 'Alcoholic KOH, Δ',
        formula: 'alc. KOH, Δ',
        role: 'E2 Dehydrohalogenation',
        mechanism: 'Strong base abstracts beta-hydrogen with concerted bromide leaving group departure to produce propene.'
      },
      {
        id: 'r-aq-koh',
        name: 'Aqueous KOH',
        formula: 'aq. KOH',
        role: 'Nucleophilic Substitution (SN2/SN1)',
        mechanism: 'OH- nucleophile displaces Br- to form Propan-2-ol, failing to eliminate to alkene.'
      },
      {
        id: 'r-hbr-peroxide',
        name: 'HBr + Benzoyl Peroxide (Kharasch Effect)',
        formula: 'HBr / (PhCO)2O2',
        role: 'Free Radical Anti-Markovnikov Hydrobromination',
        mechanism: 'Br• radical attacks the terminal carbon of propene to generate the more stable secondary free radical intermediate.'
      },
      {
        id: 'r-hbr-pure',
        name: 'Pure HBr (no peroxide)',
        formula: 'HBr',
        role: 'Electrophilic Markovnikov Addition',
        mechanism: 'H+ protonates propene to give 2° carbocation; Br- attacks C2 returning back to 2-bromopropane!'
      }
    ],
    correctPathway: ['r-alc-koh', 'r-hbr-peroxide'],
    intermediates: [
      {
        step: 1,
        name: 'Propene (Propylene)',
        formula: 'CH3-CH=CH2',
        explanation: 'Alcoholic KOH drives E2 elimination of HBr from isopropyl bromide to yield propene.'
      },
      {
        step: 2,
        name: '1-Bromopropane',
        formula: 'CH3CH2CH2Br',
        explanation: 'Free radical addition of HBr in the presence of organic peroxides places Br at the terminal C1 position!'
      }
    ],
    finalExplanation: 'Direct substitution cannot shift the halogen from C2 to C1. The elegant JEE route is E2 elimination to create an unsymmetrical alkene (propene), followed by Anti-Markovnikov peroxide-catalyzed radical hydrobromination.',
    commonMistakes: [
      {
        reagentId: 'r-aq-koh',
        whyWrong: 'Aqueous KOH performs substitution instead of elimination, giving Propan-2-ol!'
      },
      {
        reagentId: 'r-hbr-pure',
        whyWrong: 'Without peroxide, Markovnikov addition places Br back at C2, regenerating the starting material!'
      }
    ]
  },
  {
    id: 'synth-03',
    name: 'Synthesis of tert-Butyl Alcohol from Acetone',
    difficulty: 'JEE Advanced Hard',
    targetMolecule: '2-Methylpropan-2-ol (tert-Butyl alcohol)',
    startingMolecule: {
      name: 'Acetone (Propan-2-one)',
      formula: 'CH3-CO-CH3',
      type: 'Ketone'
    },
    availableReagents: [
      {
        id: 'r-grignard',
        name: 'Methylmagnesium Bromide (CH3MgBr) in dry ether',
        formula: 'CH3MgBr / Et2O',
        role: 'Nucleophilic Carbonyl Addition (Grignard)',
        mechanism: 'Carbanionic methyl (CH3-) attacks the electrophilic carbonyl carbon of acetone.'
      },
      {
        id: 'r-hydrolysis',
        name: 'Dilute H3O+ (Acidic Hydrolysis)',
        formula: 'H3O+',
        role: 'Protonation of Magnesium Alkoxide Adduct',
        mechanism: 'Protonates (CH3)3C-O-MgBr to liberate the 3° alcohol and Mg(OH)Br.'
      },
      {
        id: 'r-nabh4',
        name: 'NaBH4 in Ethanol',
        formula: 'NaBH4',
        role: 'Hydride Reduction',
        mechanism: 'Reduces acetone to 2-propanol (secondary alcohol). No new C-C bond is formed!'
      },
      {
        id: 'r-clemmensen',
        name: 'Zn-Hg / Conc. HCl (Clemmensen Reduction)',
        formula: 'Zn-Hg / HCl',
        role: 'Carbonyl to Alkane Reduction',
        mechanism: 'Converts acetone entirely into propane gas (CH3-CH2-CH3).'
      }
    ],
    correctPathway: ['r-grignard', 'r-hydrolysis'],
    intermediates: [
      {
        step: 1,
        name: 'tert-Butoxymagnesium Bromide Complex',
        formula: '(CH3)3C-O-MgBr',
        explanation: 'Nucleophilic addition of the methyl carbanion onto acetone generates the tetrahedral alkoxide adduct.'
      },
      {
        step: 2,
        name: '2-Methylpropan-2-ol (tert-Butanol)',
        formula: '(CH3)3C-OH',
        explanation: 'Acidic workup hydrolyzes the magnesium alkoxide into pure tertiary alcohol!'
      }
    ],
    finalExplanation: 'Ketones react with Grignard reagents followed by protonation to yield 3° alcohols with one added alkyl group. Acetone + CH3MgBr yields tert-butyl alcohol.',
    commonMistakes: [
      {
        reagentId: 'r-nabh4',
        whyWrong: 'NaBH4 donates hydride (H-), yielding secondary alcohol (isopropanol) instead of 3° alcohol.'
      },
      {
        reagentId: 'r-clemmensen',
        whyWrong: 'Clemmensen reduction reduces C=O to CH2, giving propane alkane.'
      }
    ]
  }
];
