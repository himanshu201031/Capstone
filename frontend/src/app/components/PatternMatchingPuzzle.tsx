import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { finishPuzzle, tickTimer, useHint } from '../store/puzzleSlice';
import { RootState } from '../store';

/**
 * Pattern Matching Puzzle
 * Visual pattern discovery and matching. 
 */

const SYMBOLS = ['◆', '●', '▲', '■', '★', '✚'];

export const PatternMatchingPuzzle: React.FC = () => {
  const dispatch = useDispatch();
  const puzzle = useSelector((state: RootState) => state.puzzle);
  
  const [grid, setGrid] = useState<string[]>([]);
  const [choices, setChoices] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [difficulty, setDifficulty] = useState(0);

  useEffect(() => {
    const seed = new Date(puzzle.date).getDate();
    // 3x3 Grid (9 cells), middle cell is hidden
    const p1 = (seed % 6);
    const p2 = (seed + 2) % 6;
    
    // Simple logic: Row 1 = p1, p1, p2. Row 2 = p1, p2, p2. Row 3 = p2, p2, p1?
    // Let's do a sequence logic (p1, p2, p1, p2, ?, p2, p1, p2, p1)
    const pattern = Array.from({length: 9}, (_, i) => i % 2 === 0 ? SYMBOLS[p1] : SYMBOLS[p2]);
    const hiddenIdx = 4;
    const target = pattern[hiddenIdx];
    
    setCorrectAnswer(target);
    const displayGrid = [...pattern];
    displayGrid[hiddenIdx] = '?';
    setGrid(displayGrid);

    // Dynamic choices
    const otherSymbols = SYMBOLS.filter(s => s !== target);
    const shuffledChoices = [target, otherSymbols[0], otherSymbols[1], otherSymbols[2]]
        .sort((a, b) => (seed + a.charCodeAt(0)) % 11 - (seed + b.charCodeAt(0)) % 11);
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
    <div className="flex flex-col items-center justify-center min-h-screen pt-16 px-6 relative overflow-hidden">
      <div className="max-w-md w-full mb-8">
        <h3 className="text-3xl font-black uppercase text-white mb-1">Visual Pattern.</h3>
        <span className="text-xs font-black text-brand-lavender uppercase tracking-[0.2em]">Pattern Matcher Level 0{new Date(puzzle.date).getDate() % 9}</span>
      </div>

      <div className="grid grid-cols-3 gap-3 bg-neutral-900 border border-white/5 p-6 rounded-[3rem] shadow-2xl backdrop-blur-3xl mb-12">
        {grid.map((s, i) => (
            <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl font-black rounded-2xl ${
                    s === '?' ? 'bg-brand-lavender/10 border-2 border-brand-lavender border-dashed text-brand-lavender' : 'bg-neutral-800 text-neutral-400 border border-white/5'
                }`}
            >
                {s}
            </motion.div>
        ))}
      </div>

      <div className="flex gap-4 mb-8">
          {choices.map((s, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(193,153,255,1)', color: 'black' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleChoice(s)}
                className="w-14 h-14 md:w-16 md:h-16 bg-neutral-900 border border-white/10 rounded-2xl flex items-center justify-center text-2xl font-black transition-all"
              >
                  {s}
              </motion.button>
          ))}
      </div>
      
      <div className="text-[9px] font-black uppercase text-neutral-600 tracking-[0.4em] animate-pulse">
           Predicting Matrix Flow...
      </div>
    </div>
  );
};
