import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '../store/puzzleSlice';
import { RootState } from '../store';

const FeatureCard = ({ emoji, title, desc, color }: any) => (
    <motion.div 
        whileHover={{ y: -10, rotate: 1 }}
        className={`${color === 'yellow' ? 'bg-brand-yellow' : 'bg-brand-lavender'} rounded-5xl p-8 md:p-12 text-black min-h-[280px] shadow-2xl flex flex-col justify-between transition-shadow hover:shadow-brand-yellow/10`}
    >
        <div className="text-5xl">{emoji}</div>
        <div>
            <h4 className="text-3xl font-black mb-1 leading-none tracking-tighter">{title}</h4>
            <p className="text-sm md:text-base font-bold opacity-70 leading-tight">{desc}</p>
        </div>
    </motion.div>
);

export const Landing: React.FC = () => {
  const dispatch = useDispatch();
  const date = useSelector((state: RootState) => state.puzzle.date);

  return (
    <div className="min-h-screen relative flex flex-col items-center pt-32 px-6 md:px-20 pb-32 no-scrollbar overflow-x-hidden">
      {/* Hero Section - Optimized for Desktop/Mobile Grid */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-20">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <span className="bg-brand-lavender/10 text-brand-lavender border border-brand-lavender/20 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-8 inline-block">
                The Mind Game Platform
            </span>
            <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.85] text-white mb-10">
                MATCH<br/>THE<br/><span className="text-brand-yellow">UNKNOWN</span>
            </h1>
            <p className="text-neutral-400 text-lg md:text-2xl font-medium max-w-2xl md:max-w-xl mx-auto md:mx-0 mb-12 leading-relaxed">
                A high-speed logic and memory experience designed for those who seek perfection. Train daily and climb the global rankings.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start items-center">
                <button 
                    onClick={() => dispatch(setStatus('idle'))}
                    className="w-full sm:w-auto bg-white text-black px-16 py-6 rounded-3xl font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl hover:shadow-brand-yellow/20"
                >
                    Play Now
                </button>
                <div className="flex flex-col items-start gap-1">
                    <span className="text-brand-yellow font-black text-sm uppercase tracking-widest ml-1">Today's Seed</span>
                    <span className="bg-neutral-900 px-4 py-2 rounded-xl text-xs font-mono text-neutral-500 border border-white/5">{date.toUpperCase()}</span>
                </div>
            </div>
          </motion.div>

          {/* Interactive Decoration for Desktop */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="hidden md:flex flex-1 justify-center relative"
          >
               <div className="w-[500px] h-[500px] rounded-full border-[60px] border-white/5 relative flex items-center justify-center animate-spin-slow">
                   <div className="absolute top-0 left-[200px] w-12 h-12 bg-brand-yellow rounded-2xl shadow-xl shadow-brand-yellow/20" />
                   <div className="absolute bottom-0 right-[200px] w-12 h-12 bg-brand-lavender rounded-2xl shadow-xl shadow-brand-lavender/20" />
               </div>
               <div className="absolute inset-0 flex items-center justify-center">
                   <div className="text-[12rem] filter blur-lg opacity-20 pointer-events-none select-none">🧩</div>
               </div>
          </motion.div>
      </div>

      {/* Responsive Features Grid */}
      <div className="mt-40 w-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl">
          <FeatureCard 
              emoji="🧠" 
              title="Memory Matrix" 
              desc="Improve spatial awareness and rapid-fire recall with our daily-changing emoji puzzles." 
              color="lavender"
          />
          <FeatureCard 
              emoji="🔥" 
              title="Global Fire" 
              desc="Compete in real-time across the world. Only the consistent stay on the leaderboard." 
              color="yellow"
          />
          <FeatureCard 
              emoji="☁️" 
              title="Secure Sync" 
              desc="Automatic background synchronization. Your progress is identity-linked and cross-platform." 
              color="lavender"
          />
      </div>

      {/* Footer Branding */}
      <motion.div 
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         className="mt-60 text-center w-full max-w-4xl px-10 py-20 bg-neutral-900/40 rounded-[4rem] border border-white/5 backdrop-blur-3xl"
      >
          <h5 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-none">READY TO CHALLENGE<br/>YOUR LIMITS?</h5>
          <button 
              onClick={() => dispatch(setStatus('auth'))}
              className="px-12 py-5 rounded-3xl bg-brand-lavender text-black font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
              Get Started for Free
          </button>
          <p className="mt-12 text-neutral-500 font-black uppercase text-[10px] tracking-[0.4em] inline-flex items-center gap-4">
              <span className="w-8 h-px bg-neutral-800" />
              Capstone 2026 Edition
              <span className="w-8 h-px bg-neutral-800" />
          </p>
      </motion.div>
    </div>
  );
};
