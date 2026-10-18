import React from 'react';
import katex from 'katex';

interface ChemFormulaProps {
  formula: string;
  className?: string;
  displayMode?: boolean;
}

/**
 * Pure KaTeX renderer component for mathematical and chemical formulas.
 */
export const KaTeXRender: React.FC<{ math: string; displayMode?: boolean; className?: string }> = ({
  math,
  displayMode = false,
  className = ''
}) => {
  try {
    const html = katex.renderToString(math, {
      displayMode,
      throwOnError: false,
      output: 'htmlAndMathml',
      strict: false
    });

    return (
      <span
        className={`inline-katex tracking-normal ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch {
    return <span className={className}>{math}</span>;
  }
};

/**
 * Checks if a token is a chemical formula or math expression,
 * and if so, returns the LaTeX representation.
 * Otherwise returns null to treat it as standard English text.
 */
function toChemicalLatex(token: string): string | null {
  if (!token) return null;

  // Standalone arrows
  if (token === '->' || token === '→') return '\\longrightarrow';
  if (token === '<=>' || token === '<==>' || token === '⇌') return '\\rightleftharpoons';

  // Specific common chemical & physical variables
  if (token === 'pH') return '\\mathrm{pH}';
  if (token === 'pOH') return '\\mathrm{pOH}';
  if (token === 'pKa') return '\\mathrm{p}K_a';
  if (token === 'pKb') return '\\mathrm{p}K_b';
  if (token === 'Kw') return 'K_w';
  if (token === 'Ka') return 'K_a';
  if (token === 'Kb') return 'K_b';
  if (token === 'Kp') return 'K_p';
  if (token === 'Kc') return 'K_c';
  if (token === 'Keq') return 'K_{\\mathrm{eq}}';
  if (token === 'ΔH') return '\\Delta H';
  if (token === 'ΔS') return '\\Delta S';
  if (token === 'ΔG') return '\\Delta G';
  if (token === 'Δo' || token === 'Δ_o') return '\\Delta_o';
  if (token === 'ΔTb') return '\\Delta T_b';
  if (token === 'ΔTf') return '\\Delta T_f';
  if (token === 'μ' || token === 'μs' || token === 'μ_s') return '\\mu_s';
  if (token === 'E°' || token === 'E°cell') return 'E^\\circ_{\\mathrm{cell}}';

  // Scientific notation e.g. 10^-8, 10^-7, 10^-2, 10^5
  if (/^10\^[-+]?\d+$/.test(token)) {
    return token.replace(/\^([-+]?\d+)/, '^{$1}');
  }

  // Check if it's a chemical formula:
  // Must have capital letter and (digit or charge or bond or bracket)
  // e.g. KMnO4, FeC2O4, H2O, Fe2+, MnO4-, [CoF6]3-, CH3-CH(Br)-CH3, (CH3)3C-CH2OH, etc.
  const hasDigitInChemical = /[A-Z][a-z]?\d+/.test(token);
  const hasIonCharge = /[A-Za-z)\]](\d*[+-]|\^[0-9+-]+)/.test(token);
  const hasChemicalBonds = /[A-Z][a-z]?\d*-[A-Z]/.test(token);
  const hasCoordinationBracket = /\[[A-Z][a-zA-Z0-9(),\s]*\]/.test(token);

  // If it's a regular English word like "How", "many", "moles", "acidified", "completely", "oxalate", etc.
  // it won't match any of the above.
  if (!hasDigitInChemical && !hasIonCharge && !hasChemicalBonds && !hasCoordinationBracket) {
    return null;
  }

  // Convert chemical token to LaTeX
  let latex = token;

  // Convert charges like 2+, 3+, 2-, +, - to superscript
  latex = latex.replace(/(\^\{[^}]+\}|\^[0-9+-]+)/g, match => {
    return `^{${match.replace(/^\^\{?|\}?$/g, '')}}`;
  });

  // Handle ion charges at the end of groups, e.g. Fe2+ -> Fe^{2+}, MnO4- -> MnO4^{-}, Cl- -> Cl^{-}
  latex = latex.replace(/([A-Za-z0-9)\]])(\d*)([+-])(?=\s|$|[)\]])/g, '$1^{$2$3}');

  // Convert numbers in chemical formulas to subscripts, e.g. KMnO4 -> KMnO_{4}, FeC2O4 -> FeC_{2}O_{4}
  latex = latex.replace(/([A-Za-z)\]])(\d+)/g, '$1_{$2}');

  return `\\mathrm{${latex}}`;
}

/**
 * Parses mixed text containing English words, chemical formulas, and equations.
 * Preserves normal English spaces and typography, while rendering chemical formulas with KaTeX!
 */
export const ChemFormula: React.FC<ChemFormulaProps> = ({ formula, className = '', displayMode = false }) => {
  if (!formula) return null;

  // Case 1: Text contains explicit LaTeX $ ... $ delimiters
  if (formula.includes('$')) {
    const parts = formula.split(/(\$[^$]+\$)/g);
    return (
      <span className={className}>
        {parts.map((part, index) => {
          if (part.startsWith('$') && part.endsWith('$')) {
            const math = part.slice(1, -1);
            return <KaTeXRender key={index} math={math} displayMode={displayMode} />;
          }
          // Recursively format the non-LaTeX text between math blocks
          return <ChemFormula key={index} formula={part} />;
        })}
      </span>
    );
  }

  // Case 2: Multi-word English sentence or phrase containing chemical formulas
  // Split while keeping whitespaces
  const tokens = formula.split(/(\s+)/);

  return (
    <span className={className}>
      {tokens.map((token, idx) => {
        // Preserve whitespace exactly as in original text
        if (/^\s+$/.test(token)) {
          return <React.Fragment key={idx}>{token}</React.Fragment>;
        }

        // Separate leading and trailing punctuation (e.g. "(FeC2O4)?" -> leading "(", core "FeC2O4", trailing ")?")
        const match = token.match(/^([([{'"]*)(.*?)([)\]}'",.?:]*)$/);
        if (!match) {
          return <span key={idx}>{token}</span>;
        }

        const [, leadingPunct, coreToken, trailingPunct] = match;

        // Try to convert core token into chemical LaTeX
        const chemLatex = toChemicalLatex(coreToken);

        if (chemLatex) {
          return (
            <span key={idx} className="inline-flex items-baseline">
              {leadingPunct && <span>{leadingPunct}</span>}
              <KaTeXRender math={chemLatex} />
              {trailingPunct && <span>{trailingPunct}</span>}
            </span>
          );
        }

        // Standard English word: render as plain readable text
        return <span key={idx}>{token}</span>;
      })}
    </span>
  );
};

/**
 * Formats mixed text containing chemical formulas or equations.
 */
export const formatChemistryText = (text: string): React.ReactNode => {
  return <ChemFormula formula={text} />;
};
