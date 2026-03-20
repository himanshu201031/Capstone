import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setStatus } from '../store/puzzleSlice';

const FeatureCard = ({ emoji, title, desc, color }: any) => (
    <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        whileHover={{ y: -10, rotate: 1, scale: 1.02 }}
        className={`${
            color === 'yellow' ? 'bg-brand-yellow text-black' : 
            color === 'cyan' ? 'bg-brand-cyan text-black' : 
            'bg-brand-lavender text-black'
        } rounded-5xl p-10 md:p-14 min-h-[320px] shadow-2xl flex flex-col justify-between transition-all group relative overflow-hidden`}
    >
        <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
        <div className="text-6xl mb-6 relative z-10">{emoji}</div>
        <div className="relative z-10">
            <h4 className="text-3xl font-black mb-3 leading-none tracking-tighter uppercase">{title}</h4>
            <p className="text-sm font-bold opacity-70 leading-relaxed max-w-[240px]">{desc}</p>
        </div>
    </motion.div>
);

export const Landing: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen relative flex flex-col items-center pt-40 px-6 md:px-20 pb-40 no-scrollbar overflow-x-hidden selection:bg-brand-cyan/30">
      
      {/* Hero Section - Decreased font size & Scroll Entrance */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-24 relative z-10">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 text-center md:text-left"
          >
            <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-brand-ruby/10 text-brand-ruby border border-brand-ruby/20 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-10 inline-block backdrop-blur-3xl shadow-xl shadow-brand-ruby/5"
            >
                Neural Training V2.0
            </motion.span>
            
            <h1 className="text-6xl md:text-[7rem] font-extrabold tracking-tighter leading-[0.85] text-white mb-10">
                MASTER THE<br/>DAILY<br/><span className="text-brand-yellow">UNKNOWN</span>
            </h1>
            
            <p className="text-neutral-400 text-lg md:text-xl font-medium max-w-2xl md:max-w-lg mx-auto md:mx-0 mb-14 leading-relaxed opacity-80">
                Unlock peak cognitive performance through the world's most immersive spatial memory engine. Integrated with advanced neural metrics.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center md:justify-start items-center">
                <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,255,255,0.15)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => dispatch(setStatus('auth'))}
                    className="w-full sm:w-auto bg-white text-black px-20 py-7 rounded-[2.5rem] font-black text-xl shadow-2xl transition-all"
                >
                    GET STARTED
                </motion.button>
                <div className="group cursor-pointer">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 group-hover:text-brand-cyan transition-colors">Learn Mechanics</span>
                    <div className="h-0.5 w-full bg-neutral-900 mt-1 overflow-hidden">
                        <motion.div initial={{ x: '-100%' }} whileHover={{ x: '0%' }} className="h-full bg-brand-cyan" />
                    </div>
                </div>
            </div>
          </motion.div>

          {/* Kinetic Decoration - Dynamic Pulse & Rotation */}
          <motion.div 
            initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="hidden md:flex flex-1 justify-center relative scale-110"
          >
               <div className="w-[550px] h-[550px] rounded-full border-[80px] border-white/5 relative flex items-center justify-center animate-spin-slow">
                   <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-[-40px] rounded-full border border-dashed border-white/10" />
                   <div className="absolute top-0 left-[225px] w-14 h-14 bg-brand-yellow rounded-[2rem] shadow-2xl shadow-brand-yellow/30 animate-pulse-slow" />
                   <div className="absolute bottom-0 right-[225px] w-14 h-14 bg-brand-ruby rounded-[2rem] shadow-2xl shadow-brand-ruby/30" />
                   <div className="absolute left-0 top-[225px] w-14 h-14 bg-brand-cyan rounded-[2rem] shadow-2xl shadow-brand-cyan/30" />
               </div>
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity }} className="text-[15rem] filter blur-xl opacity-10 select-none">💠</motion.div>
               </div>
          </motion.div>
      </div>

      {/* Feature Section with Invis-View Animations */}
      <div className="mt-60 w-full grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl">
          <FeatureCard 
              emoji="⚡" 
              title="Hyper Pulse" 
              desc="Rapid-fire memory nodes that adapt to your unique neural response speed in real-time." 
              color="lavender"
          />
          <FeatureCard 
              emoji="🕹️" 
              title="Matrix Sync" 
              desc="Universal progress synchronization via identity-linked cloud matrices. Play anywhere." 
              color="yellow"
          />
          <FeatureCard 
              emoji="💎" 
              title="Vault Elite" 
              desc="Exclusive rank-tier challenges. Only the top 5% of global minds unlock the Vault." 
              color="cyan"
          />
      </div>

      {/* New Tech Section - High Energy UI */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-60 w-full max-w-7xl flex flex-col md:flex-row items-center gap-32 p-16 md:p-24 bg-neutral-900/60 rounded-[5rem] border border-white/5 shadow-2xl backdrop-blur-3xl relative overflow-hidden"
      >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-30" />
          
          <div className="flex-1">
              <span className="text-brand-cyan font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">Neural Integrity</span>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-10">THE CORE OF<br/>PRECISION.</h3>
              <p className="text-neutral-500 font-bold leading-relaxed max-w-sm mb-12">Our algorithm ensures every daily matrix is unique, untraceable, and mathematically balanced for peak training.</p>
              <div className="flex gap-4">
                  <div className="w-4 h-4 rounded-full bg-brand-cyan animate-pulse" />
                  <div className="w-4 h-4 rounded-full bg-brand-yellow" />
                  <div className="w-4 h-4 rounded-full bg-brand-ruby" />
              </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-6 w-full">
              {[1,2,3,4].map(i => (
                  <motion.div key={i} whileHover={{ y: -5 }} className="bg-white/5 p-8 rounded-4xl border border-white/5 flex items-center justify-center text-3xl opacity-50 hover:opacity-100 transition-opacity">
                      {['🔗', '📡', '🛡️', '🛰️'][i-1]}
                  </motion.div>
              ))}
          </div>
      </motion.div>

      {/* Enhanced Footer */}
      <motion.div 
         initial={{ opacity: 0, scale: 0.9 }}
         whileInView={{ opacity: 1, scale: 1 }}
         transition={{ duration: 1 }}
         className="mt-60 text-center w-full max-w-5xl px-10 py-24 bg-gradient-to-b from-neutral-900/80 to-transparent rounded-[6rem] border-t border-white/10"
      >
          <h5 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 leading-none uppercase">Join the Matrix<br/><span className="text-brand-cyan italic">Initiative</span></h5>
          <button 
              onClick={() => dispatch(setStatus('auth'))}
              className="px-20 py-8 rounded-[3rem] bg-brand-lavender text-black font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_30px_60px_rgba(193,153,255,0.3)]"
          >
              Create Identity
          </button>
          <div className="mt-20 flex justify-center gap-16">
              {['Security', 'Privacy', 'Compliance', 'Metrics'].map(txt => (
                  <span key={txt} className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em]">{txt}</span>
              ))}
          </div>
      </motion.div>
    </div>
  );
};
