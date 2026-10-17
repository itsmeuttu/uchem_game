import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeDashboard } from './components/HomeDashboard';
import { FormulaSheetModal } from './components/FormulaSheetModal';
import { BattleArena } from './components/games/BattleArena';
import { ReactionMechanismLab } from './components/games/ReactionMechanismLab';
import { NumericalSpeedrun } from './components/games/NumericalSpeedrun';
import { MolecularBuilder } from './components/games/MolecularBuilder';
import { PeriodicTableConquest } from './components/games/PeriodicTableConquest';
import { EscapeRoom } from './components/games/EscapeRoom';
import { JeePracticeBank } from './components/games/JeePracticeBank';
import { MultiplayerQuiz } from './components/games/MultiplayerQuiz';
import { VirtualLab } from './components/games/VirtualLab';
import { FindTheMistake } from './components/games/FindTheMistake';
import { Leaderboard } from './components/Leaderboard';
import { Profile } from './components/Profile';
import { Sparkles, Trophy, Zap, Info } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeRoute, notification } = useGame();

  const renderActiveRoute = () => {
    switch (activeRoute) {
      case 'home':
        return <HomeDashboard />;
      case 'battle-arena':
        return <BattleArena />;
      case 'organic-lab':
        return <ReactionMechanismLab />;
      case 'physical-chemistry':
        return <NumericalSpeedrun />;
      case 'inorganic-chemistry':
        return <PeriodicTableConquest />;
      case 'escape-room':
        return <EscapeRoom />;
      case 'molecular-builder':
        return <MolecularBuilder />;
      case 'jee-bank':
        return <JeePracticeBank />;
      case 'multiplayer':
        return <MultiplayerQuiz />;
      case 'virtual-lab':
        return <VirtualLab />;
      case 'find-mistake':
        return <FindTheMistake />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080B12] text-[#F5F7FF] relative overflow-x-hidden">
      
      {/* Toast Notification HUD */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#151C2C]/95 border border-cyan-400/50 shadow-2xl shadow-cyan-400/20 backdrop-blur-md flex items-center gap-3.5 max-w-sm animate-in slide-in-from-bottom-5 duration-300">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-400/30">
            {notification.type === 'achievement' && <Trophy className="w-5 h-5 text-amber-400" />}
            {notification.type === 'level-up' && <Zap className="w-5 h-5 text-cyan-400" />}
            {notification.type === 'quest' && <Sparkles className="w-5 h-5 text-emerald-400" />}
            {notification.type === 'info' && <Info className="w-5 h-5 text-violet-400" />}
          </div>
          <div>
            <h4 className="text-xs font-bold text-white leading-tight">{notification.title}</h4>
            <p className="text-[11px] text-[#9BA6BC] mt-0.5 leading-snug">{notification.message}</p>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderActiveRoute()}
      </main>

      {/* Persistent Formula Sheet Drawer / Modal */}
      <FormulaSheetModal />

      {/* Footer with Mandatory "Designed by UTTAM" Credit */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
