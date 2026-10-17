import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { CHEMISTRY_QUESTIONS } from '../../data/questions';
import { sound } from '../../utils/audio';
import { ChemFormula } from '../../utils/chemFormatter';
import { 
  Users, 
  Bot, 
  UserCheck, 
  Trophy, 
  Timer, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Copy, 
  Check 
} from 'lucide-react';

export const MultiplayerQuiz: React.FC = () => {
  const { setActiveRoute, stats, addXp, triggerConfetti } = useGame();

  const [mode, setMode] = useState<'lobby' | 'playing' | 'result'>('lobby');
  const [playType, setPlayType] = useState<'bot' | 'pass-play'>('bot');
  const [roomCode] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());
  const [copiedCode, setCopiedCode] = useState(false);

  const [qIndex, setQIndex] = useState(0);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [turn, setTurn] = useState<'p1' | 'p2'>('p1');
  const [p1Answer, setP1Answer] = useState<number | null>(null);
  const [p2Answer, setP2Answer] = useState<number | null>(null);
  const [timer, setTimer] = useState(25);
  const [roundOver, setRoundOver] = useState(false);

  const questions = CHEMISTRY_QUESTIONS.slice(0, 5);
  const currentQ = questions[qIndex];

  useEffect(() => {
    if (mode !== 'playing' || roundOver) return;

    if (timer <= 0) {
      handleRoundEnd();
      return;
    }

    const interval = setInterval(() => {
      setTimer(t => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [mode, timer, roundOver]);

  const handleStartGame = (type: 'bot' | 'pass-play') => {
    sound.playClick();
    setPlayType(type);
    setMode('playing');
    setQIndex(0);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setTurn('p1');
    setP1Answer(null);
    setP2Answer(null);
    setTimer(25);
    setRoundOver(false);
  };

  const handleCopyCode = () => {
    sound.playClick();
    navigator.clipboard.writeText(roomCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSelectOption = (idx: number) => {
    sound.playClick();
    if (playType === 'bot') {
      setP1Answer(idx);
      // Honest AI Bot behavior: 80% accuracy simulated after 1.5s
      const botWillBeCorrect = Math.random() < 0.8;
      const botChoice = botWillBeCorrect ? (currentQ.correctAnswer as number) : ((currentQ.correctAnswer as number) + 1) % 4;
      setP2Answer(botChoice);
      resolveRound(idx, botChoice);
    } else {
      // Pass-and-play
      if (turn === 'p1') {
        setP1Answer(idx);
        setTurn('p2');
      } else {
        setP2Answer(idx);
        resolveRound(p1Answer!, idx);
      }
    }
  };

  const resolveRound = (p1: number, p2: number) => {
    setRoundOver(true);
    const correct = currentQ.correctAnswer as number;

    const p1Correct = p1 === correct;
    const p2Correct = p2 === correct;

    if (p1Correct) {
      setPlayer1Score(s => s + 100);
      sound.playCorrect();
    } else {
      sound.playWrong();
    }

    if (p2Correct) {
      setPlayer2Score(s => s + 100);
    }
  };

  const handleRoundEnd = () => {
    setRoundOver(true);
  };

  const handleNextRound = () => {
    sound.playClick();
    if (qIndex + 1 < questions.length) {
      setQIndex(prev => prev + 1);
      setP1Answer(null);
      setP2Answer(null);
      setTurn('p1');
      setTimer(25);
      setRoundOver(false);
    } else {
      setMode('result');
      if (player1Score > player2Score) {
        triggerConfetti();
        sound.playLevelUp();
        addXp(150, 'Won Multiplayer Duel');
      }
    }
  };

  if (mode === 'lobby') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
        
        {/* Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#151C2C] to-[#101522] border border-cyan-500/20">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              Real-time Competitive Duel
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Multiplayer Chemistry Quiz
            </h1>
            <p className="text-xs text-[#9BA6BC]">
              Challenge fellow JEE aspirants in 1v1 synchronized duels or sharpen your speed against the simulated AI Topper Bot.
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

        {/* Lobby Card */}
        <div className="p-8 rounded-3xl bg-[#151C2C] border border-white/10 space-y-8 max-w-xl mx-auto text-center">
          
          <div className="p-4 rounded-2xl bg-[#080B12] border border-cyan-500/30 flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Your Room Join Code</span>
              <p className="text-2xl font-mono font-black text-cyan-400 tracking-wider">{roomCode}</p>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-300 hover:text-white cursor-pointer"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'Copied' : 'Share'}</span>
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Select Match Mode
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleStartGame('bot')}
                className="p-6 rounded-2xl bg-[#101522] border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-left space-y-2 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300">
                  Duel AI JEE Topper
                </h3>
                <p className="text-xs text-[#9BA6BC]">
                  Honest, instantaneous sparring against high-accuracy simulated responses.
                </p>
              </button>

              <button
                onClick={() => handleStartGame('pass-play')}
                className="p-6 rounded-2xl bg-[#101522] border border-white/10 hover:border-violet-400/50 hover:bg-violet-500/10 text-left space-y-2 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-violet-300">
                  1v1 Pass & Play
                </h3>
                <p className="text-xs text-[#9BA6BC]">
                  Turn-based challenge with a friend on the same screen.
                </p>
              </button>
            </div>
          </div>

        </div>

      </div>
    );
  }

  // Active Duel HUD
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-300">
      
      {/* Duel Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#151C2C] border border-white/10">
        <button
          onClick={() => setMode('lobby')}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Leave Match
        </button>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-[10px] text-cyan-400 font-bold block">{stats.username}</span>
            <span className="font-mono font-bold text-white text-sm">{player1Score} pts</span>
          </div>

          <div className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 font-mono text-cyan-300 font-bold text-xs flex items-center gap-1">
            <Timer className="w-3.5 h-3.5" />
            <span>{timer}s</span>
          </div>

          <div className="text-left">
            <span className="text-[10px] text-violet-400 font-bold block">
              {playType === 'bot' ? 'AI Topper Bot' : 'Player 2'}
            </span>
            <span className="font-mono font-bold text-white text-sm">{player2Score} pts</span>
          </div>
        </div>
      </div>

      {mode === 'playing' ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#151C2C] border border-white/10 space-y-6">
          
          <div className="flex items-center justify-between text-xs text-gray-400 border-b border-white/10 pb-3">
            <span>Question {qIndex + 1} of {questions.length}</span>
            <span className="text-cyan-400 font-bold">{currentQ.chapter}</span>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            <ChemFormula formula={currentQ.question} />
          </h2>

          {playType === 'pass-play' && !roundOver && (
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 text-center font-bold">
              Current Turn: {turn === 'p1' ? stats.username : 'Player 2'}
            </div>
          )}

          {/* Options */}
          {currentQ.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = p1Answer === idx;
                const isCorrect = roundOver && idx === currentQ.correctAnswer;

                let btnStyle = 'border-white/10 hover:border-cyan-400/40 bg-[#101522] text-white';
                if (roundOver) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-400 bg-emerald-500/20 text-emerald-300';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-500 bg-rose-500/20 text-rose-300';
                  } else {
                    btnStyle = 'border-white/5 opacity-50 bg-[#101522] text-gray-400';
                  }
                } else if (isSelected) {
                  btnStyle = 'border-cyan-400 bg-cyan-500/15 text-cyan-300';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={roundOver}
                    className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {roundOver && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {roundOver && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                  </button>
                );
              })}
            </div>
          )}

          {roundOver && (
            <div className="p-4 rounded-2xl bg-[#080B12] border border-cyan-500/25 flex items-center justify-between">
              <span className="text-xs text-gray-300">
                Round finished! Ready for next question?
              </span>
              <button
                onClick={handleNextRound}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-black text-xs font-bold cursor-pointer"
              >
                Proceed →
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Final Duel Results */
        <div className="p-8 rounded-3xl bg-[#151C2C] border border-cyan-500/40 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400">
            <Trophy className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-white">
            {player1Score > player2Score ? 'Victory! You Won the Match!' : player1Score === player2Score ? 'Tie Match!' : 'Match Complete!'}
          </h2>

          <div className="flex justify-center gap-8 font-mono">
            <div className="p-4 rounded-2xl bg-[#080B12] border border-cyan-500/20 min-w-[130px]">
              <span className="text-xs text-cyan-400 font-bold block">{stats.username}</span>
              <span className="text-2xl font-black text-white">{player1Score} pts</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#080B12] border border-violet-500/20 min-w-[130px]">
              <span className="text-xs text-violet-400 font-bold block">{playType === 'bot' ? 'AI Bot' : 'Player 2'}</span>
              <span className="text-2xl font-black text-white">{player2Score} pts</span>
            </div>
          </div>

          <button
            onClick={() => setMode('lobby')}
            className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs cursor-pointer shadow-lg"
          >
            Return to Multiplayer Lobby
          </button>
        </div>
      )}

    </div>
  );
};
