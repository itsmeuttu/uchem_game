import React, { useState } from 'react';
import { useGame, GameRoute } from '../context/GameContext';
import { 
  Swords, 
  FlaskConical, 
  Calculator, 
  TableProperties, 
  Trophy, 
  BarChart3, 
  User, 
  Volume2, 
  VolumeX, 
  FileText, 
  Menu, 
  X, 
  Play, 
  Sparkles 
} from 'lucide-react';
import { sound } from '../utils/audio';

export const Navbar: React.FC = () => {
  const { 
    activeRoute, 
    setActiveRoute, 
    stats, 
    soundEnabled, 
    setSoundEnabled, 
    setFormulaSheetOpen 
  } = useGame();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (route: GameRoute) => {
    sound.playClick();
    setActiveRoute(route);
    setMobileMenuOpen(false);
  };

  const navLinks: { label: string; route: GameRoute; icon: React.ReactNode }[] = [
    { label: 'Home', route: 'home', icon: <Sparkles className="w-4 h-4" /> },
    { label: 'Game Arena', route: 'battle-arena', icon: <Swords className="w-4 h-4" /> },
    { label: 'Organic Lab', route: 'organic-lab', icon: <FlaskConical className="w-4 h-4" /> },
    { label: 'Physical Chemistry', route: 'physical-chemistry', icon: <Calculator className="w-4 h-4" /> },
    { label: 'Inorganic Chemistry', route: 'inorganic-chemistry', icon: <TableProperties className="w-4 h-4" /> },
    { label: 'Leaderboard', route: 'leaderboard', icon: <Trophy className="w-4 h-4" /> },
    { label: 'Progress', route: 'profile', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#080B12]/85 border-b border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer transition-transform duration-200 active:scale-95"
          aria-label="uChem Home"
        >
          <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#151C2C] to-[#101522] border border-cyan-400/30 group-hover:border-cyan-400/70 shadow-lg shadow-cyan-500/10 transition-all duration-300">
            {/* Custom SVG Atom */}
            <svg viewBox="0 0 100 100" className="w-7 h-7 animate-spin-slow">
              <circle cx="50" cy="50" r="10" fill="#42E8F5" className="filter drop-shadow-[0_0_6px_#42E8F5]" />
              <ellipse cx="50" cy="50" rx="40" ry="14" fill="none" stroke="#42E8F5" strokeWidth="3" transform="rotate(30 50 50)" />
              <ellipse cx="50" cy="50" rx="40" ry="14" fill="none" stroke="#8B5CF6" strokeWidth="3" transform="rotate(-30 50 50)" />
              <ellipse cx="50" cy="50" rx="40" ry="14" fill="none" stroke="#35D07F" strokeWidth="3" transform="rotate(90 50 50)" />
            </svg>
            <div className="absolute inset-0 rounded-xl bg-cyan-400/5 group-hover:bg-cyan-400/15 transition-colors" />
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-[#42E8F5] to-[#8B5CF6] bg-clip-text text-transparent">
              uChem
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-cyan-400/80 -mt-1 hidden sm:block">
              Master Chemistry • Conquer JEE
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map(link => {
            const isActive = activeRoute === link.route;
            return (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 shadow-sm shadow-cyan-500/10'
                    : 'text-[#9BA6BC] hover:text-[#F5F7FF] hover:bg-white/5'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Formula Sheet Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              setFormulaSheetOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#151C2C] text-[#9BA6BC] hover:text-cyan-400 border border-white/10 hover:border-cyan-400/40 transition-colors cursor-pointer"
            title="Open JEE Formula Reference & Glossary"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Formula Sheet</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg bg-[#151C2C] text-[#9BA6BC] hover:text-white border border-white/10 hover:border-cyan-400/30 transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {/* User Rank Pill */}
          <button
            onClick={() => handleNavClick('profile')}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#151C2C] border border-cyan-500/20 hover:border-cyan-400/50 cursor-pointer transition-all"
            title="View Player Profile & Stats"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center text-black font-bold text-xs">
              <User className="w-3.5 h-3.5 text-black" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white leading-none">
                Lvl {stats.level}
              </span>
              <span className="text-[10px] text-cyan-400 leading-none">
                {stats.rankTitle}
              </span>
            </div>
          </button>

          {/* Start Playing CTA */}
          <button
            onClick={() => handleNavClick('battle-arena')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-black font-bold text-sm tracking-wide shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/35 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>Start Playing</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#151C2C] text-[#9BA6BC] hover:text-white border border-white/10 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080B12]/98 border-b border-cyan-500/20 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
          {/* Quick Player Bar */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#151C2C] border border-cyan-500/20 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center font-bold text-black text-sm">
                Lvl {stats.level}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{stats.username}</p>
                <p className="text-xs text-cyan-400">{stats.rankTitle} • {stats.xp} XP</p>
              </div>
            </div>
            <button
              onClick={() => handleNavClick('profile')}
              className="px-3 py-1 text-xs font-semibold rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 cursor-pointer"
            >
              Profile
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map(link => {
              const isActive = activeRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-500/15 border border-cyan-500/30'
                      : 'text-[#9BA6BC] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${isActive ? 'bg-cyan-400/20 text-cyan-400' : 'bg-white/5 text-gray-400'}`}>
                    {link.icon}
                  </div>
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setFormulaSheetOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#151C2C] text-sm text-cyan-400 font-semibold border border-cyan-500/20 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              Formula Sheet
            </button>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#151C2C] text-sm text-[#9BA6BC] border border-white/10 cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundEnabled ? 'Sound On' : 'Muted'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
