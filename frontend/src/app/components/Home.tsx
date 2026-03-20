import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { startPuzzle, setStatus } from '../store/puzzleSlice';
import { RootState } from '../store';

const StatPill = ({ label, value, color }: any) => (
    <div className="bg-neutral-900 border border-white/5 p-6 rounded-4xl flex flex-col items-center justify-center shadow-xl">
        <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] mb-2">{label}</span>
        <span className={`text-3xl font-black tabular-nums tracking-tighter ${color === 'yellow' ? 'text-brand-yellow' : 'text-white'}`}>{value}</span>
    </div>
);

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const streak = useSelector((state: RootState) => state.user.streak);
  const totalPoints = useSelector((state: RootState) => state.user.totalPoints);

  return (
    <div className="flex flex-col gap-8 p-6 md:p-12 max-w-6xl mx-auto pt-32 no-scrollbar">
      {/* Dashboard Entry / Hero */}
      <div className="flex flex-col md:flex-row gap-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-brand-yellow rounded-5xl p-10 md:p-14 flex flex-col justify-between flex-[1.5] text-black shadow-2xl relative overflow-hidden group min-h-[400px]"
        >
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-black/5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6 bg-black/10 w-fit px-4 py-2 rounded-full border border-black/5">
                <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">Training Active</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black leading-[0.9] tracking-tighter mb-4">YOUR DAILY<br/>MATRIX IS<br/>READY.</h2>
            <p className="text-lg font-bold opacity-60 mb-10 max-w-sm">Complete today's sequence to maintain your 4-day streak.</p>
          </div>
          
          <button 
            onClick={() => dispatch(startPuzzle())}
            className="w-full md:w-fit bg-black text-brand-yellow font-black px-12 py-6 rounded-3xl hover:scale-[1.05] active:scale-95 transition-all text-xl shadow-2xl relative z-10"
          >
            START SESSION
          </button>
        </motion.div>

        <div className="flex flex-col gap-8 flex-1">
            <StatPill label="Total Points" value={totalPoints} color="white" />
            <StatPill label="Current Streak" value={`${streak} DAYS`} color="yellow" />
            
            <motion.div 
                whileHover={{ scale: 1.02 }}
                onClick={() => dispatch(setStatus('leaderboard'))}
                className="bg-brand-lavender rounded-5xl p-8 flex flex-col justify-between flex-1 text-black shadow-2xl cursor-pointer"
            >
                <div className="text-3xl font-black uppercase tracking-tighter leading-none mb-4 opacity-30">Ranking</div>
                <div className="flex items-center justify-between">
                    <span className="font-black text-2xl tracking-tighter">GLOBAL #42</span>
                    <svg className="w-8 h-8 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
            </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Daily Progress Goal */}
          <div className="bg-neutral-900/50 rounded-5xl border border-white/5 p-10 flex flex-col justify-between shadow-xl">
              <div>
                  <h4 className="text-xs font-black uppercase text-neutral-500 tracking-[0.2em] mb-6">Daily Goal</h4>
                  <div className="flex items-center justify-between mb-4">
                      <span className="font-black text-2xl">65%</span>
                      <span className="text-xs font-bold text-neutral-600 uppercase">2 / 3 Puzzles</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-4 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '65%' }}
                          className="bg-brand-yellow h-full shadow-lg shadow-brand-yellow/20"
                      />
                  </div>
              </div>
              <p className="text-xs font-black text-neutral-600 mt-8 uppercase tracking-widest leading-relaxed">Reach 100% to unlock the Weekend Bonus.</p>
          </div>

          {/* Activity Heatmap Enhanced */}
          <div className="md:col-span-2 bg-neutral-900/50 rounded-5xl border border-white/5 p-10 shadow-xl">
              <div className="flex justify-between items-center mb-10">
                  <h4 className="text-xs font-black uppercase text-neutral-500 tracking-[0.2em]">Activity Flow</h4>
                  <span className="text-xs font-bold text-neutral-500 uppercase">Last 30 Days</span>
              </div>
              <div className="grid grid-cols-10 grid-rows-3 gap-2 overflow-x-auto no-scrollbar pb-2">
                  {Array.from({length: 30}).map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-xl transition-all hover:scale-110 cursor-help ${
                            i === 29 || i === 24 || i === 12 ? 'bg-brand-yellow shadow-lg shadow-brand-yellow/30' : 
                            i % 4 === 1 ? 'bg-brand-lavender opacity-60' : 
                            i % 5 === 2 ? 'bg-brand-lavender opacity-30' : 'bg-neutral-800/40'
                        }`} 
                        title={`Day ${i+1}: Active`}
                      />
                  ))}
              </div>
              <div className="mt-8 flex gap-4">
                  <div className="flex items-center gap-1.5 opacity-50">
                      <div className="w-2 h-2 rounded-full bg-neutral-800" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Idle</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-brand-yellow shadow-sm shadow-brand-yellow/50" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-yellow">Peak</span>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
