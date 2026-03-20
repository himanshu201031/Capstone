import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { resetPuzzle } from '../store/puzzleSlice';
import { RootState } from '../store';

export const Result: React.FC = () => {
  const dispatch = useDispatch();
  const puzzle = useSelector((state: RootState) => state.puzzle);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 max-w-sm mx-auto">
      {/* Visual Reference Matching Victory Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-brand-yellow rounded-5xl p-10 w-full text-black shadow-2xl relative overflow-hidden"
      >
        <div className="relative z-10">
            <span className="text-6xl mb-6 block">🔥</span>
            <h2 className="text-4xl font-black leading-[1.1] mb-2 tracking-tighter">Puzzle Solved!</h2>
            <p className="font-bold opacity-60 text-lg">Amazing memory speed.</p>
        </div>

        <div className="mt-12 space-y-4 relative z-10 w-full">
            <div className="flex justify-between items-center bg-black/5 p-4 rounded-2xl border border-black/5">
                <span className="font-black text-xs uppercase tracking-widest text-black/50">Score</span>
                <span className="text-2xl font-black tracking-tighter">{puzzle.score}</span>
            </div>
            <div className="flex justify-between items-center bg-black/5 p-4 rounded-2xl border border-black/5">
                <span className="font-black text-xs uppercase tracking-widest text-black/50">Time</span>
                <span className="text-2xl font-black tracking-tighter">
                    {Math.floor(puzzle.timeElapsed / 60)}:{(puzzle.timeElapsed % 60).toString().padStart(2, '0')}
                </span>
            </div>
        </div>

        <button 
           onClick={() => dispatch(resetPuzzle())}
           className="w-full bg-black text-brand-yellow font-black py-4 rounded-3xl mt-12 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-black/10 relative z-10"
        >
           Return Home
        </button>
      </motion.div>

      <div className="w-full bg-brand-lavender rounded-3xl p-6 mt-6 flex items-center justify-between text-black shadow-xl">
          <div className="font-bold leading-tight max-w-[140px]">Share your results with friends.</div>
          <button className="bg-black/10 p-3 rounded-2xl border border-black/5 hover:bg-black/20 transition-colors">
              <svg className="w-6 h-6 text-black/70" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
          </button>
      </div>
    </div>
  );
};
