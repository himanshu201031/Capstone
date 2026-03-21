import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { finishPuzzle, tickTimer, useHint } from '../store/puzzleSlice';
import { RootState } from '../store';

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
        case 0:
            const step = (seed % 10) + 1;
            const startVal = (seed % 20);
            seq = Array.from({length: 4}, (_, i) => startVal + i * step);
            next = startVal + 4 * step;
            break;
        case 1:
            const ratio = (seed % 2) + 2;
            const startGeo = (seed % 5) + 1;
            seq = Array.from({length: 4}, (_, i) => startGeo * Math.pow(ratio, i));
            next = startGeo * Math.pow(ratio, 4);
            break;
        case 2:
            const startSq = (seed % 5) + 1;
            seq = Array.from({length: 4}, (_, i) => Math.pow(startSq + i, 2));
            next = Math.pow(startSq + 4, 2);
            break;
        case 3:
            const v1 = (seed % 5) + 1;
            const v2 = (seed % 5) + 2;
            seq = [v1, v2, v1 + v2, v1 + v2 + v2];
            next = seq[2] + seq[3];
            break;
        case 4:
            const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
            const primeStart = seed % 8;
            seq = primes.slice(primeStart, primeStart + 4);
            next = primes[primeStart + 4];
            break;
    }

    setSequence(seq);
    setCorrectAnswer(next);

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
    }
  };

  const handleHint = () => {
    if (puzzle.hintsRemaining <= 0) return;
    dispatch(useHint());
    const wrongChoices = choices.filter(c => c !== correctAnswer);
    if (wrongChoices.length > 0) {
        const toRemove = wrongChoices[Math.floor(Math.random() * wrongChoices.length)];
        setChoices(choices.filter(c => c !== toRemove));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-16 px-6 relative overflow-hidden bg-neutral-50">
      <div className="max-w-md w-full mb-8 relative z-10 text-center md:text-left">
        <h3 className="text-3xl font-black uppercase text-brand-text mb-1 tracking-tighter">Sequence.</h3>
        <span className="text-xs font-black text-brand-orange uppercase tracking-[0.2em]">Neural Predictor Level 01</span>
      </div>

      <div className="bg-white border border-black/5 p-10 rounded-[2.5rem] shadow-2xl flex gap-4 md:gap-6 mb-12 relative z-10">
        <AnimatePresence mode="wait">
            {sequence.map((n, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="w-14 h-20 md:w-20 md:h-24 bg-neutral-50 border border-black/5 rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-black text-brand-text shadow-inner italic"
                    >
                        {n}
                    </motion.div>
                </div>
            ))}
            <div className="flex flex-col items-center gap-2">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-14 h-20 md:w-20 md:h-24 bg-brand-orange/5 border-2 border-brand-orange border-dashed rounded-2xl flex items-center justify-center text-4xl font-black text-brand-orange shadow-lg"
                >
                    ?
                </motion.div>
            </div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-12 relative z-10">
        {choices.map((choice, i) => (
            <motion.button
                key={i}
                whileHover={{ scale: 1.05, borderColor: '#FF5C00' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChoice(choice)}
                className="bg-white p-6 rounded-2xl border border-black/5 text-3xl font-black text-brand-text hover:text-brand-orange hover:shadow-xl transition-all shadow-lg"
            >
                {choice}
            </motion.button>
        ))}
      </div>

      <button 
          onClick={handleHint}
          disabled={puzzle.hintsRemaining <= 0 || choices.length <= 1}
          className="bg-brand-orange text-white px-10 py-4 rounded-xl shadow-brand-shadow-orange font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 disabled:opacity-30 disabled:grayscale transition-all relative z-10"
      >
          Eliminate Error ({puzzle.hintsRemaining})
      </button>
    </div>
  );
};
