import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  onBack: () => void;
}

const PodiumItem = ({ rank, name, score, color }: any) => (
    <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: rank * 0.1 }}
        className={`flex flex-col items-center justify-between p-6 rounded-[2rem] shadow-xl relative flex-1 text-white overflow-hidden ${
            color === 'orange' ? 'bg-brand-orange min-h-[260px] z-20 scale-105 shadow-brand-shadow-orange' : 
            'bg-brand-blue min-h-[220px] mt-8 shadow-brand-shadow-blue'
        }`}
    >
        <div className="absolute top-[-15px] right-[-15px] w-16 h-16 bg-white/10 blur-xl rounded-full" />
        <div className="text-center relative z-10 w-full mb-2">
            <span className={`text-[8px] font-black uppercase tracking-[0.3em] mb-2 block opacity-40`}>Rank 0{rank}</span>
            <div className="w-14 h-14 bg-white/10 rounded-2xl mx-auto mb-4 flex items-center justify-center relative shadow-inner">
                <span className="text-2xl">{rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}</span>
            </div>
            <h5 className="text-lg font-black tracking-tighter leading-tight mb-0">{name}</h5>
            <p className="text-[8px] uppercase font-black opacity-30 tracking-widest mt-0">Elite Logic Master</p>
        </div>
        <div className="text-center relative z-10 w-full">
            <span className="text-xl font-black tabular-nums tracking-tighter">{score}</span>
            <p className="text-[8px] uppercase font-black opacity-30 tracking-widest mt-0">Total Rating</p>
        </div>
    </motion.div>
);

const RankItem = ({ rank, name, score }: any) => (
    <div className="flex items-center justify-between p-4 bg-white border border-black/5 rounded-2xl mb-2 group hover:bg-neutral-50 transition-all cursor-pointer shadow-sm">
        <div className="flex items-center gap-4">
            <div className="text-[10px] font-black text-neutral-300 tracking-widest w-6">0{rank}</div>
            <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-black/5 flex items-center justify-center font-black text-brand-blue group-hover:bg-brand-blue/5">
                {name.charAt(0)}
            </div>
            <div>
                <p className="font-black text-base tracking-tight leading-tight text-brand-text">{name}</p>
                <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mt-0">Active Streak: 4D</p>
            </div>
        </div>
        <div className="text-right">
            <span className="text-lg font-black tabular-nums tracking-tighter text-brand-text">{score}</span>
        </div>
    </div>
);

export const Leaderboard: React.FC<Props> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-5xl mx-auto pt-24 px-4 pb-20 no-scrollbar selection:bg-brand-orange/20"
    >
      <div className="flex items-end justify-between mb-10 px-4">
        <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight uppercase text-brand-text">Global<br/>Rankings<span className="text-brand-orange">.</span></h2>
            <p className="text-brand-text/20 font-bold uppercase text-[9px] tracking-[0.3em] mt-4">Logic Mesh | Global Leaderboard</p>
        </div>
        <button 
           onClick={onBack}
           className="bg-white border border-black/5 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-neutral-50 shadow-sm transition-all font-black text-xs"
        >
            ✕
        </button>
      </div>

      {/* Podium for Top 3 */}
      <div className="flex flex-col md:flex-row items-end gap-4 mb-12 px-4">
          <PodiumItem rank={2} name="Bob Dylan" score={3950} color="blue" />
          <PodiumItem rank={1} name="Alice Vance" score={4200} color="orange" />
          <PodiumItem rank={3} name="Charlie Puth" score={3700} color="blue" />
      </div>

      {/* Remaining List */}
      <div className="max-w-2xl mx-auto space-y-2 px-4">
        <RankItem rank={4} name="Dwayne Johnson" score={3200} />
        <RankItem rank={5} name="Eva Green" score={2850} />
        <RankItem rank={6} name="Frank Underwood" score={2100} />
      </div>

      {/* Persistent Your Rank Section */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xs px-4 z-50">
          <motion.div 
            whileHover={{ y: -3 }}
            className="bg-brand-text rounded-2xl p-4 flex items-center justify-between text-white shadow-2xl relative overflow-hidden"
          >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/10 blur-2xl rounded-full" />
              <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center font-black">42</div>
                  <div>
                      <p className="font-black tracking-tighter leading-none mb-0">YOU</p>
                      <span className="text-[8px] uppercase font-black opacity-30 tracking-widest">Global Ranking</span>
                  </div>
              </div>
              <div className="text-right relative z-10">
                  <p className="text-xl font-black tracking-tighter">1,240</p>
                  <p className="text-[8px] uppercase font-black opacity-30 tracking-widest">+240% This Week</p>
              </div>
          </motion.div>
      </div>
    </motion.div>
  );
};
