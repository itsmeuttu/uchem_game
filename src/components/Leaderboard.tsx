import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/audio';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Flame, 
  ArrowLeft, 
  Search, 
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  rankTitle: string;
  level: number;
  xp: number;
  accuracy: number;
  streak: number;
  state: string;
}

const SAMPLE_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Aarav Sharma', rankTitle: 'Quantum JEE Titan', level: 12, xp: 9850, accuracy: 96, streak: 28, state: 'Kota, RJ' },
  { rank: 2, name: 'Ananya Iyer', rankTitle: 'Master Chemist', level: 11, xp: 9240, accuracy: 94, streak: 22, state: 'Chennai, TN' },
  { rank: 3, name: 'Rohan Verma', rankTitle: 'Master Chemist', level: 10, xp: 8790, accuracy: 93, streak: 19, state: 'Delhi, DL' },
  { rank: 4, name: 'Priya Patel', rankTitle: 'Alchemist', level: 9, xp: 7650, accuracy: 91, streak: 15, state: 'Ahmedabad, GJ' },
  { rank: 5, name: 'Siddharth Rao', rankTitle: 'Alchemist', level: 8, xp: 6920, accuracy: 89, streak: 14, state: 'Hyderabad, TS' },
  { rank: 6, name: 'Diya Mukherjee', rankTitle: 'Alchemist', level: 8, xp: 6410, accuracy: 90, streak: 12, state: 'Kolkata, WB' },
  { rank: 7, name: 'Aditya Nair', rankTitle: 'Catalyst', level: 7, xp: 5890, accuracy: 88, streak: 10, state: 'Bengaluru, KA' },
  { rank: 8, name: 'Neha Chawla', rankTitle: 'Catalyst', level: 7, xp: 5320, accuracy: 87, streak: 9, state: 'Chandigarh, PB' },
  { rank: 9, name: 'Ishaan Kulkarni', rankTitle: 'Catalyst', level: 6, xp: 4780, accuracy: 86, streak: 8, state: 'Pune, MH' },
  { rank: 10, name: 'Tanvi Mehra', rankTitle: 'Molecule', level: 5, xp: 4120, accuracy: 85, streak: 7, state: 'Lucknow, UP' }
];

