import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { finishPuzzle, tickTimer, useHint } from '../store/puzzleSlice';
import { RootState } from '../store';

/**
 * Math Sequence Puzzle
 * Finding the next number in a mathematical sequence.
 */

export const MathSequencePuzzle: React.FC = () => {
  const dispatch = useDispatch();
  const puzzle = useSelector((state: RootState) => state.puzzle);
  
  const [sequence, setSequence] = useState<number[]>([]);
  const [choices, setChoices] = useState<number[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  
  useEffect(() => {
    const seed = new Date(puzzle.date).getDate();
    const type = seed % 5;
    let seq: number[] = [];
    let next: number = 0;

    switch (type) {
        case 0: // Arithmetic (e.g. 2, 5, 8, 11, ?)
            const step = (seed % 10) + 1;
            const startVal = (seed % 20);
            seq = Array.from({length: 4}, (_, i) => startVal + i * step);
            next = startVal + 4 * step;
            break;
        case 1: // Geometric (e.g. 1, 2, 4, 8, ?)
            const ratio = (seed % 2) + 2;
            const startGeo = (seed % 5) + 1;
            seq = Array.from({length: 4}, (_, i) => startGeo * Math.pow(ratio, i));
            next = startGeo * Math.pow(ratio, 4);
            break;
        case 2: // Squares (1, 4, 9, 16, ?)
            const startSq = (seed % 5) + 1;
            seq = Array.from({length: 4}, (_, i) => Math.pow(startSq + i, 2));
            next = Math.pow(startSq + 4, 2);
            break;
        case 3: // Fibonacci-like (e.g., 1, 3, 4, 7, 11, ?)
            const v1 = (seed % 5) + 1;
            const v2 = (seed % 5) + 2;
            seq = [v1, v2, v1 + v2, v1 + v2 + v2];
            next = seq[2] + seq[3];
            break;
        case 4: // Prime sequence variant
            const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
            const primeStart = seed % 8;
            seq = primes.slice(primeStart, primeStart + 4);
            next = primes[primeStart + 4];
            break;
    }

    setSequence(seq);
    setCorrectAnswer(next);

    // Generate random distraction choices
    const distractions = new Set<number>();
    while (distractions.size < 3) {
        const d = next + ((Math.floor(Math.random() * 21) - 10) * (Math.random() > 0.5 ? 1 : (seed % 3 + 1)));
        if (d !== next && d > 0) distractions.add(Math.floor(d));
    }
    const finalChoices = [next, ...Array.from(distractions)].sort((a, b) => (seed + a) % 11 - (seed + b) % 11);
    setChoices(finalChoices);

  }, [puzzle.date]);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(tickTimer());
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  const handleChoice = (val: number) => {
    if (val === correctAnswer) {
        setTimeout(() => dispatch(finishPuzzle()), 500);
    } else {
        // Feedback animation for wrong answer could be added
    }
  };

  const handleHint = () => {
    if (puzzle.hintsRemaining <= 0) return;
    dispatch(useHint());
    // Filter out one wrong choice
    const wrongChoices = choices.filter(c => c !== correctAnswer);
    if (wrongChoices.length > 0) {
        const toRemove = wrongChoices[Math.floor(Math.random() * wrongChoices.length)];
        setChoices(choices.filter(c => c !== toRemove));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-16 px-6 relative overflow-hidden">
      <div className="max-w-md w-full mb-8">
        <h3 className="text-3xl font-black uppercase text-white mb-1">Sequence Engine.</h3>
        <span className="text-xs font-black text-brand-yellow uppercase tracking-[0.2em]">Neural Predictor Level 01</span>
      </div>

      <div className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl flex gap-4 md:gap-6 mb-12">
        <AnimatePresence mode="wait">
            {sequence.map((n, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="w-12 h-16 md:w-16 md:h-20 bg-black/40 border border-white/10 rounded-2xl flex items-center justify-center text-xl md:text-2xl font-black italic shadow-inner"
                    >
                        {n}
                    </motion.div>
                </div>
            ))}
            <div className="flex flex-col items-center gap-2">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-12 h-16 md:w-16 md:h-20 bg-brand-yellow/10 border-2 border-brand-yellow border-dashed rounded-2xl flex items-center justify-center text-4xl font-black text-brand-yellow"
                >
                    ?
                </motion.div>
            </div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-12">
        {choices.map((choice, i) => (
            <motion.button
                key={i}
                whileHover={{ scale: 1.05, borderColor: 'rgba(193,153,255,1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChoice(choice)}
                className="bg-neutral-900/60 p-6 rounded-2xl border border-white/10 text-2xl font-black hover:text-brand-lavender transition-all"
            >
                {choice}
            </motion.button>
        ))}
      </div>

      <button 
          onClick={handleHint}
          disabled={puzzle.hintsRemaining <= 0 || choices.length <= 1}
          className="bg-neutral-900 px-8 py-3 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-all disabled:opacity-30"
      >
          Eliminate Error ({puzzle.hintsRemaining})
      </button>
    </div>
  );
};
