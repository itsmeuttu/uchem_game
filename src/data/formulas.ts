export interface FormulaItem {
  id: string;
  name: string;
  category: 'Physical' | 'Organic' | 'Inorganic';
  chapter: string;
  equation: string;
  variables: string;
  jeeTips: string;
}

export interface GlossaryItem {
  term: string;
  category: 'Physical' | 'Organic' | 'Inorganic' | 'General';
  definition: string;
  example?: string;
  jeeImportance: string;
}

export const FORMULA_ITEMS: FormulaItem[] = [
  {
    id: 'f-nernst',
    name: 'Nernst Equation',
    category: 'Physical',
    chapter: 'Electrochemistry',
    equation: '$E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{2.303 RT}{nF} \\log_{10} Q = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n} \\log_{10} Q\\text{ (at 298 K)}$',
    variables: 'E = cell potential, n = number of moles of electrons transferred, Q = reaction quotient ([Products] / [Reactants])',
    jeeTips: 'Pure solids and pure liquids have activity = 1 and are omitted from Q. Always double-check n by balancing redox half-reactions.'
  },
  {
    id: 'f-gibbs',
    name: 'Gibbs Free Energy & Spontaneity',
    category: 'Physical',
    chapter: 'Thermodynamics',
    equation: '$\\Delta G = \\Delta H - T\\Delta S \\quad ; \\quad \\Delta G^\\circ = -nFE^\\circ_{\\text{cell}} = -RT \\ln K_{\\text{eq}} = -2.303 RT \\log_{10} K_{\\text{eq}}$',
    variables: 'ΔG < 0 (spontaneous), ΔG = 0 (equilibrium), ΔG > 0 (non-spontaneous). T must always be in Kelvin.',
    jeeTips: 'Beware unit traps: ΔH is usually given in kJ/mol while ΔS is in J/(K·mol). Always convert before calculating!'
  },
  {
    id: 'f-arrhenius',
    name: 'Arrhenius Equation',
    category: 'Physical',
    chapter: 'Chemical Kinetics',
    equation: '$k = A e^{-\\frac{E_a}{RT}} \\implies \\log_{10}\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{2.303 R} \\left[\\frac{T_2 - T_1}{T_1 T_2}\\right]$',
    variables: 'k = rate constant, Ea = activation energy, A = pre-exponential factor, R = 8.314 J/(mol·K)',
    jeeTips: 'Slope of log k vs 1/T plot is -Ea / (2.303 R). A catalyst lowers Ea but leaves ΔH unchanged.'
  },
  {
    id: 'f-buffer',
    name: 'Henderson-Hasselbalch Equation',
    category: 'Physical',
    chapter: 'Ionic Equilibrium',
    equation: '$\\text{pH} = \\text{p}K_a + \\log_{10}\\left(\\frac{[\\text{Salt}]}{[\\text{Acid}]}\\right) \\quad ; \\quad \\text{pOH} = \\text{p}K_b + \\log_{10}\\left(\\frac{[\\text{Salt}]}{[\\text{Base}]}\\right)$',
    variables: 'pKa = -log Ka. Maximum buffer capacity occurs when [Salt] = [Acid], giving pH = pKa.',
    jeeTips: 'Adding small amounts of strong acid or base shifts the ratio but buffer resists drastic pH swings.'
  },
  {
    id: 'f-spin-only',
    name: 'Spin-Only Magnetic Moment',
    category: 'Inorganic',
    chapter: 'Coordination Compounds',
    equation: '$\\mu_s = \\sqrt{n(n + 2)}\\text{ Bohr Magnetons (BM)}$',
    variables: 'n = number of unpaired electrons in the central d-block ion.',
    jeeTips: 'Common shortcuts: n=1 => 1.73 BM, n=2 => 2.83 BM, n=3 => 3.87 BM, n=4 => 4.90 BM, n=5 => 5.92 BM.'
  },
  {
    id: 'f-colligative',
    name: 'Colligative Properties & Van \'t Hoff Factor',
    category: 'Physical',
    chapter: 'Solutions',
    equation: '$\\Delta T_b = i K_b m \\quad ; \\quad \\Delta T_f = i K_f m \\quad ; \\quad \\Pi = i C R T \\quad ; \\quad \\frac{P^\\circ - P_s}{P^\\circ} = i X_{\\text{solute}}$',
    variables: 'i = 1 + (n - 1)α for dissociation; i = 1 + (1/n - 1)β for association.',
    jeeTips: 'For strong electrolytes like K4[Fe(CN)6], assume α = 1 => i = 1 + (5 - 1)*1 = 5.'
  },
  {
    id: 'f-spectrochemical',
    name: 'Spectrochemical Series (Ligand Field Strength)',
    category: 'Inorganic',
    chapter: 'Coordination Compounds',
    equation: '$\\text{I}^- < \\text{Br}^- < \\text{S}^{2-} < \\text{SCN}^- < \\text{Cl}^- < \\text{F}^- < \\text{OH}^- < \\text{C}_2\\text{O}_4^{2-} < \\text{H}_2\\text{O} < \\text{NCS}^- < \\text{EDTA}^{4-} < \\text{NH}_3 < \\text{en} < \\text{NO}_2^- < \\text{CN}^- < \\text{CO}$',
    variables: 'Ligands before H2O are typically weak-field (high-spin); ligands to the right of NH3 are strong-field (low-spin).',
    jeeTips: 'CO is the strongest known field ligand due to synergistic π-backbonding into empty π* orbitals.'
  }
];

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    term: 'Azeotrope',
    category: 'Physical',
    definition: 'A constant-boiling binary mixture of liquids that boils at a specific fixed temperature with identical composition in both liquid and vapor phases, preventing separation by fractional distillation.',
    example: '95.6% ethanol + 4.4% water forms a minimum boiling azeotrope.',
    jeeImportance: 'Frequently tested in Solutions; positive deviation from Raoult\'s law gives minimum boiling azeotrope, negative gives maximum.'
  },
  {
    term: 'Jahn-Teller Effect',
    category: 'Inorganic',
    definition: 'Any non-linear molecular system in a degenerate electronic state will undergo geometric distortion that removes that degeneracy and lowers overall electronic energy.',
    example: 'Cu2+ (d9) octahedral complexes undergo strong tetragonal elongation with two long axial Cu-L bonds and four short equatorial bonds.',
    jeeImportance: 'High-frequency question in JEE Advanced Coordination Compounds.'
  },
  {
    term: 'Hyperconjugation (Baker-Nathan Effect)',
    category: 'Organic',
    definition: 'Delocalization of sigma electrons of C-H or C-C bonds with an adjacent empty p-orbital, carbocation, free radical, or unhybridized π-orbital, imparting significant structural stability.',
    example: 'Stability of 3° carbocation (CH3)3C+ is stabilized by 9 alpha C-H hyperconjugative bonds.',
    jeeImportance: 'Determines carbocation stability and Saytzeff alkene stability.'
  },
  {
    term: 'Inert Pair Effect',
    category: 'Inorganic',
    definition: 'Reluctance of the valence s-electrons of heavier p-block elements (Period 6: Tl, Pb, Bi) to participate in chemical bonding due to poor shielding by intervening 4f and 5d subshells.',
    example: 'Pb(II) is stable while Pb(IV) is a strong oxidizing agent; Tl(I) is more stable than Tl(III).',
    jeeImportance: 'Essential explanation for lower oxidation state stability down p-block groups.'
  },
  {
    term: 'Cannizzaro Reaction',
    category: 'Organic',
    definition: 'Self oxidation-reduction (disproportionation) of aldehydes lacking alpha-hydrogens in the presence of concentrated alkali to produce an alcohol and a carboxylic acid salt.',
    example: '2 C6H5CHO + 50% NaOH -> C6H5CH2OH + C6H5COONa',
    jeeImportance: 'Classic diagnostic reaction in JEE Aldehydes & Ketones.'
  },
  {
    term: 'Lanthanoid Contraction',
    category: 'Inorganic',
    definition: 'The steady decrease in atomic and ionic radii along the 14 lanthanoid elements (La to Lu) caused by imperfect shielding of the 4f electrons.',
    example: 'Causes Zr (Period 5) and Hf (Period 6) to possess almost identical covalent radii (160 pm vs 159 pm).',
    jeeImportance: 'Explains chemical twin properties of 4d/5d transition metals.'
  }
];
