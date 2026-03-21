import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { startPuzzle, setStatus } from '../store/puzzleSlice';
import { RootState } from '../store';

const StatPill = ({ label, value, color, icon }: any) => (
    <div className="bg-neutral-900 border border-white/5 p-3 rounded-xl flex items-center gap-3 shadow-lg group hover:border-white/10 transition-all">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${
            color === 'yellow' ? 'bg-brand-yellow/10 text-brand-yellow' : 'bg-white/5 text-white'
        }`}>
            {icon}
        </div>
        <div className="flex flex-col">
            <span className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-0.5">{label}</span>
            <span className={`text-lg font-black tabular-nums tracking-tighter ${color === 'yellow' ? 'text-brand-yellow' : 'text-white'}`}>{value}</span>
        </div>
    </div>
);

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const streak = useSelector((state: RootState) => state.user.streak);
  const totalPoints = useSelector((state: RootState) => state.user.totalPoints);
  const userBadges = useSelector((state: RootState) => state.user.badges);

  const badgesMap: Record<string, { icon: string; name: string; color: string }> = {
    pulse_nova: { icon: '⚡', name: 'Pulse Nova', color: 'bg-brand-yellow' },
    iron_nexus: { icon: '🛡️', name: 'Iron Nexus', color: 'bg-brand-ruby' },
    infinite_core: { icon: '💎', name: 'Infinite Core', color: 'bg-brand-cyan' },
    matrix_veteran: { icon: '🕰️', name: 'Matrix Veteran', color: 'bg-brand-lavender' },
  };

  return (
    <div className="flex flex-col gap-5 p-4 md:p-8 max-w-4xl mx-auto pt-10 no-scrollbar">
      {/* Dashboard Entry / Hero */}
      <div className="flex flex-col md:flex-row gap-5">
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-brand-yellow rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between flex-[1.5] text-black shadow-xl relative overflow-hidden group min-h-[240px]"
        >
          <div className="absolute top-[-30px] right-[-30px] w-36 h-36 bg-black/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2 mb-3 bg-black/10 w-fit px-2.5 py-0.5 rounded-full border border-black/5">
                <span className="w-1 h-1 rounded-full bg-black animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">Logic Link Active</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black leading-tight tracking-tighter mb-3 uppercase">Logic Matrix.</h2>
            <p className="text-xs font-bold opacity-60 mb-6 max-w-sm">Synchronize your cognitive nodes. Complete today's puzzle to maintain your {streak}-day streak.</p>
            <button 
              onClick={() => dispatch(startPuzzle())}
              className="w-full md:w-fit bg-black text-brand-yellow font-black px-8 py-3 rounded-xl hover:scale-[1.05] active:scale-95 transition-all text-sm shadow-xl relative z-10 uppercase tracking-widest"
            >
              Init Session
            </button>
          </div>

          {/* Brain Puzzle Icon - Right Side */}
          <motion.div 
            animate={{ 
                y: [0, -8, 0],
                rotate: [0, 4, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-28 h-28 md:w-36 md:h-36 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity"
          >
             <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="90" stroke="black" strokeWidth="2" strokeDasharray="4 4" opacity="0.1"/>
                <path d="M100 30C70 30 45 55 45 85C45 105 55 120 65 130C60 135 55 145 55 160C55 180 75 185 100 185C125 185 145 180 145 160C145 145 140 135 135 130C145 120 155 105 155 85C155 55 130 30 100 30Z" stroke="black" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M100 30C130 30 155 55 155 85M45 85C45 55 70 30 100 30" stroke="black" strokeWidth="8"/>
                <path d="M70 70C80 60 120 60 130 70" stroke="black" strokeWidth="4" strokeLinecap="round"/>
                <path d="M80 140C90 150 110 150 120 140" stroke="black" strokeWidth="4" strokeLinecap="round"/>
                <rect x="90" y="80" width="20" height="20" rx="4" fill="black" />
             </svg>
             {/* Glow effect */}
             <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-75 -z-10" />
          </motion.div>
        </motion.div>

        <div className="flex flex-col gap-3.5 flex-1">
            <StatPill label="Total Points" value={totalPoints} color="white" icon="📈" />
            <StatPill label="Streak" value={`${streak} DAYS`} color="yellow" icon="🔥" />
            
            <motion.div 
                whileHover={{ scale: 1.02 }}
                onClick={() => dispatch(setStatus('leaderboard'))}
                className="bg-brand-lavender rounded-3xl p-5 flex flex-col justify-between flex-1 text-black shadow-xl cursor-pointer"
            >
                <div className="text-base font-black uppercase tracking-tighter leading-tight mb-2 opacity-20">Rank</div>
                <div className="flex items-center justify-between">
                    <span className="font-black text-base tracking-tighter uppercase">Global #42</span>
                    <svg className="w-5 h-5 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
            </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Daily Progress Goal */}
          <div className="bg-neutral-900/50 rounded-2xl border border-white/5 p-5 flex flex-col justify-between shadow-xl">
              <div>
                  <h4 className="text-[10px] font-black uppercase text-neutral-500 tracking-widest mb-3">Daily Goal</h4>
                  <div className="flex items-center justify-between mb-2">
                       <span className="font-black text-lg">65%</span>
                       <span className="text-[10px] font-bold text-neutral-600 uppercase">2 / 3 Syncs</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-[4px] rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '65%' }}
                          className="bg-brand-yellow h-full shadow-lg shadow-brand-yellow/20"
                      />
                  </div>
              </div>
              <p className="text-[10px] font-black text-neutral-600 mt-3 uppercase tracking-widest leading-normal">Reach 100% for bonus.</p>
          </div>

          {/* Activity Heatmap Enhanced */}
          <div className="md:col-span-2 bg-neutral-900/50 rounded-2xl border border-white/5 p-5 shadow-xl">
              <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[10px] font-black uppercase text-neutral-500 tracking-widest">Activity Flow</h4>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase">Last 30 Days</span>
              </div>
              <div className="grid grid-cols-10 grid-rows-3 gap-[5px] overflow-x-auto no-scrollbar pb-0">
                  {Array.from({length: 30}).map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-md transition-all hover:scale-110 cursor-help ${
                            i === 29 || i === 24 || i === 12 ? 'bg-brand-yellow shadow-lg shadow-brand-yellow/30' : 
                            i % 4 === 1 ? 'bg-brand-lavender opacity-60' : 
                            i % 5 === 2 ? 'bg-brand-lavender opacity-30' : 'bg-neutral-800/40'
                        }`} 
                        title={`Day ${i+1}: Active`}
                      />
                  ))}
              </div>
              <div className="mt-3 flex gap-3">
                  <div className="flex items-center gap-1 opacity-40">
                      <div className="w-[4px] h-[4px] rounded-full bg-neutral-800" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Idle</span>
                  </div>
                  <div className="flex items-center gap-1">
                      <div className="w-[4px] h-[4px] rounded-full bg-brand-yellow shadow-sm shadow-brand-yellow/50" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-yellow">Peak</span>
                  </div>
              </div>
          </div>
      </div>

      {/* Neural Achievements Section */}
      <div className="bg-neutral-900/50 rounded-2xl border border-white/5 p-5 shadow-xl">
          <h4 className="text-[10px] font-black uppercase text-neutral-500 tracking-widest mb-3">Neural Archive</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(badgesMap).map(([id, badge]) => {
                  const isUnlocked = userBadges.includes(id);
                  return (
                      <motion.div 
                        key={id} 
                        whileHover={isUnlocked ? { y: -3 } : {}}
                        className={`relative p-3 rounded-xl border border-white/5 flex flex-col items-center justify-center transition-all ${
                            isUnlocked ? 'bg-white/5 shadow-xl' : 'opacity-20 grayscale pointer-events-none'
                        }`}
                      >
                          <div className={`text-xl mb-1.5 ${isUnlocked ? 'animate-pulse-slow' : ''}`}>
                              {badge.icon}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-white text-center">
                              {badge.name}
                          </span>
                      </motion.div>
                  );
              })}
          </div>
      </div>
    </div>
  );
};
