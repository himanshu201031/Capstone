import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { finishPuzzle, tickTimer } from '../store/puzzleSlice';
import { RootState } from '../store';

const SYMBOLS = ['◆', '●', '▲', '■', '★', '✚', '✖', '⬢'];

export const PatternMatchingPuzzle: React.FC = () => {
  const dispatch = useDispatch();
  const puzzle = useSelector((state: RootState) => state.puzzle);
  
  const [grid, setGrid] = useState<string[]>([]);
  const [choices, setChoices] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');

  useEffect(() => {
    const seed = new Date(puzzle.date).getDate();
    const p1 = (seed % 8);
    const p2 = (seed + 2) % 8;
    
    // Pattern logic: X O X, O X O, X O X (Checkerboard)
    const pattern = Array.from({length: 9}, (_, i) => i % 2 === 0 ? SYMBOLS[p1] : SYMBOLS[p2]);
    const hiddenIdx = 4;
    const target = pattern[hiddenIdx];
    
    setCorrectAnswer(target);
    const displayGrid = [...pattern];
    displayGrid[hiddenIdx] = '?';
    setGrid(displayGrid);

    const otherSymbols = SYMBOLS.filter(s => s !== target);
    const shuffledChoices = [target, otherSymbols[0], otherSymbols[1], otherSymbols[2]]
        .sort(() => Math.random() - 0.5);
    setChoices(shuffledChoices);

  }, [puzzle.date]);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(tickTimer());
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  const handleChoice = (s: string) => {
    if (s === correctAnswer) {
        setTimeout(() => dispatch(finishPuzzle()), 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-12 px-6 no-scrollbar selection:bg-brand-orange/20 bg-neutral-50 font-sans">
      <div className="max-w-md w-full mb-12 flex flex-col items-center text-center">
        <h3 className="text-5xl font-black tracking-tighter leading-tight uppercase text-brand-text mb-4">Pattern<br/>Sync<span className="text-brand-orange">.</span></h3>
        <span className="text-[10px] font-black text-brand-text/20 uppercase tracking-[0.4em]">Visual Recognition Matrix Level 0{new Date(puzzle.date).getDate() % 9}</span>
      </div>

      <div className="bg-white border border-black/5 p-10 rounded-[4rem] shadow-2xl relative overflow-hidden mb-16 group">
        <div className="absolute top-[-20%] right-[-20%] w-48 h-48 bg-brand-orange/5 blur-3xl rounded-full" />
        <div className="grid grid-cols-3 gap-4 relative z-10">
            {grid.map((s, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-4xl font-black rounded-[2rem] transition-all ${
                        s === '?' ? 'bg-brand-orange/10 border-4 border-brand-orange border-dotted text-brand-orange animate-pulse shadow-brand-shadow-orange' : 'bg-neutral-50 text-brand-text/20 border border-black/5'
                    }`}
                >
                    {s}
                </motion.div>
            ))}
        </div>
      </div>

      <div className="flex gap-6 mb-12 flex-wrap justify-center relative z-10">
          {choices.map((s, i) => (
              <motion.button
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleChoice(s)}
                className="w-16 h-16 md:w-20 md:h-20 bg-white border border-black/10 rounded-[1.5rem] flex items-center justify-center text-3xl font-black shadow-xl hover:shadow-brand-shadow-orange hover:border-brand-orange hover:text-brand-orange transition-all"
              >
                  {s}
              </motion.button>
          ))}
      </div>
      
      <div className="text-[10px] font-black uppercase text-brand-text/20 tracking-[0.5em] animate-pulse relative z-10">
           Predicting Matrix Flow...
      </div>
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-40 overflow-hidden">
          <div className="absolute top-[30%] left-[-5%] w-64 h-64 bg-brand-blue/5 blur-[100px] rounded-full" />
          <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-brand-pink/5 blur-[100px] rounded-full" />
      </div>
    </div>
  );
};
