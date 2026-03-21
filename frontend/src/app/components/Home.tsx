import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { startPuzzle, setStatus } from '../store/puzzleSlice';
import { RootState } from '../store';

const StatPill = ({ label, value, color, icon }: any) => (
    <div className="bg-white border border-black/5 p-4 rounded-3xl flex items-center gap-4 shadow-lg group hover:border-black/10 transition-all">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl ${
            color === 'orange' ? 'bg-brand-orange/10 text-brand-orange' : 'bg-neutral-100'
        }`}>
            {icon}
        </div>
        <div className="flex flex-col">
            <span className="text-[10px] font-black text-brand-text/30 uppercase tracking-widest mb-0.5">{label}</span>
            <span className="text-xl font-black tabular-nums tracking-tighter">{value}</span>
        </div>
    </div>
);

const CategoryIcon = ({ icon, color, label }: any) => (
    <div className="flex flex-col items-center gap-2 group cursor-pointer">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all border border-black/5 bg-white group-hover:scale-110 group-hover:bg-neutral-50 ${
            color === 'orange' ? 'text-brand-orange shadow-brand-shadow-orange group-hover:shadow-brand-orange/30' :
            color === 'blue' ? 'text-brand-blue shadow-brand-shadow-blue group-hover:shadow-brand-blue/30' :
            'text-brand-pink shadow-brand-pink/5 group-hover:shadow-brand-pink/30'
        } shadow-[0_0_20px_rgba(0,0,0,0.05)]`}>
            {icon}
        </div>
        <span className="text-[9px] font-black uppercase text-brand-text/30 tracking-widest opacity-60 group-hover:opacity-100 group-hover:text-brand-text transition-all text-center max-w-[60px] leading-tight">
            {label}
        </span>
    </div>
);

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const streak = useSelector((state: RootState) => state.user.streak);
  const totalPoints = useSelector((state: RootState) => state.user.totalPoints);
  const userBadges = useSelector((state: RootState) => state.user.badges);

  const badgesMap: Record<string, { icon: string; name: string; color: string }> = {
    pulse_nova: { icon: '⚡', name: 'Pulse Nova', color: 'bg-brand-orange' },
    iron_nexus: { icon: '🛡️', name: 'Iron Nexus', color: 'bg-brand-ruby' },
    infinite_core: { icon: '💎', name: 'Infinite Core', color: 'bg-brand-blue' },
    matrix_veteran: { icon: '🕰️', name: 'Matrix Veteran', color: 'bg-brand-pink' },
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 max-w-6xl mx-auto pt-10 no-scrollbar pb-24">
      {/* Dashboard Entry / Hero */}
      <div className="flex flex-col lg:flex-row gap-6">
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-brand-orange rounded-[4rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 justify-between flex-[2] text-white shadow-2xl relative overflow-hidden group min-h-[360px]"
        >
          <div className="absolute top-[-40px] right-[-40px] w-64 h-64 bg-white/20 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-[-30px] left-[10%] w-48 h-48 bg-black/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex-1">
            <h2 className="text-4xl md:text-6xl font-black leading-none tracking-tighter mb-4 uppercase">Logic <br/>Matrix.</h2>
            <p className="text-sm font-bold opacity-70 mb-8 max-w-sm leading-relaxed italic">The sequence is ready. Solve today's puzzle to keep your {streak}-day streak alive.</p>
            <button 
              onClick={() => dispatch(startPuzzle())}
              className="w-full md:w-fit bg-white text-brand-orange font-black px-12 py-5 rounded-[2rem] hover:scale-[1.05] active:scale-95 transition-all text-sm shadow-2xl shadow-brand-orange/40 relative z-10 uppercase tracking-widest"
            >
              Start Session →
            </button>
          </div>

          {/* Brain Puzzle Icon - Right Side */}
          <motion.div 
            animate={{ 
                y: [0, -12, 0],
                rotate: [0, 5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-32 h-32 md:w-64 md:h-64 flex items-center justify-center"
          >
             <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-[0_40px_60px_rgba(255,92,0,0.5)] fill-white"><path d="M20.5,11H19V7c0-1.1-0.9-2-2-2h-4V3.5C13,2.12,11.88,1,10.5,1S8,2.12,8,3.5V5H4C2.9,5,2,5.9,2,7v4h1.5c1.38,0,2.5,1.12,2.5,2.5S4.88,16,3.5,16H2v4c0,1.1,0.9,2,2,2h4v-1.5c0-1.38,1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5V22h4c1.1,0,2-0.9,2-2v-4h1.5c1.38,0,2.5-1.12,2.5-2.5S21.88,11,20.5,11z"/></svg>
             <div className="absolute inset-0 bg-white/40 blur-[100px] rounded-full scale-50 -z-10" />
          </motion.div>
        </motion.div>

        <div className="flex flex-col gap-4 flex-1 h-full min-w-[280px]">
            <StatPill label="Total Points" value={totalPoints} color="white" icon="📈" />
            <StatPill label="Current Streak" value={`${streak} DAYS`} color="orange" icon="🔥" />
            
            <motion.div 
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,1)' }}
                onClick={() => dispatch(setStatus('leaderboard'))}
                className="bg-brand-pink rounded-[3rem] p-8 flex flex-col justify-between flex-1 text-white shadow-2xl cursor-pointer group transition-all"
            >
                <div className="text-[10px] font-black uppercase tracking-[0.3em] leading-tight mb-4 opacity-40">Leaderboards</div>
                <div className="flex items-end justify-between">
                    <span className="font-black text-3xl tracking-tighter uppercase leading-none">Global <br/>Position #42</span>
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/20 shadow-xl group-hover:rotate-12 transition-transform">
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          {/* Daily Puzzle Ecosystem */}
          <div className="md:col-span-1 bg-white rounded-[3.5rem] border border-black/5 p-10 flex flex-col justify-between shadow-2xl min-h-[380px]">
              <div>
                  <h4 className="text-[10px] font-black uppercase text-brand-text/20 tracking-[0.4em] mb-10">Puzzle Types</h4>
                  <div className="grid grid-cols-3 gap-x-6 gap-y-12">
                      <CategoryIcon icon="▤" label="Matrix" color="orange" />
                      <CategoryIcon icon="➔" label="Sequence" color="blue" />
                      <CategoryIcon icon="⌥" label="Logics" color="pink" />
                      <CategoryIcon icon="▥" label="Grid" color="blue" />
                      <CategoryIcon icon="◆" label="Pattern" color="orange" />
                      <div className="w-14 h-14 rounded-2xl border border-black/5 bg-neutral-50 flex items-center justify-center text-[10px] font-black text-brand-text/10 tracking-tighter uppercase">
                          More
                      </div>
                  </div>
              </div>
              <div className="mt-8 pt-8 border-t border-black/5">
                   <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black tracking-widest text-brand-text/20 uppercase">Network Status</span>
                        <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Active</span>
                   </div>
              </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-6 h-full">
            {/* Activity Heatmap Mockup */}
            <div className="bg-white rounded-[3.5rem] border border-black/5 p-10 shadow-2xl flex-1">
                <h4 className="text-[10px] font-black uppercase text-brand-text/20 tracking-[0.4em] mb-10 text-center">Your Cognitive Activity</h4>
                <div className="grid grid-cols-10 grid-rows-3 gap-[10px]">
                    {Array.from({length: 30}).map((_, i) => (
                        <div 
                        key={i} 
                        className={`aspect-square rounded-xl transition-all hover:scale-125 cursor-help ${
                            i === 29 || i === 24 || i === 12 ? 'bg-brand-orange shadow-brand-shadow-orange border border-white/40' : 
                            i % 4 === 1 ? 'bg-brand-blue opacity-40' : 
                            i % 5 === 2 ? 'bg-brand-pink opacity-20' : 'bg-neutral-100'
                        }`} 
                        />
                    ))}
                </div>
                <div className="mt-10 flex flex-col items-center">
                    <span className="text-sm font-black text-brand-text/40 mb-4">You've solved 128 puzzles this month!</span>
                    <div className="w-full bg-neutral-100 h-2 rounded-full relative overflow-hidden">
                         <div className="absolute top-0 left-0 h-full bg-brand-orange w-[65%] rounded-full shadow-[0_0_15px_rgba(255,92,0,0.5)]" />
                    </div>
                </div>
            </div>

            {/* Achievement Bar */}
            <div className="bg-white rounded-[2.5rem] border border-black/5 p-8 shadow-2xl flex items-center gap-8">
                <div className="flex -space-x-4">
                    {userBadges.map((id, i) => (
                        <div key={id} className={`w-14 h-14 rounded-full border-4 border-white flex items-center justify-center text-2xl shadow-lg transition-transform hover:-translate-y-2 cursor-pointer ${
                            i % 2 === 0 ? 'bg-brand-orange' : 'bg-brand-blue'
                        }`}>
                            {badgesMap[id]?.icon || '🏆'}
                        </div>
                    ))}
                    {userBadges.length === 0 && (
                        <div className="w-14 h-14 rounded-full border-2 border-dashed border-black/5 flex items-center justify-center text-xs font-bold text-black/10">?</div>
                    )}
                </div>
                <div className="flex-1">
                    <h5 className="text-[10px] font-black uppercase text-brand-text/20 tracking-widest mb-1.5">Synaptic progression</h5>
                    <div className="bg-neutral-100 h-1.5 lg:h-2 w-full rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '42%' }}
                            className="bg-brand-blue h-full shadow-[0_0_10px_rgba(0,133,255,0.4)]" 
                        />
                    </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};
