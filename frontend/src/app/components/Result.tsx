import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { resetPuzzle } from '../store/puzzleSlice';
import { RootState } from '../store';

export const Result: React.FC = () => {
  const dispatch = useDispatch();
  const puzzle = useSelector((state: RootState) => state.puzzle);
  const userBadges = useSelector((state: RootState) => state.user.badges);

  const badgesMap: Record<string, { icon: string; name: string }> = {
    pulse_nova: { icon: '⚡', name: 'Pulse Nova' },
    iron_nexus: { icon: '🛡️', name: 'Iron Nexus' },
    infinite_core: { icon: '💎', name: 'Infinite Core' },
    matrix_veteran: { icon: '🕰️', name: 'Matrix Veteran' },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 max-w-sm mx-auto selection:bg-brand-orange/20">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-brand-orange rounded-[2.5rem] p-10 w-full text-white shadow-brand-shadow-orange relative overflow-hidden"
      >
        <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10">
            <span className="text-5xl mb-6 block">🔥</span>
            <h2 className="text-4xl font-black leading-tight mb-2 tracking-tighter uppercase">Matrix Solved.</h2>
            <p className="font-bold opacity-40 text-[10px] uppercase tracking-[0.3em]">Temporal link established</p>
        </div>

        <div className="mt-10 space-y-3 relative z-10 w-full text-white">
            <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl border border-white/10 shadow-inner">
                <span className="font-black text-[9px] uppercase tracking-widest text-white/50">Score Efficiency</span>
                <span className="text-2xl font-black tracking-tighter tabular-nums">{puzzle.score}</span>
            </div>
            <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl border border-white/10 shadow-inner">
                <span className="font-black text-[9px] uppercase tracking-widest text-white/50">Temporal Drift</span>
                <span className="text-2xl font-black tracking-tighter tabular-nums">
                    {Math.floor(puzzle.timeElapsed / 60)}:{(puzzle.timeElapsed % 60).toString().padStart(2, '0')}
                </span>
            </div>
        </div>

        {userBadges.length > 0 && (
            <div className="mt-10 relative z-10">
               <h4 className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 mb-4 ml-1">Rank Accolades</h4>
               <div className="flex flex-wrap gap-2">
                   {userBadges.map(badgeId => (
                       <div 
                          key={badgeId} 
                          className="bg-white text-brand-orange px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-black/5"
                       >
                           <span className="text-xs">{badgesMap[badgeId]?.icon}</span>
                           <span className="text-[8px] font-black uppercase tracking-tighter leading-none">{badgesMap[badgeId]?.name}</span>
                       </div>
                   ))}
               </div>
            </div>
        )}

        <button 
           onClick={() => dispatch(resetPuzzle())}
           className="w-full bg-white text-brand-orange font-black py-5 rounded-2xl mt-10 hover:scale-[1.05] active:scale-95 transition-all shadow-xl uppercase text-xs tracking-widest relative z-10"
        >
           Return to Hub
        </button>
      </motion.div>

      <div className="w-full bg-brand-blue/5 rounded-[2rem] p-6 mt-6 border border-brand-blue/10 flex items-center justify-between text-brand-text shadow-xl">
          <div className="text-sm font-black uppercase tracking-tighter text-brand-blue max-w-[140px] leading-tight opacity-50">Share your results with peers.</div>
          <button className="bg-brand-blue text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-brand-blue transition-all shadow-brand-shadow-blue">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
          </button>
      </div>
    </div>
  );
};
