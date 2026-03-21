import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  onBack: () => void;
}

const PodiumItem = ({ rank, name, score, color, icon }: any) => (
    <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: rank * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -10, scale: 1.05 }}
        className={`flex flex-col items-center justify-between p-8 rounded-[2.5rem] shadow-2xl relative flex-1 text-white overflow-hidden transition-all duration-500 ${
            color === 'orange' ? 'bg-brand-orange min-h-[300px] z-20 scale-105 shadow-brand-shadow-orange' : 
            'bg-brand-blue min-h-[260px] opacity-90 shadow-brand-shadow-blue'
        }`}
    >
        <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 blur-[60px] rounded-full" />
        <div className="text-center relative z-10 w-full mb-4">
            <span className={`text-[9px] font-black uppercase tracking-[0.4em] mb-4 block opacity-40`}>Rank 0{rank}</span>
            <div className="w-16 h-16 bg-white/15 backdrop-blur-md rounded-[1.2rem] mx-auto mb-6 flex items-center justify-center relative shadow-2xl border border-white/10">
                <span className="text-3xl">{icon}</span>
            </div>
            <h5 className="text-2xl font-black tracking-tighter leading-[0.9] mb-1">{name}</h5>
            <p className="text-[9px] uppercase font-black opacity-30 tracking-widest mt-1">Synaptic Legend</p>
        </div>
        <div className="text-center relative z-10 w-full bg-white/10 py-3 rounded-2xl border border-white/5 backdrop-blur-sm">
            <span className="text-2xl font-black tabular-nums tracking-tighter">{score.toLocaleString()}</span>
            <p className="text-[8px] uppercase font-black opacity-40 tracking-widest leading-none mt-1">Unified Points</p>
        </div>
    </motion.div>
);

const RankItem = ({ rank, name, score, delay = 0 }: any) => (
    <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay, duration: 0.6 }}
        whileHover={{ x: 8, backgroundColor: '#ffffff' }}
        className="flex items-center justify-between p-5 bg-white border border-black/5 rounded-[1.5rem] mb-3 group transition-all cursor-pointer shadow-sm hover:shadow-xl"
    >
        <div className="flex items-center gap-6">
            <div className="text-[12px] font-black text-neutral-300 tracking-widest w-8">0{rank}</div>
            <div className={`w-12 h-12 rounded-xl bg-neutral-50 border border-black/5 flex items-center justify-center font-black transition-all group-hover:bg-brand-orange group-hover:text-white group-hover:scale-110 shadow-inner`}>
                {name.charAt(0)}
            </div>
            <div>
                <p className="font-black text-lg tracking-tight leading-tight text-brand-text group-hover:text-brand-orange transition-colors">{name}</p>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mt-1">Logic Node Established</p>
            </div>
        </div>
        <div className="text-right">
            <span className="text-xl font-black tabular-nums tracking-tighter text-brand-text">{score.toLocaleString()}</span>
        </div>
    </motion.div>
);

export const Leaderboard: React.FC<Props> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto pt-32 px-6 pb-40 no-scrollbar selection:bg-brand-orange/20 font-sans relative z-10"
    >
      <div className="flex items-end justify-between mb-16 px-4">
        <div>
            <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Global Sync</span>
            <h2 className="text-6xl md:text-[5rem] font-black tracking-tighter leading-[0.85] uppercase text-brand-text">Unified<br/>Leaderboard<span className="text-brand-orange">.</span></h2>
            <p className="text-brand-text/30 font-black uppercase text-[10px] tracking-[0.4em] mt-6">Logic Looper | Cognitive Ranking Index</p>
        </div>
        <motion.button 
           whileHover={{ scale: 1.1, rotate: 90 }}
           whileTap={{ scale: 0.9 }}
           onClick={onBack}
           className="bg-white border border-black/5 w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-neutral-50 shadow-brand-shadow-blue/5 transition-all font-black text-brand-text shadow-xl"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </motion.button>
      </div>

      <div className="flex flex-col md:flex-row items-end gap-6 mb-20 px-4">
          <PodiumItem rank={2} name="Cipher Matrix" score={39500} color="blue" icon="⚡" />
          <PodiumItem rank={1} name="Neural Alpha" score={42000} color="orange" icon="🧠" />
          <PodiumItem rank={3} name="Glitch Node" score={37000} color="blue" icon="💎" />
      </div>

      <div className="max-w-3xl mx-auto space-y-4 px-4">
        <RankItem rank={4} name="Dwayne Johnson" score={32000} delay={0.6} />
        <RankItem rank={5} name="Eva Green" score={28500} delay={0.7} />
        <RankItem rank={6} name="Frank Underwood" score={21000} delay={0.8} />
      </div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 z-50">
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-brand-text rounded-[2rem] p-6 flex items-center justify-between text-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group cursor-pointer"
          >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange opacity-40 blur-3xl rounded-full" />
              <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center font-black text-2xl border border-white/5">42</div>
                  <div>
                      <p className="font-black text-xl tracking-tighter leading-none mb-1">YOU</p>
                      <span className="text-[10px] uppercase font-black opacity-30 tracking-[0.2em]">Rank Identifier</span>
                  </div>
              </div>
              <div className="text-right relative z-10">
                  <p className="text-3xl font-black tracking-tighter tabular-nums">1,240</p>
                  <p className="text-[9px] uppercase font-black text-brand-orange tracking-widest mt-1">Top 5% Global</p>
              </div>
          </motion.div>
      </div>
    </motion.div>
  );
};
