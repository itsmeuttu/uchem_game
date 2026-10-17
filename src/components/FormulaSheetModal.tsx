import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { FORMULA_ITEMS, GLOSSARY_ITEMS } from '../data/formulas';
import { X, Search, BookOpen, Atom, Copy, Check, Sparkles, Filter } from 'lucide-react';
import { sound } from '../utils/audio';
import { ChemFormula } from '../utils/chemFormatter';

export const FormulaSheetModal: React.FC = () => {
  const { formulaSheetOpen, setFormulaSheetOpen } = useGame();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'Physical' | 'Organic' | 'Inorganic' | 'glossary'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!formulaSheetOpen) return null;

  const handleCopy = (text: string, id: string) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredFormulas = FORMULA_ITEMS.filter(f => {
    const matchesTab = activeTab === 'all' || f.category === activeTab;
    const matchesSearch = 
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.chapter.toLowerCase().includes(search.toLowerCase()) ||
      f.equation.toLowerCase().includes(search.toLowerCase()) ||
      f.jeeTips.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const filteredGlossary = GLOSSARY_ITEMS.filter(g => {
    const matchesTab = activeTab === 'all' || activeTab === 'glossary' || g.category === activeTab;
    const matchesSearch = 
      g.term.toLowerCase().includes(search.toLowerCase()) ||
      g.definition.toLowerCase().includes(search.toLowerCase()) ||
      g.jeeImportance.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[#101522] border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#151C2C]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                JEE Chemistry Formula Sheet & Glossary
                <Sparkles className="w-4 h-4 text-cyan-400 inline" />
              </h3>
              <p className="text-xs text-[#9BA6BC]">
                High-yield equations, constants, and critical concepts for JEE Main & Advanced
              </p>
            </div>
          </div>
          
          <button
            onClick={() => {
              sound.playClick();
              setFormulaSheetOpen(false);
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close formula modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 sm:px-6 bg-[#0B0F19] border-b border-white/10 flex flex-col sm:flex-row items-center gap-3">
          
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search equations (Nernst, Gibbs, buffer, CFT...)"
              className="w-full pl-9 pr-4 py-2 bg-[#151C2C] border border-white/10 focus:border-cyan-400 rounded-xl text-xs text-white placeholder-gray-500 outline-none transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {(['all', 'Physical', 'Organic', 'Inorganic', 'glossary'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(tab);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer capitalize ${
                  activeTab === tab
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                    : 'bg-white/5 text-[#9BA6BC] hover:text-white hover:bg-white/10'
                }`}
              >
                {tab === 'all' ? 'All Reference' : tab}
              </button>
            ))}
          </div>

        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Formulas Section */}
          {activeTab !== 'glossary' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Atom className="w-3.5 h-3.5" />
                  Key Formulas ({filteredFormulas.length})
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {filteredFormulas.map(f => (
                  <div
                    key={f.id}
                    className="p-4 rounded-xl bg-[#151C2C] border border-white/10 hover:border-cyan-400/30 transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{f.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
                          {f.chapter}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(f.equation, f.id)}
                        className="opacity-60 group-hover:opacity-100 p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-cyan-400 text-xs flex items-center gap-1 transition-all cursor-pointer"
                        title="Copy formula text"
                      >
                        {copiedId === f.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 text-[10px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[10px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Equation Display (KaTeX) */}
                    <div className="p-3 rounded-lg bg-[#080B12] border border-cyan-500/20 text-xs sm:text-sm text-cyan-300 font-semibold tracking-wide overflow-x-auto flex items-center">
                      <ChemFormula formula={f.equation} />
                    </div>

                    <p className="text-xs text-[#9BA6BC] leading-relaxed">
                      <strong className="text-gray-300">Variables:</strong> {f.variables}
                    </p>

                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 leading-tight">
                      <span className="font-bold text-amber-400">JEE Tip:</span> {f.jeeTips}
                    </div>
                  </div>
                ))}

                {filteredFormulas.length === 0 && (
                  <p className="text-xs text-center py-6 text-gray-400">
                    No formulas matching "{search}".
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Chemistry Glossary Section */}
          {(activeTab === 'all' || activeTab === 'glossary') && (
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-violet-400 flex items-center gap-2">
                <Filter className="w-3.5 h-3.5" />
                High-Yield Concepts & Glossary ({filteredGlossary.length})
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredGlossary.map((g, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#151C2C] border border-white/10 hover:border-violet-400/40 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{g.term}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/25">
                        {g.category}
                      </span>
                    </div>

                    <p className="text-xs text-[#9BA6BC] leading-relaxed">
                      {g.definition}
                    </p>

                    {g.example && (
                      <p className="text-[11px] font-mono text-cyan-300 bg-[#080B12] p-1.5 rounded border border-white/5">
                        <strong className="text-gray-400">e.g.</strong> {g.example}
                      </p>
                    )}

                    <p className="text-[10px] text-violet-300/80 font-medium">
                      🎯 <strong className="text-violet-200">JEE Focus:</strong> {g.jeeImportance}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 sm:px-6 bg-[#080B12] border-t border-white/10 flex items-center justify-between text-xs text-[#9BA6BC]">
          <span>Tip: Press Esc or click Close to return to your game.</span>
          <button
            onClick={() => setFormulaSheetOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 font-semibold cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
