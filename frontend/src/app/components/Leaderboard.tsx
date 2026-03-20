import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onBack: () => void;
}

const PodiumItem = ({ rank, name, score, color }: any) => (
    <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: rank * 0.1 }}
        className={`flex flex-col items-center justify-between p-8 rounded-5xl shadow-2xl relative flex-1 text-black overflow-hidden ${
            color === 'yellow' ? 'bg-brand-yellow min-h-[340px] z-20 scale-105 brand-shadow-yellow' : 
            'bg-brand-lavender/90 min-h-[290px] mt-10'
        }`}
    >
        <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-black/10 blur-2xl rounded-full" />
        <div className="text-center relative z-10 w-full mb-4">
            <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-4 block opacity-50`}>Rank 0{rank}</span>
            <div className="w-20 h-20 bg-black/10 rounded-3xl mx-auto mb-6 flex items-center justify-center relative shadow-inner">
                <span className="text-4xl font-black">{rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}</span>
            </div>
            <h5 className="text-2xl font-black tracking-tighter leading-none mb-1">{name}</h5>
            <p className="text-[10px] uppercase font-black opacity-30 tracking-widest mt-1">Brain Elite</p>
        </div>
        <div className="text-center relative z-10 w-full">
            <span className="text-3xl font-black tabular-nums tracking-tighter">{score}</span>
            <p className="text-[10px] uppercase font-black opacity-30 tracking-widest mt-1 uppercase">Total Rating</p>
        </div>
    </motion.div>
);

const RankItem = ({ rank, name, score }: any) => (
    <div className="flex items-center justify-between p-6 bg-neutral-900 border border-white/5 rounded-4xl mb-4 group hover:bg-neutral-800 transition-all cursor-pointer shadow-xl">
        <div className="flex items-center gap-5">
            <div className="text-xs font-black text-neutral-600 tracking-widest w-6">0{rank}</div>
            <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center font-black group-hover:bg-neutral-700">
                {name.charAt(0)}
            </div>
            <div>
                <p className="font-black text-lg tracking-tight leading-none">{name}</p>
                <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mt-1">Active Streak: 4D</p>
            </div>
        </div>
        <div className="text-right">
            <span className="text-xl font-black tabular-nums tracking-tighter">{score}</span>
        </div>
    </div>
);

export const Leaderboard: React.FC<Props> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-6xl mx-auto pt-40 px-6 pb-40 no-scrollbar"
    >
      <div className="flex items-end justify-between mb-16 px-4">
        <div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">GLOBAL<br/>LADDER.</h2>
            <p className="text-neutral-500 font-bold uppercase text-xs tracking-[0.3em] mt-6">Week 12 | Matrix Pro Division</p>
        </div>
        <button 
           onClick={onBack}
           className="bg-neutral-900/80 border border-white/5 w-16 h-16 rounded-[2rem] flex items-center justify-center hover:bg-neutral-800 transition-all font-black"
        >
            ✕
        </button>
      </div>

      {/* Podium for Top 3 */}
      <div className="flex flex-col md:flex-row items-end gap-6 mb-20 px-4">
          <PodiumItem rank={2} name="Bob Dylan" score={3950} color="lavender" />
          <PodiumItem rank={1} name="Alice Vance" score={4200} color="yellow" />
          <PodiumItem rank={3} name="Charlie Puth" score={3700} color="lavender" />
      </div>

      {/* Remaining List */}
      <div className="max-w-3xl mx-auto space-y-2 px-4">
        <RankItem rank={4} name="Dwayne Johnson" score={3200} />
        <RankItem rank={5} name="Eva Green" score={2850} />
        <RankItem rank={6} name="Frank Underwood" score={2100} />
        <RankItem rank={7} name="Grace Kelly" score={1900} />
      </div>

      {/* Persistent Your Rank Section */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm px-6 z-50">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-brand-lavender rounded-3xl p-6 flex items-center justify-between text-black shadow-[0_20px_50px_rgba(193,153,255,0.4)]"
          >
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black/10 rounded-2xl flex items-center justify-center font-black">42</div>
                  <div>
                      <p className="font-black tracking-tighter leading-none mb-1">YOU</p>
                      <span className="text-[10px] uppercase font-black opacity-30 tracking-widest">Global Ranking</span>
                  </div>
              </div>
              <div className="text-right">
                  <p className="text-2xl font-black tracking-tighter">1,240</p>
                  <p className="text-[10px] uppercase font-black opacity-30 tracking-widest uppercase">+240% This Week</p>
              </div>
          </motion.div>
      </div>
    </motion.div>
  );
};
