const CategoryIcon = ({ icon, color, label }: any) => (
    <div className="flex flex-col items-center gap-2 group cursor-pointer">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all border border-white/5 bg-neutral-900 group-hover:scale-110 group-hover:bg-neutral-800 ${
            color === 'yellow' ? 'text-brand-yellow shadow-brand-yellow/5 group-hover:shadow-brand-yellow/30' :
            color === 'cyan' ? 'text-brand-cyan shadow-brand-cyan/5 group-hover:shadow-brand-cyan/30' :
            'text-brand-lavender shadow-brand-lavender/5 group-hover:shadow-brand-lavender/30'
        } shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
            {icon}
        </div>
        <span className="text-[9px] font-black uppercase text-neutral-500 tracking-widest opacity-60 group-hover:opacity-100 group-hover:text-white transition-all text-center max-w-[60px] leading-tight">
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
    pulse_nova: { icon: '⚡', name: 'Pulse Nova', color: 'bg-brand-yellow' },
    iron_nexus: { icon: '🛡️', name: 'Iron Nexus', color: 'bg-brand-ruby' },
    infinite_core: { icon: '💎', name: 'Infinite Core', color: 'bg-brand-cyan' },
    matrix_veteran: { icon: '🕰️', name: 'Matrix Veteran', color: 'bg-brand-lavender' },
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 max-w-5xl mx-auto pt-10 no-scrollbar pb-24">
      {/* Dashboard Entry / Hero */}
      <div className="flex flex-col lg:flex-row gap-6">
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-brand-yellow rounded-[4rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 justify-between flex-[2] text-black shadow-2xl relative overflow-hidden group min-h-[320px]"
        >
          <div className="absolute top-[-40px] right-[-40px] w-64 h-64 bg-white/20 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-[-30px] left-[10%] w-48 h-48 bg-black/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2 mb-4 bg-black/10 w-fit px-3 py-1 rounded-full border border-black/5">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Neural Uplink Stable</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-none tracking-tighter mb-4 uppercase">Logic <br/>Matrix.</h2>
            <p className="text-xs font-bold opacity-70 mb-8 max-w-sm leading-relaxed">Cognitive synchronization is ready. Solve today's sequence to maintain your {streak}-day momentum and accumulate neural points.</p>
            <button 
              onClick={() => dispatch(startPuzzle())}
              className="w-full md:w-fit bg-black text-brand-yellow font-black px-12 py-4 rounded-3xl hover:scale-[1.05] active:scale-95 transition-all text-sm shadow-xl relative z-10 uppercase tracking-[0.2em] group"
            >
              Initialize Node 
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
            </button>
          </div>

          {/* Brain Puzzle Icon - Right Side */}
          <motion.div 
            animate={{ 
                y: [0, -12, 0],
                rotate: [0, 5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-32 h-32 md:w-56 md:h-56 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity"
          >
             <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="95" stroke="black" strokeWidth="1" strokeDasharray="8 8" opacity="0.1"/>
                <path d="M100 30C70 30 45 55 45 85C45 105 55 120 65 130C60 135 55 145 55 160C55 180 75 185 100 185C125 185 145 180 145 160C145 145 140 135 135 130C145 120 155 105 155 85C155 55 130 30 100 30Z" stroke="black" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M100 30C130 30 155 55 155 85M45 85C45 55 70 30 100 30" stroke="black" strokeWidth="10"/>
                <path d="M75 100h50M100 75v50" stroke="black" strokeWidth="8" strokeLinecap="round" opacity="0.4"/>
                <rect x="90" y="80" width="20" height="20" rx="4" fill="black" />
             </svg>
             <div className="absolute inset-0 bg-white/30 blur-[80px] rounded-full scale-50 -z-10" />
          </motion.div>
        </motion.div>

        <div className="flex flex-col gap-4 flex-1 h-full min-w-[280px]">
            <StatPill label="Total Points" value={totalPoints} color="white" icon="📈" />
            <StatPill label="Sync Streak" value={`${streak} DAYS`} color="yellow" icon="🔥" />
            
            <motion.div 
                whileHover={{ scale: 1.02 }}
                onClick={() => dispatch(setStatus('leaderboard'))}
                className="bg-brand-lavender rounded-[3rem] p-6 flex flex-col justify-between flex-1 text-black shadow-2xl cursor-pointer group hover:bg-white transition-all overflow-hidden relative"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full translate-x-12 -translate-y-12" />
                <div className="text-[10px] font-black uppercase tracking-[0.2em] leading-tight mb-2 opacity-30">Synaptic Rank</div>
                <div className="flex items-end justify-between relative z-10">
                    <span className="font-black text-2xl tracking-tighter uppercase leading-none">Global <br/>Tier #42</span>
                    <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-brand-lavender shadow-xl">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Daily Puzzle Ecosystem */}
          <div className="md:col-span-1 bg-neutral-900/40 rounded-[3rem] border border-white/5 p-8 flex flex-col justify-between shadow-2xl backdrop-blur-3xl min-h-[340px]">
              <div>
                  <h4 className="text-[10px] font-black uppercase text-neutral-500 tracking-[0.3em] mb-8">Logical Array</h4>
                  <div className="grid grid-cols-3 gap-x-4 gap-y-10">
                      <CategoryIcon icon="▤" label="Matrix" color="yellow" />
                      <CategoryIcon icon="➔" label="Math" color="cyan" />
                      <CategoryIcon icon="⌥" label="Logic" color="lavender" />
                      <CategoryIcon icon="▥" label="Grid" color="cyan" />
                      <CategoryIcon icon="◆" label="Pattern" color="yellow" />
                      <div className="w-14 h-14 rounded-2xl border border-white/5 bg-neutral-950 flex items-center justify-center text-xs font-black text-neutral-800 tracking-tighter">
                          +01
                      </div>
                  </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/5">
                   <p className="text-[10px] font-black tracking-widest text-neutral-500 uppercase">Synchronicity: <span className="text-brand-yellow">Peak</span></p>
              </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-6 h-full">
            {/* Activity Heatmap Enhanced */}
            <div className="bg-neutral-900/40 rounded-[3rem] border border-white/5 p-8 shadow-2xl backdrop-blur-3xl flex-1">
                <div className="flex justify-between items-center mb-8">
                    <h4 className="text-[10px] font-black uppercase text-neutral-500 tracking-[0.3em]">Activity Flow</h4>
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black text-neutral-400 uppercase tracking-widest border border-white/5">Neural Stability 98%</span>
                </div>
                <div className="grid grid-cols-10 grid-rows-3 gap-[8px] overflow-x-auto no-scrollbar">
                    {Array.from({length: 30}).map((_, i) => (
                        <div 
                        key={i} 
                        className={`aspect-square rounded-xl transition-all hover:scale-110 cursor-help ${
                            i === 29 || i === 24 || i === 12 ? 'bg-brand-yellow shadow-[0_0_20px_rgba(250,204,21,0.2)] border border-brand-yellow/30' : 
                            i % 4 === 1 ? 'bg-brand-lavender opacity-60' : 
                            i % 5 === 2 ? 'bg-brand-lavender opacity-30' : 'bg-neutral-800/40 border border-white/5'
                        }`} 
                        title={`Day ${i+1}: Active`}
                        />
                    ))}
                </div>
                <div className="mt-8 flex justify-between items-center bg-black/40 p-5 rounded-[2rem] border border-white/5">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest mb-1">Weekly Average</span>
                        <span className="text-xl font-black text-white italic tabular-nums">42.5m</span>
                    </div>
                    <div className="w-[100px] h-10 flex items-end gap-1 px-2">
                        {[4,6,3,8,5,7,9].map((h, i) => (
                            <div key={i} className="flex-1 bg-brand-cyan/20 rounded-t-[2px] border-t-2 border-brand-cyan" style={{ height: `${h * 10}%` }} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Achievement Bar */}
            <div className="bg-neutral-900/40 rounded-[2.5rem] border border-white/5 p-6 shadow-2xl backdrop-blur-3xl flex items-center gap-6 overflow-hidden">
                <div className="flex -space-x-3">
                    {userBadges.map((id, i) => (
                        <div key={id} className={`w-12 h-12 rounded-full border-4 border-neutral-900 flex items-center justify-center text-xl shadow-xl transition-transform hover:-translate-y-2 cursor-pointer ${
                            i % 2 === 0 ? 'bg-brand-yellow' : 'bg-brand-cyan'
                        }`}>
                            {badgesMap[id]?.icon || '🏆'}
                        </div>
                    ))}
                    {userBadges.length === 0 && (
                        <div className="w-12 h-12 rounded-full border-2 border-neutral-800 border-dashed flex items-center justify-center text-xs font-black text-neutral-700">?</div>
                    )}
                </div>
                <div className="flex-1">
                    <h5 className="text-[10px] font-black uppercase text-neutral-500 tracking-widest mb-1 whitespace-nowrap">Synaptic Progression</h5>
                    <div className="w-full bg-black/40 h-2 rounded-full relative overflow-hidden p-0.5 border border-white/5">
                         <div className="bg-brand-yellow h-full rounded-full shadow-[0_0_15px_rgba(250,204,21,0.5)]" style={{ width: '65%' }} />
                    </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};
>
    </div>
  );
};