export const Leaderboard: React.FC = () => {
  const { setActiveRoute, stats } = useGame();
  const [tab, setTab] = useState<'global' | 'weekly' | 'chapter'>('global');
  const [search, setSearch] = useState('');

  // Insert user into ranking context
  const userRankEntry: LeaderboardEntry = {
    rank: 14,
    name: stats.username + ' (You)',
    rankTitle: stats.rankTitle,
    level: stats.level,
    xp: stats.xp,
    accuracy: stats.accuracy,
    streak: stats.currentStreak,
    state: 'India'
  };

  const filteredList = SAMPLE_LEADERBOARD.filter(e => 
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.state.toLowerCase().includes(search.toLowerCase()) ||
    e.rankTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#151C2C] to-[#101522] border border-cyan-500/20">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            All India Rank (AIR) Standings
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            uChem Leaderboard
          </h1>
          <p className="text-xs text-[#9BA6BC]">
            Track the highest XP achievers, accuracy masters, and win-streak champions across India.
          </p>
        </div>

        <button
          onClick={() => setActiveRoute('home')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </button>
      </div>

      {/* Podium Showcase for Top 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        
        {/* Rank 2 */}
        <div className="order-2 md:order-1 p-6 rounded-3xl bg-[#151C2C] border border-white/10 flex flex-col items-center text-center space-y-3 relative">
          <div className="w-12 h-12 rounded-2xl bg-gray-400/15 border border-gray-400/40 text-gray-300 flex items-center justify-center font-black text-lg">
            2
          </div>
          <div>
            <h3 className="font-bold text-white text-base">{SAMPLE_LEADERBOARD[1].name}</h3>
            <p className="text-xs text-gray-400">{SAMPLE_LEADERBOARD[1].state}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/30 text-[11px] font-bold">
            {SAMPLE_LEADERBOARD[1].rankTitle}
          </span>
          <p className="font-mono text-cyan-400 font-bold text-sm">{SAMPLE_LEADERBOARD[1].xp} XP</p>
        </div>

        {/* Rank 1 (Crown) */}
        <div className="order-1 md:order-2 p-6 rounded-3xl bg-gradient-to-b from-amber-500/15 to-[#151C2C] border-2 border-amber-400/60 flex flex-col items-center text-center space-y-3 relative shadow-2xl shadow-amber-500/10 -translate-y-2">
          <div className="absolute -top-3 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
            <Crown className="w-3.5 h-3.5" />
            AIR 1 Current Leader
          </div>

          <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border-2 border-amber-400 text-amber-300 flex items-center justify-center font-black text-xl shadow-lg shadow-amber-400/20">
            1
          </div>

          <div>
            <h3 className="font-black text-white text-lg">{SAMPLE_LEADERBOARD[0].name}</h3>
            <p className="text-xs text-amber-200/80">{SAMPLE_LEADERBOARD[0].state}</p>
          </div>

          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold">
            {SAMPLE_LEADERBOARD[0].rankTitle}
          </span>

          <p className="font-mono text-amber-400 font-black text-base">{SAMPLE_LEADERBOARD[0].xp} XP</p>
        </div>

        {/* Rank 3 */}
        <div className="order-3 p-6 rounded-3xl bg-[#151C2C] border border-white/10 flex flex-col items-center text-center space-y-3 relative">
          <div className="w-12 h-12 rounded-2xl bg-amber-700/20 border border-amber-600/40 text-amber-600 flex items-center justify-center font-black text-lg">
            3
          </div>
          <div>
            <h3 className="font-bold text-white text-base">{SAMPLE_LEADERBOARD[2].name}</h3>
            <p className="text-xs text-gray-400">{SAMPLE_LEADERBOARD[2].state}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/30 text-[11px] font-bold">
            {SAMPLE_LEADERBOARD[2].rankTitle}
          </span>
          <p className="font-mono text-cyan-400 font-bold text-sm">{SAMPLE_LEADERBOARD[2].xp} XP</p>
        </div>

      </div>

      {/* Tabs & Search */}
      <div className="p-4 rounded-2xl bg-[#151C2C] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {(['global', 'weekly', 'chapter'] as const).map(t => (
            <button
              key={t}
              onClick={() => {
                sound.playClick();
                setTab(t);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer capitalize ${
                tab === t
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-[#101522] text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {t === 'global' ? 'All India (Global)' : t === 'weekly' ? 'This Week' : 'Physical & Organic'}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search aspirant or city..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#080B12] border border-white/10 focus:border-cyan-400 rounded-xl text-xs text-white outline-none"
          />
        </div>

      </div>

      {/* Leaderboard Table */}
      <div className="p-6 rounded-3xl bg-[#151C2C] border border-white/10 overflow-x-auto space-y-3">
        
        {/* Current User Fixed Row */}
        <div className="p-4 rounded-2xl bg-cyan-500/15 border-2 border-cyan-400 flex items-center justify-between text-xs font-semibold shadow-lg shadow-cyan-500/10">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-cyan-400 text-black font-black flex items-center justify-center font-mono">
              #{userRankEntry.rank}
            </span>
            <div>
              <p className="font-bold text-white text-sm">{userRankEntry.name}</p>
              <p className="text-cyan-300 text-[11px]">{userRankEntry.rankTitle} • Level {userRankEntry.level}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right">
              <span className="text-gray-400 block text-[10px]">Accuracy</span>
              <span className="text-emerald-400 font-bold">{userRankEntry.accuracy}%</span>
            </div>
            <div className="hidden sm:block text-right">
              <span className="text-gray-400 block text-[10px]">Streak</span>
              <span className="text-amber-400 font-bold">{userRankEntry.streak}🔥</span>
            </div>
            <div className="text-right">
              <span className="text-gray-400 block text-[10px]">Total XP</span>
              <span className="text-white font-mono font-bold text-sm">{userRankEntry.xp} XP</span>
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-2 pt-2">
          {filteredList.map(entry => (
            <div
              key={entry.rank}
              className="p-3.5 rounded-xl bg-[#101522] border border-white/5 hover:border-white/15 flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-white/5 text-gray-300 font-mono font-bold flex items-center justify-center text-xs">
                  {entry.rank}
                </span>
                <div>
                  <p className="font-bold text-white">{entry.name}</p>
                  <p className="text-gray-400 text-[10px]">{entry.state} • {entry.rankTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden sm:block text-right">
                  <span className="text-gray-500 block text-[9px]">Accuracy</span>
                  <span className="text-emerald-400 font-bold">{entry.accuracy}%</span>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="text-gray-500 block text-[9px]">Streak</span>
                  <span className="text-amber-400 font-bold">{entry.streak}🔥</span>
                </div>
                <div className="text-right min-w-[70px]">
                  <span className="text-gray-500 block text-[9px]">XP</span>
                  <span className="text-cyan-400 font-mono font-bold">{entry.xp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
