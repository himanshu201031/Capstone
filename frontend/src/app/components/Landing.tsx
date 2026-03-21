import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setStatus } from '../store/puzzleSlice';

const PuzzlePieceDecoration = ({ color, className, rotate = 0, delay = 0 }: any) => (
    <motion.div 
        initial={{ y: 0, opacity: 0 }}
        whileInView={{ opacity: 1 }}
        animate={{ 
            y: [0, -20, 0],
            rotate: [rotate, rotate + 15, rotate] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay }}
        className={`absolute hidden md:block w-36 h-36 ${className}`}
    >
        <svg viewBox="0 0 24 24" className={`w-full h-full ${
            color === 'orange' ? 'text-brand-orange' : 
            color === 'blue' ? 'text-brand-blue' : 
            color === 'pink' ? 'text-brand-pink' : 'text-brand-yellow'
        } fill-current drop-shadow-2xl z-0`}><path d="M20.5,11H19V7c0-1.1-0.9-2-2-2h-4V3.5C13,2.12,11.88,1,10.5,1S8,2.12,8,3.5V5H4C2.9,5,2,5.9,2,7v4h1.5c1.38,0,2.5,1.12,2.5,2.5S4.88,16,3.5,16H2v4c0,1.1,0.9,2,2,2h4v-1.5c0-1.38,1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5V22h4c1.1,0,2-0.9,2-2v-4h1.5c1.38,0,2.5-1.12,2.5-2.5S21.88,11,20.5,11z"/></svg>
    </motion.div>
);

const FeatureCard = ({ icon, title, desc, color, delay = 0 }: any) => (
    <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ delay, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -12, scale: 1.02 }}
        className="bg-white rounded-[3rem] p-10 border border-black/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] transform transition-transform group relative overflow-hidden"
    >
        <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-4xl mb-8 transition-transform group-hover:scale-110 shadow-lg ${
            color === 'orange' ? 'bg-brand-orange/10 text-brand-orange border border-brand-orange/10' : 
            color === 'blue' ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/10' : 
            'bg-brand-pink/10 text-brand-pink border border-brand-pink/10'
        }`}>
            {icon}
        </div>
        <h4 className="text-2xl font-black mb-4 leading-none tracking-tight text-brand-text">{title}</h4>
        <p className="text-sm font-medium text-brand-text/40 leading-relaxed">{desc}</p>
    </motion.div>
);

export const Landing: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center min-h-screen pt-40 pb-20 px-6 md:px-12 select-none no-scrollbar relative overflow-hidden bg-neutral-50 font-sans selection:bg-brand-orange/20">
      
      <PuzzlePieceDecoration color="blue" className="top-[10%] left-[-2%]" rotate={-15} />
      <PuzzlePieceDecoration color="orange" className="top-[35%] left-[5%]" rotate={20} delay={1} />
      <PuzzlePieceDecoration color="pink" className="top-[15%] right-[-1%]" rotate={30} delay={0.5} />
      <PuzzlePieceDecoration color="orange" className="top-[50%] right-[6%]" rotate={-20} delay={1.5} />

      {/* Hero Section */}
      <div className="w-full max-w-6xl flex flex-col items-center text-center relative z-10 px-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="bg-brand-orange/10 text-brand-orange px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-8 inline-block shadow-inner border border-brand-orange/10">Engine Phase Beta</span>
            
            <h1 className="text-[5.5rem] md:text-[10rem] font-black tracking-tighter leading-[0.85] text-brand-text mb-12 hover:tracking-[-0.05em] transition-all cursor-default scale-y-[1.05]">
                Capstone<span className="text-brand-orange">.</span>
            </h1>
            
            <div className="max-w-2xl mx-auto mb-16 px-4">
                <p className="text-2xl md:text-4xl font-black text-brand-text/60 leading-tight mb-6">
                    Spatial intelligence <br/>
                    <span className="text-brand-orange">synchronized in real-time</span>
                </p>
                <p className="text-base md:text-lg font-medium text-brand-text/30 leading-relaxed max-w-lg mx-auto italic">
                    Unlock neural potential through high-velocity procedural challenges.
                </p>
            </div>

            <div className="flex flex-col items-center gap-8">
                <motion.button 
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => dispatch(setStatus('auth'))}
                    className="bg-brand-orange text-white px-16 py-5 rounded-[1.5rem] font-black text-xl shadow-[0_20px_50px_-10px_rgba(255,92,0,0.4)] transition-all uppercase tracking-widest"
                >
                    Start Game
                </motion.button>
            </div>
          </motion.div>
      </div>

      {/* Feature Section */}
      <div className="mt-80 w-full grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl relative z-10 px-4">
          <FeatureCard icon="⚡" title="Neural Pulse" desc="Real-time calibration of spatial cognitive nodes." color="blue"/>
          <FeatureCard icon="🧬" title="Sync Logic" desc="Procedural puzzles engineered to amplify neural performance." color="orange" delay={0.2}/>
          <FeatureCard icon="💎" title="Prime Metrics" desc="Secure retrieval of your cognitive progression." color="pink" delay={0.4}/>
      </div>

      {/* Technical Integration Section */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2 }}
        className="mt-64 w-full max-w-7xl flex flex-col md:flex-row items-center gap-20 p-12 md:p-24 bg-white rounded-[4rem] border border-black/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden group z-10"
      >
          <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px]" />
          <div className="flex-[1.5] relative z-20">
              <span className="text-brand-orange font-black text-xs uppercase tracking-[0.5em] mb-6 block">Architecture</span>
              <h3 className="text-5xl md:text-[5.5rem] font-black tracking-tighter leading-[0.9] mb-12">Cognitive <br/>Integrity.</h3>
              <p className="text-brand-text/40 font-medium text-xl leading-relaxed max-w-md">Every puzzle node is uniquely generated to ensure peak friction.</p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-6 w-full relative z-20">
              {['SYNC', 'CORE', 'MODE', 'RANK'].map((txt, i) => (
                  <div key={txt} className="bg-neutral-50 p-10 rounded-[2.5rem] border border-black/5 flex flex-col items-center justify-center gap-4">
                      <span className="text-4xl">{['🔗', '🧩', '🚀', '⭐'][i]}</span>
                      <span className="text-[9px] font-black text-brand-text/30 tracking-[0.4em] uppercase">{txt}</span>
                  </div>
              ))}
          </div>
      </motion.div>

      {/* MODIFIED: Ready to Play Footer - DECREASED SIZE */}
      <motion.div 
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="mt-40 text-center w-full max-w-4xl px-8 py-16 bg-brand-text rounded-[3rem] text-white shadow-2xl relative overflow-hidden z-10 group"
      >
          <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-brand-orange opacity-20 rounded-full blur-[100px]" />
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-tight relative z-20">Start your <span className="text-brand-orange italic">Capstone</span> session.</h2>
          <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(setStatus('auth'))}
              className="px-12 py-4 rounded-xl bg-brand-orange text-white font-black text-lg shadow-xl uppercase tracking-widest relative z-20"
          >
              Start Now
          </motion.button>
      </motion.div>

      {/* Simple Footer Link Info */}
      <div className="mt-32 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between border-t border-black/5 pt-12 opacity-30 px-4">
          <p className="text-[10px] font-black uppercase tracking-widest">© 2026 Capstone Engine</p>
      </div>
    </div>
  );
};
