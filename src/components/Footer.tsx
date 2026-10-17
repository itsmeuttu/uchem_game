import React from 'react';
import { useGame, GameRoute } from '../context/GameContext';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const { setActiveRoute } = useGame();
  const currentYear = new Date().getFullYear();

  const handleLink = (route: GameRoute) => {
    sound.playClick();
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#080B12] border-t border-cyan-500/15 pt-12 pb-8 mt-20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-cyan-500/5 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/5">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#151C2C] border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                <svg viewBox="0 0 100 100" className="w-6 h-6">
                  <circle cx="50" cy="50" r="10" fill="#42E8F5" />
                  <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#42E8F5" strokeWidth="3" transform="rotate(30 50 50)" />
                  <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#8B5CF6" strokeWidth="3" transform="rotate(-30 50 50)" />
                </svg>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-white via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                uChem
              </span>
            </div>
            
            <p className="text-sm font-semibold text-cyan-300/90 tracking-wide">
              “Master Chemistry. Conquer JEE.”
            </p>
            
            <p className="text-xs text-[#9BA6BC] max-w-sm leading-relaxed">
              The premier gamified chemistry platform engineered for Class 11 & 12 aspirants tackling JEE Main and JEE Advanced. Combining RPG boss battles, mechanism puzzles, and numerical speedruns.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Scientifically Verified JEE Main & Advanced Curriculum</span>
            </div>
          </div>

          {/* Game Modes Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Game Modes
            </h4>
            <ul className="space-y-2 text-xs text-[#9BA6BC]">
              <li>
                <button onClick={() => handleLink('battle-arena')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Chemistry Battle Arena
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('organic-lab')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Reaction Mechanism Lab
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('physical-chemistry')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Numerical Speedrun
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('inorganic-chemistry')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Periodic Table Conquest
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('escape-room')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Chemistry Escape Room
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('molecular-builder')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Molecular Builder (VSEPR)
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-3">
              Platform & Practice
            </h4>
            <ul className="space-y-2 text-xs text-[#9BA6BC]">
              <li>
                <button onClick={() => handleLink('jee-bank')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  JEE Question Bank
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('multiplayer')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Multiplayer Quiz
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('virtual-lab')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Virtual Lab (Titration & Flame)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('find-mistake')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Find the Mistake (JEE Traps)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('leaderboard')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  All India Rank Leaderboard
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('profile')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Revision Notebook & Analytics
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Mandatory Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="text-[#9BA6BC]">
            © {currentYear} <span className="text-white font-semibold">uChem</span>. All rights reserved. Built for JEE Aspirants worldwide.
          </div>

          {/* MANDATORY DESIGNER CREDIT - PROMINENT & VISIBLE ON DESKTOP & MOBILE */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151C2C] border border-cyan-400/30 text-white font-semibold shadow-sm shadow-cyan-400/10">
            <span>Designed by</span>
            <span className="font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent uppercase">
              UTTAM
            </span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse inline" />
          </div>

          <div className="flex items-center gap-4 text-[#9BA6BC]">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">JEE Syllabus 2026</span>
          </div>

        </div>
      </div>
    </footer>
  );
};
