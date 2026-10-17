import React from 'react';
import katex from 'katex';

interface ChemFormulaProps {
  formula: string;
  className?: string;
  displayMode?: boolean;
}

/**
 * Automatically converts raw chemistry text into properly formatted LaTeX for KaTeX.
 * Handles subscripts, superscripts, reaction arrows, equilibrium symbols, and formulas.
 */
export const chemistryToLatex = (text: string): string => {
  if (!text) return '';

  let converted = text;

  // If already full LaTeX with $...$ or contains backslashes like \Delta or \frac, return cleaned
  if (converted.includes('\\frac') || converted.includes('\\sqrt') || converted.includes('\\Delta')) {
    return converted.replace(/^\$+|\$+$/g, '');
  }

  // Replace reaction symbols
  converted = converted
    .replace(/<==>|<=>|⇌/g, ' \\rightleftharpoons ')
    .replace(/->|→/g, ' \\longrightarrow ')
    .replace(/Delta|Δ/g, '\\Delta ')
    .replace(/alpha|α/g, '\\alpha ')
    .replace(/beta|β/g, '\\beta ')
    .replace(/pi|π/g, '\\pi ')
    .replace(/sigma|σ/g, '\\sigma ')
    .replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}')
    .replace(/([A-Za-z0-9]+)\^\{([^}]+)\}/g, '{$1}^{$2}')
    .replace(/([A-Za-z0-9]+)\_\{([^}]+)\}/g, '{$1}_{$2}');

  return converted;
};

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
 * Comprehensive chemistry formula and text parser.
 * Renders inline LaTeX expressions enclosed in $...$ with KaTeX,
 * and formats raw chemical reactions with subscripts and reaction arrows.
 */
export const ChemFormula: React.FC<ChemFormulaProps> = ({ formula, className = '', displayMode = false }) => {
  if (!formula) return null;

  // Case 1: Text contains explicit $...$ LaTeX tokens
  if (formula.includes('$')) {
    const parts = formula.split(/(\$[^$]+\$)/g);
    return (
      <span className={className}>
        {parts.map((part, index) => {
          if (part.startsWith('$') && part.endsWith('$')) {
            const math = part.slice(1, -1);
            return <KaTeXRender key={index} math={math} displayMode={displayMode} />;
          }
          return <span key={index}>{part}</span>;
        })}
      </span>
    );
  }

  // Case 2: Standard equation or raw formula (e.g. "MnO4- + 8H+ + 5e- -> Mn2+ + 4H2O" or "E_cell = E° - (0.0591 / n) * log Q")
  // If it contains arrows or mathematical variables, render with KaTeX
  if (formula.includes('->') || formula.includes('<=>') || formula.includes('=') || formula.includes('^') || formula.includes('_') || formula.includes('Δ')) {
    const latex = chemistryToLatex(formula);
    return <KaTeXRender math={latex} displayMode={displayMode} className={className} />;
  }

  // Case 3: Simple molecule (e.g., "H2SO4", "CH3COOH", "FeC2O4", "[CoF6]3-")
  // Format numbers to subscripts and charges to superscripts
  const formatted = formula
    .replace(/([A-Za-z)\]])(\d+)/g, '$1_{$2}')
    .replace(/(\d*)([+-])(?=\s|$|[A-Z)\]])/g, '^{$1$2}');

  if (formatted !== formula) {
    return <KaTeXRender math={`\\mathrm{${formatted}}`} displayMode={displayMode} className={className} />;
  }

  return <span className={className}>{formula}</span>;
};

/**
 * Formats mixed text containing chemical formulas or equations.
 */
export const formatChemistryText = (text: string): React.ReactNode => {
  return <ChemFormula formula={text} />;
};
