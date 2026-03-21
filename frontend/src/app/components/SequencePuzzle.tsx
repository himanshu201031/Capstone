import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { finishPuzzle, tickTimer } from '../store/puzzleSlice';
import { RootState } from '../store';

const COLORS = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500'];
const ICONS = ['◢', '◣', '◤', '◥'];

export const SequencePuzzle: React.FC = () => {
  const dispatch = useDispatch();
  const puzzle = useSelector((state: RootState) => state.puzzle);
  
  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [isPlayingSeq, setIsPlayingSeq] = useState(true);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [round, setRound] = useState(1);
  const targetRounds = 5;

  // Generate sequence based on date seed (Mock)
  useEffect(() => {
    const seed = new Date(puzzle.date).getDate();
    const newSeq = Array.from({length: targetRounds}, (_, i) => (seed + i * 7) % 4);
    setSequence(newSeq);
  }, [puzzle.date]);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(tickTimer());
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  // Playback effect
  useEffect(() => {
    if (isPlayingSeq && sequence.length > 0) {
      let i = 0;
      const interval = setInterval(() => {
        setActiveButton(sequence[i]);
        setTimeout(() => setActiveButton(null), 600);
        i++;
        if (i >= round) {
          clearInterval(interval);
          setTimeout(() => setIsPlayingSeq(false), 800);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlayingSeq, sequence, round]);

  const handleInput = (index: number) => {
    if (isPlayingSeq) return;

    setActiveButton(index);
    setTimeout(() => setActiveButton(null), 200);

    const newInput = [...userInput, index];
    setUserInput(newInput);

    // Validate
    if (newInput[newInput.length - 1] !== sequence[newInput.length - 1]) {
      // Failed round - reset input
      setUserInput([]);
      setIsPlayingSeq(true);
      return;
    }

    if (newInput.length === round) {
      if (round === targetRounds) {
        setTimeout(() => dispatch(finishPuzzle()), 500);
      } else {
        setRound(r => r + 1);
        setUserInput([]);
        setTimeout(() => setIsPlayingSeq(true), 1000);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-screen pt-16 px-4 select-none relative overflow-hidden"
    >
      <div className="w-full max-w-sm bg-neutral-900/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-6 md:p-8 shadow-3xl text-center relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-yellow to-transparent opacity-30" />
        
        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-1.5">Logic<br/>Sequence.</h3>
        <p className="text-xs font-black uppercase text-brand-yellow tracking-widest mb-8">Cycle {round} / {targetRounds}</p>

        <div className="grid grid-cols-2 gap-3 p-2 relative z-10">
          {COLORS.map((color, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleInput(idx)}
              className={`aspect-square rounded-2xl border border-white/5 flex items-center justify-center text-3xl font-black shadow-2xl transition-all duration-300 relative overflow-hidden group/btn ${
                activeButton === idx ? `${color} text-black scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]` : 'bg-neutral-800 text-neutral-600 hover:bg-neutral-700'
              }`}
            >
               <span className="relative z-10">{ICONS[idx]}</span>
               {activeButton === idx && (
                 <motion.div 
                    layoutId="glow_seq"
                    className="absolute inset-0 bg-white/20 blur-xl rounded-full"
                 />
               )}
            </motion.button>
          ))}
        </div>
        
        <div className="mt-8 flex flex-col items-center gap-3">
            <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${isPlayingSeq ? 'bg-brand-ruby' : 'bg-brand-cyan shadow-[0_0_10px_rgba(0,255,255,0.5)]'}`} />
                {isPlayingSeq ? "Processing..." : "Sync Identity"}
            </div>
            <div className="flex gap-1">
                {Array.from({length: targetRounds}).map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i < round ? 'w-3 bg-brand-yellow' : 'w-1.5 bg-neutral-800'}`} />
                ))}
            </div>
        </div>
      </div>
    </motion.div>
  );
};
