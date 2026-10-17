import { PeriodicElement } from '../types/chemistry';

export const PERIODIC_ELEMENTS: PeriodicElement[] = [
  // Period 1
  {
    number: 1, symbol: 'H', name: 'Hydrogen', atomicMass: 1.008, category: 'nonmetal',
    group: 1, period: 1, block: 's', electronConfig: '1s1',
    electronegativity: 2.20, ionizationEnergy: 1312, atomicRadius: 53,
    commonOxidationStates: [1, -1],
    jeeKeyNotes: 'Anomalous position; forms interstitial hydrides with transition metals; ortho and para hydrogen isomers differ in nuclear spin.'
  },
  {
    number: 2, symbol: 'He', name: 'Helium', atomicMass: 4.0026, category: 'noble-gas',
    group: 18, period: 1, block: 's', electronConfig: '1s2',
    electronegativity: undefined, ionizationEnergy: 2372, atomicRadius: 31,
    commonOxidationStates: [0],
    jeeKeyNotes: 'Highest first ionization enthalpy in the entire periodic table (2372 kJ/mol); lowest boiling point of any element (4.2 K).'
  },

  // Period 2
  {
    number: 3, symbol: 'Li', name: 'Lithium', atomicMass: 6.94, category: 'alkali',
    group: 1, period: 2, block: 's', electronConfig: '[He] 2s1',
    electronegativity: 0.98, ionizationEnergy: 520, atomicRadius: 167,
    commonOxidationStates: [1],
    jeeKeyNotes: 'Strongest reducing agent in aqueous solution due to exceptionally high hydration enthalpy (standard reduction potential E° = -3.04 V); diagonal relationship with Mg.'
  },
  {
    number: 4, symbol: 'Be', name: 'Beryllium', atomicMass: 9.0122, category: 'alkaline-earth',
    group: 2, period: 2, block: 's', electronConfig: '[He] 2s2',
    electronegativity: 1.57, ionizationEnergy: 899, atomicRadius: 112,
    commonOxidationStates: [2],
    jeeKeyNotes: 'Amphoteric oxide (BeO) and hydroxide; polymeric chain structure of BeCl2 in solid state with coordinate covalent bonds; diagonal relationship with Al.'
  },
  {
    number: 5, symbol: 'B', name: 'Boron', atomicMass: 10.81, category: 'metalloid',
    group: 13, period: 2, block: 'p', electronConfig: '[He] 2s2 2p1',
    electronegativity: 2.04, ionizationEnergy: 801, atomicRadius: 87,
    commonOxidationStates: [3],
    jeeKeyNotes: 'Diborane (B2H6) features 3-center-2-electron banana bonds (B-H-B); boric acid B(OH)3 is a monobasic Lewis acid, accepting OH- rather than donating H+.'
  },
  {
    number: 6, symbol: 'C', name: 'Carbon', atomicMass: 12.011, category: 'nonmetal',
    group: 14, period: 2, block: 'p', electronConfig: '[He] 2s2 2p2',
    electronegativity: 2.55, ionizationEnergy: 1086, atomicRadius: 67,
    commonOxidationStates: [4, 2, -4],
    jeeKeyNotes: 'Maximum catenation capacity due to strong C-C bond energy (348 kJ/mol); allotropes include diamond (sp3), graphite (sp2, conducts electricity), and fullerenes.'
  },
  {
    number: 7, symbol: 'N', name: 'Nitrogen', atomicMass: 14.007, category: 'nonmetal',
    group: 15, period: 2, block: 'p', electronConfig: '[He] 2s2 2p3',
    electronegativity: 3.04, ionizationEnergy: 1402, atomicRadius: 56,
    commonOxidationStates: [5, 4, 3, 2, 1, -3],
    jeeKeyNotes: 'Higher ionization enthalpy than oxygen due to exceptionally stable half-filled 2p3 subshell; inert diatomic N2 with bond order 3 (945 kJ/mol); cannot expand octet.'
  },
  {
    number: 8, symbol: 'O', name: 'Oxygen', atomicMass: 15.999, category: 'nonmetal',
    group: 16, period: 2, block: 'p', electronConfig: '[He] 2s2 2p4',
    electronegativity: 3.44, ionizationEnergy: 1314, atomicRadius: 48,
    commonOxidationStates: [-2, -1, 1, 2],
    jeeKeyNotes: 'Paramagnetic nature of O2 is explained by Molecular Orbital Theory (2 unpaired electrons in π*2px, π*2py anti-bonding orbitals); OF2 exhibits +2 oxidation state.'
  },
  {
    number: 9, symbol: 'F', name: 'Fluorine', atomicMass: 18.998, category: 'halogen',
    group: 17, period: 2, block: 'p', electronConfig: '[He] 2s2 2p5',
    electronegativity: 3.98, ionizationEnergy: 1681, atomicRadius: 42,
    commonOxidationStates: [-1],
    jeeKeyNotes: 'Most electronegative element (3.98); strongest oxidizing agent (E° = +2.87 V); lower electron gain enthalpy than Cl due to intense inter-electronic repulsion in compact 2p orbital.'
  },
  {
    number: 10, symbol: 'Ne', name: 'Neon', atomicMass: 20.180, category: 'noble-gas',
    group: 18, period: 2, block: 'p', electronConfig: '[He] 2s2 2p6',
    electronegativity: undefined, ionizationEnergy: 2080, atomicRadius: 38,
    commonOxidationStates: [0],
    jeeKeyNotes: 'Completely filled octet; zero electron affinity; used in discharge lamps and cryogenic refrigeration.'
  },

  // Period 3
  {
    number: 11, symbol: 'Na', name: 'Sodium', atomicMass: 22.990, category: 'alkali',
    group: 1, period: 3, block: 's', electronConfig: '[Ne] 3s1',
    electronegativity: 0.93, ionizationEnergy: 496, atomicRadius: 190,
    commonOxidationStates: [1],
    jeeKeyNotes: 'Dissolves in liquid ammonia to give deep blue conducting solutions containing ammoniated electrons; forms peroxide Na2O2 upon heating in excess air.'
  },
  {
    number: 12, symbol: 'Mg', name: 'Magnesium', atomicMass: 24.305, category: 'alkaline-earth',
    group: 2, period: 3, block: 's', electronConfig: '[Ne] 3s2',
    electronegativity: 1.31, ionizationEnergy: 738, atomicRadius: 145,
    commonOxidationStates: [2],
    jeeKeyNotes: 'Forms Grignard reagents (R-Mg-X) in dry ether; central metal ion coordinated in chlorophyll.'
  },
  {
    number: 13, symbol: 'Al', name: 'Aluminium', atomicMass: 26.982, category: 'post-transition',
    group: 13, period: 3, block: 'p', electronConfig: '[Ne] 3s2 3p1',
    electronegativity: 1.61, ionizationEnergy: 578, atomicRadius: 118,
    commonOxidationStates: [3],
    jeeKeyNotes: 'Dimeric Al2Cl6 with halogen bridge bonds in vapor and non-polar solvents; amphoteric Al2O3; extracted via Hall-Héroult electrolytic process.'
  },
  {
    number: 14, symbol: 'Si', name: 'Silicon', atomicMass: 28.085, category: 'metalloid',
    group: 14, period: 3, block: 'p', electronConfig: '[Ne] 3s2 3p2',
    electronegativity: 1.90, ionizationEnergy: 786, atomicRadius: 111,
    commonOxidationStates: [4, -4],
    jeeKeyNotes: 'Forms 3D network covalent structure in SiO2 (each Si tetrahedral to 4 O atoms); silicones are synthetic organosilicon polymers with hydrophobic Si-O-Si linkages.'
  },
  {
    number: 15, symbol: 'P', name: 'Phosphorus', atomicMass: 30.974, category: 'nonmetal',
    group: 15, period: 3, block: 'p', electronConfig: '[Ne] 3s2 3p3',
    electronegativity: 2.19, ionizationEnergy: 1012, atomicRadius: 98,
    commonOxidationStates: [5, 3, -3],
    jeeKeyNotes: 'White phosphorus P4 is tetrahedral with 60° bond angles (high angular ring strain, catches fire spontaneously in air); H3PO2 is monobasic and strong reducing agent with 2 P-H bonds.'
  },
  {
    number: 16, symbol: 'S', name: 'Sulfur', atomicMass: 32.06, category: 'nonmetal',
    group: 16, period: 3, block: 'p', electronConfig: '[Ne] 3s2 3p4',
    electronegativity: 2.58, ionizationEnergy: 1000, atomicRadius: 88,
    commonOxidationStates: [6, 4, 2, -2],
    jeeKeyNotes: 'Rhombic (alpha) and Monoclinic (beta) sulfur both exist as puckered crown-shaped S8 rings; Caro\'s acid (H2SO5) and Marshall\'s acid (H2S2O8) contain peroxy (-O-O-) linkages.'
  },
  {
    number: 17, symbol: 'Cl', name: 'Chlorine', atomicMass: 35.45, category: 'halogen',
    group: 17, period: 3, block: 'p', electronConfig: '[Ne] 3s2 3p5',
    electronegativity: 3.16, ionizationEnergy: 1251, atomicRadius: 79,
    commonOxidationStates: [7, 5, 3, 1, -1],
    jeeKeyNotes: 'Highest negative electron gain enthalpy in the periodic table (-349 kJ/mol); disproportionates in cold dilute NaOH to chloride + hypochlorite, and in hot conc. NaOH to chloride + chlorate.'
  },
  {
    number: 18, symbol: 'Ar', name: 'Argon', atomicMass: 39.948, category: 'noble-gas',
    group: 18, period: 3, block: 'p', electronConfig: '[Ne] 3s2 3p6',
    electronegativity: undefined, ionizationEnergy: 1521, atomicRadius: 71,
    commonOxidationStates: [0],
    jeeKeyNotes: 'Most abundant noble gas in Earth\'s atmosphere (~0.93% by volume); provides inert atmosphere for metallurgy and welding.'
  },

  // Key Transition Metals & Period 4
  {
    number: 19, symbol: 'K', name: 'Potassium', atomicMass: 39.098, category: 'alkali',
    group: 1, period: 4, block: 's', electronConfig: '[Ar] 4s1',
    electronegativity: 0.82, ionizationEnergy: 419, atomicRadius: 243,
    commonOxidationStates: [1],
    jeeKeyNotes: 'Forms superoxide KO2 with paramagnetic O2- anion, used in submarines and oxygen masks to absorb CO2 and release O2; lilac flame color.'
  },
  {
    number: 20, symbol: 'Ca', name: 'Calcium', atomicMass: 40.078, category: 'alkaline-earth',
    group: 2, period: 4, block: 's', electronConfig: '[Ar] 4s2',
    electronegativity: 1.00, ionizationEnergy: 590, atomicRadius: 194,
    commonOxidationStates: [2],
    jeeKeyNotes: 'Brick-red flame test; CaSO4 · 1/2 H2O is Plaster of Paris (POP); slaked lime Ca(OH)2 turns lime water milky with CO2.'
  },
  {
    number: 21, symbol: 'Sc', name: 'Scandium', atomicMass: 44.956, category: 'transition',
    group: 3, period: 4, block: 'd', electronConfig: '[Ar] 3d1 4s2',
    electronegativity: 1.36, ionizationEnergy: 633, atomicRadius: 184,
    commonOxidationStates: [3],
    jeeKeyNotes: 'Only stable oxidation state is +3 (d0, completely diamagnetic and colorless in aqueous solution).'
  },
  {
    number: 22, symbol: 'Ti', name: 'Titanium', atomicMass: 47.867, category: 'transition',
    group: 4, period: 4, block: 'd', electronConfig: '[Ar] 3d2 4s2',
    electronegativity: 1.54, ionizationEnergy: 659, atomicRadius: 176,
    commonOxidationStates: [4, 3, 2],
    jeeKeyNotes: 'Ziegler-Natta catalyst TiCl4 + Al(C2H5)3 used for stereospecific coordination polymerization of ethene to HDPE; purple [Ti(H2O)6]3+ due to d-d transition.'
  },
  {
    number: 23, symbol: 'V', name: 'Vanadium', atomicMass: 50.942, category: 'transition',
    group: 5, period: 4, block: 'd', electronConfig: '[Ar] 3d3 4s2',
    electronegativity: 1.63, ionizationEnergy: 651, atomicRadius: 171,
    commonOxidationStates: [5, 4, 3, 2],
    jeeKeyNotes: 'V2O5 is the heterogeneous catalyst in the Contact Process for converting SO2 to SO3.'
  },
  {
    number: 24, symbol: 'Cr', name: 'Chromium', atomicMass: 51.996, category: 'transition',
    group: 6, period: 4, block: 'd', electronConfig: '[Ar] 3d5 4s1',
    electronegativity: 1.66, ionizationEnergy: 653, atomicRadius: 166,
    commonOxidationStates: [6, 3, 2],
    jeeKeyNotes: 'Exceptional configuration [Ar] 3d5 4s1 due to half-filled subshell stability; dichromate Cr2O7^2- (orange) interconverts with chromate CrO4^2- (yellow) based on pH; CrO5 is blue butterfly peroxide complex.'
  },
  {
    number: 25, symbol: 'Mn', name: 'Manganese', atomicMass: 54.938, category: 'transition',
    group: 7, period: 4, block: 'd', electronConfig: '[Ar] 3d5 4s2',
    electronegativity: 1.55, ionizationEnergy: 717, atomicRadius: 161,
    commonOxidationStates: [7, 6, 4, 3, 2],
    jeeKeyNotes: 'Exhibits highest number of oxidation states (+2 to +7); intense purple color of KMnO4 is due to ligand-to-metal charge transfer (LMCT), not d-d transition.'
  },
  {
    number: 26, symbol: 'Fe', name: 'Iron', atomicMass: 55.845, category: 'transition',
    group: 8, period: 4, block: 'd', electronConfig: '[Ar] 3d6 4s2',
    electronegativity: 1.83, ionizationEnergy: 762, atomicRadius: 156,
    commonOxidationStates: [3, 2],
    jeeKeyNotes: 'Ferromagnetism; Prussian blue Fe4[Fe(CN)6]3 formed in Lassaigne extract test for nitrogen; brown ring complex [Fe(H2O)5(NO)]SO4 contains Fe in +1 oxidation state with NO+.'
  },
  {
    number: 27, symbol: 'Co', name: 'Cobalt', atomicMass: 58.933, category: 'transition',
    group: 9, period: 4, block: 'd', electronConfig: '[Ar] 3d7 4s2',
    electronegativity: 1.88, ionizationEnergy: 760, atomicRadius: 152,
    commonOxidationStates: [3, 2],
    jeeKeyNotes: 'Central metal in Vitamin B12 (cyanocobalamin); [Co(NH3)6]3+ is diamagnetic inner orbital complex (d2sp3) whereas [CoF6]3- is paramagnetic outer orbital complex (sp3d2).'
  },
  {
    number: 28, symbol: 'Ni', name: 'Nickel', atomicMass: 58.693, category: 'transition',
    group: 10, period: 4, block: 'd', electronConfig: '[Ar] 3d8 4s2',
    electronegativity: 1.91, ionizationEnergy: 737, atomicRadius: 149,
    commonOxidationStates: [2, 0],
    jeeKeyNotes: 'Mond\'s process for refining Ni uses volatile Ni(CO)4 (sp3 tetrahedral, zero oxidation state); dimethylglyoxime (DMG) test yields scarlet red rosary chelate precipitate with intramolecular H-bonds.'
  },
  {
    number: 29, symbol: 'Cu', name: 'Copper', atomicMass: 63.546, category: 'transition',
    group: 11, period: 4, block: 'd', electronConfig: '[Ar] 3d10 4s1',
    electronegativity: 1.90, ionizationEnergy: 745, atomicRadius: 145,
    commonOxidationStates: [2, 1],
    jeeKeyNotes: 'Exception configuration [Ar] 3d10 4s1; Cu2+(aq) is more stable than Cu+(aq) due to higher hydration enthalpy; Jahn-Teller distortion causes tetragonally elongated octahedral complexes.'
  },
  {
    number: 30, symbol: 'Zn', name: 'Zinc', atomicMass: 65.38, category: 'transition',
    group: 12, period: 4, block: 'd', electronConfig: '[Ar] 3d10 4s2',
    electronegativity: 1.65, ionizationEnergy: 906, atomicRadius: 142,
    commonOxidationStates: [2],
    jeeKeyNotes: 'Not considered a typical transition element because 3d subshell is completely filled in both elemental state and common +2 oxidation state; amphoteric ZnO.'
  },
  {
    number: 35, symbol: 'Br', name: 'Bromine', atomicMass: 79.904, category: 'halogen',
    group: 17, period: 4, block: 'p', electronConfig: '[Ar] 3d10 4s2 4p5',
    electronegativity: 2.96, ionizationEnergy: 1140, atomicRadius: 94,
    commonOxidationStates: [5, 3, 1, -1],
    jeeKeyNotes: 'Only liquid non-metal at standard conditions; reddish-brown fumes; decolorization of Br2/CCl4 is standard unsaturation test.'
  },
  {
    number: 47, symbol: 'Ag', name: 'Silver', atomicMass: 107.87, category: 'transition',
    group: 11, period: 5, block: 'd', electronConfig: '[Kr] 4d10 5s1',
    electronegativity: 1.93, ionizationEnergy: 731, atomicRadius: 165,
    commonOxidationStates: [1],
    jeeKeyNotes: 'Tollens\' reagent [Ag(NH3)2]+ oxidizes aldehydes to carboxylates producing silver mirror; AgCl is white, AgBr pale yellow, AgI deep yellow precipitate.'
  },
  {
    number: 53, symbol: 'I', name: 'Iodine', atomicMass: 126.90, category: 'halogen',
    group: 17, period: 5, block: 'p', electronConfig: '[Kr] 4d10 5s2 5p5',
    electronegativity: 2.66, ionizationEnergy: 1008, atomicRadius: 115,
    commonOxidationStates: [7, 5, 1, -1],
    jeeKeyNotes: 'Forms lustrous violet crystals that sublime; Iodoform test (CHI3 yellow precipitate with antiseptic odor) detects CH3-C=O and CH3-CH(OH)- groups; starch-iodide test turns deep blue (inclusion complex).'
  },
  {
    number: 54, symbol: 'Xe', name: 'Xenon', atomicMass: 131.29, category: 'noble-gas',
    group: 18, period: 5, block: 'p', electronConfig: '[Kr] 4d10 5s2 5p6',
    electronegativity: 2.60, ionizationEnergy: 1170, atomicRadius: 108,
    commonOxidationStates: [6, 4, 2],
    jeeKeyNotes: 'Neil Bartlett prepared first noble gas compound Xe+[PtF6]-; XeF2 is linear (sp3d with 3 equatorial lone pairs), XeF4 is square planar (sp3d2 with 2 axial lone pairs), XeO3 is pyramidal.'
  },
  {
    number: 79, symbol: 'Au', name: 'Gold', atomicMass: 196.97, category: 'transition',
    group: 11, period: 6, block: 'd', electronConfig: '[Xe] 4f14 5d10 6s1',
    electronegativity: 2.54, ionizationEnergy: 890, atomicRadius: 174,
    commonOxidationStates: [3, 1],
    jeeKeyNotes: 'Relativistic contraction gives Au its yellow luster and high electronegativity; dissolves in Aqua Regia (3 HCl : 1 HNO3) to form chloroauric acid H[AuCl4].'
  },
  {
    number: 80, symbol: 'Hg', name: 'Mercury', atomicMass: 200.59, category: 'transition',
    group: 12, period: 6, block: 'd', electronConfig: '[Xe] 4f14 5d10 6s2',
    electronegativity: 2.00, ionizationEnergy: 1007, atomicRadius: 171,
    commonOxidationStates: [2, 1],
    jeeKeyNotes: 'Liquid metal at room temp due to poor shielding of 4f electrons and inert 6s2 pair; exists as dimeric mercurous ion [Hg2]^2+ with metal-metal single bond.'
  },
  {
    number: 82, symbol: 'Pb', name: 'Lead', atomicMass: 207.2, category: 'post-transition',
    group: 14, period: 6, block: 'p', electronConfig: '[Xe] 4f14 5d10 6s2 6p2',
    electronegativity: 2.33, ionizationEnergy: 716, atomicRadius: 154,
    commonOxidationStates: [2, 4],
    jeeKeyNotes: 'Inert pair effect causes +2 oxidation state to be much more stable than +4; PbO2 is a potent oxidizing agent; PbI2 produces the golden spangles precipitate.'
  }
];
