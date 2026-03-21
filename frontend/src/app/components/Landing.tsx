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
        
        <div className="absolute bottom-[-20px] right-[-20px] w-24 h-24 bg-neutral-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
);

export const Landing: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center min-h-screen pt-40 pb-20 px-6 md:px-12 select-none no-scrollbar relative overflow-hidden bg-neutral-50 font-sans selection:bg-brand-orange/20">
      
      {/* Decorative Puzzle Pieces with parallax feel */}
      <PuzzlePieceDecoration color="blue" className="top-[10%] left-[-2%]" rotate={-15} />
      <PuzzlePieceDecoration color="orange" className="top-[35%] left-[5%]" rotate={20} delay={1} />
      <PuzzlePieceDecoration color="yellow" className="bottom-[10%] left-[2%]" rotate={-25} delay={2} />

      <PuzzlePieceDecoration color="pink" className="top-[15%] right-[-1%]" rotate={30} delay={0.5} />
      <PuzzlePieceDecoration color="orange" className="top-[50%] right-[6%]" rotate={-20} delay={1.5} />
      <PuzzlePieceDecoration color="blue" className="bottom-[15%] right-[1%]" rotate={15} delay={2.5} />

      {/* Hero Section */}
      <div className="w-full max-w-6xl flex flex-col items-center text-center relative z-10 px-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="bg-brand-orange/10 text-brand-orange px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-8 inline-block shadow-inner border border-brand-orange/10">Engine Phase Beta</span>
            
            <h1 className="text-[5.5rem] md:text-[10rem] font-black tracking-tighter leading-[0.85] text-brand-text mb-12 hover:tracking-[-0.05em] transition-all cursor-default scale-y-[1.05]">
                logic looper<span className="text-brand-orange">.</span>
            </h1>
            
            <div className="max-w-2xl mx-auto mb-16 px-4">
                <p className="text-2xl md:text-4xl font-black text-brand-text/60 leading-tight mb-6">
                    Spatial intelligence <br/>
                    <span className="text-brand-orange">synchronized in real-time</span>
                </p>
                <p className="text-base md:text-lg font-medium text-brand-text/30 leading-relaxed max-w-lg mx-auto italic">
                    Unlock neural potential through high-velocity procedural challenges. Engineered for cognitive athletes.
                </p>
            </div>

            <div className="flex flex-col items-center gap-8">
                <motion.button 
                    whileHover={{ scale: 1.05, y: -4, rotate: [0, 1, -1, 0] }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => dispatch(setStatus('auth'))}
                    className="bg-brand-orange text-white px-16 py-5 rounded-[1.5rem] font-black text-xl shadow-[0_20px_50px_-10px_rgba(255,92,0,0.4)] transition-all uppercase tracking-widest relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                    <span className="relative z-10">Initialize Sync</span>
                </motion.button>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 2 }}
                  className="flex items-center gap-3"
                >
                    <span className="text-[10px] font-black tracking-[0.4em] text-brand-text uppercase">Explore Mesh</span>
                    <div className="w-1 h-1 rounded-full bg-brand-orange animate-ping" />
                </motion.div>
            </div>
          </motion.div>
      </div>

      {/* Feature Section */}
      <div className="mt-80 w-full grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl relative z-10 px-4">
          <FeatureCard 
              icon="⚡" 
              title="Neural Pulse" 
              desc="Real-time calibration of spatial cognitive nodes in our high-energy matrix. Precise. Pure." 
              color="blue"
          />
          <FeatureCard 
              icon="🧬" 
              title="Sync Logic" 
              desc="Procedural puzzles engineered to amplify neural plastic performance and pattern recognition." 
              color="orange"
              delay={0.2}
          />
          <FeatureCard 
              icon="💎" 
              title="Prime Metrics" 
              desc="Secure retrieval of your cognitive progression and global rank metrics with blockchain integrity." 
              color="pink"
              delay={0.4}
          />
      </div>

      {/* Technical Integration Section */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2 }}
        className="mt-64 w-full max-w-7xl flex flex-col md:flex-row items-center gap-20 p-12 md:p-24 bg-white rounded-[4rem] border border-black/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden group z-10"
      >
          <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] group-hover:bg-brand-blue/5 transition-colors duration-1000" />
          
          <div className="flex-[1.5] relative z-20">
              <span className="text-brand-orange font-black text-xs uppercase tracking-[0.5em] mb-6 block">Architecture</span>
              <h3 className="text-5xl md:text-[5.5rem] font-black tracking-tighter leading-[0.9] mb-12">Cognitive <br/>Integrity.<br/><span className="text-brand-text/10 italic">Logic Mesh.</span></h3>
              <p className="text-brand-text/40 font-medium text-xl leading-relaxed max-w-md mb-8">Every puzzle node is uniquely generated to ensure zero predictive bias and peak neurological friction.</p>
              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-brand-orange font-black text-xs uppercase tracking-widest cursor-pointer"
              >
                  Read Whitepaper <span>→</span>
              </motion.div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-6 w-full relative z-20">
              {['SYNC', 'CORE', 'MODE', 'RANK'].map((txt, i) => (
                  <motion.div 
                    key={txt} 
                    whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,1)', shadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                    className="bg-neutral-50 p-10 rounded-[2.5rem] border border-black/5 flex flex-col items-center justify-center gap-4 transition-all"
                  >
                      <span className="text-4xl">{['🔗', '🧩', '🚀', '⭐'][i]}</span>
                      <span className="text-[9px] font-black text-brand-text/30 tracking-[0.4em] uppercase">{txt}</span>
                  </motion.div>
              ))}
          </div>
      </motion.div>

      {/* Social Proof Section (New) */}
      <motion.div 
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         className="mt-64 w-full max-w-4xl text-center z-10"
      >
          <p className="text-[10px] font-black text-brand-text/20 uppercase tracking-[0.5em] mb-12">Synchronized with 4,000+ Brains Daily</p>
          <div className="flex justify-center gap-20 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             <span className="text-2xl font-black italic">MIND.CORE</span>
             <span className="text-2xl font-black italic">TECH.SOL</span>
             <span className="text-2xl font-black italic">NEURO.GEN</span>
          </div>
      </motion.div>

      {/* Ready to Play Footer */}
      <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true }}
         className="mt-64 text-center w-full max-w-6xl px-8 py-32 bg-brand-text rounded-[4rem] text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden z-10 group"
      >
          <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-brand-orange opacity-10 rounded-full blur-[150px] group-hover:opacity-20 transition-opacity duration-700" />
          <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-brand-blue opacity-10 rounded-full blur-[100px]" />
          
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-16 leading-[0.9] relative z-20">Start your <br/><span className="text-brand-orange italic">Logic Looper</span> session.</h2>
          
          <motion.button 
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(setStatus('auth'))}
              className="px-20 py-6 rounded-[1.2rem] bg-brand-orange text-white font-black text-2xl shadow-brand-shadow-orange uppercase tracking-widest relative z-20"
          >
              Sync Now
          </motion.button>
      </motion.div>

      {/* Simple Footer Link Info */}
      <div className="mt-32 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between border-t border-black/5 pt-12 opacity-30 px-4">
          <p className="text-[10px] font-black uppercase tracking-widest">© 2026 Logic Looper Engine</p>
          <div className="flex gap-8">
              {['Privacy', 'Protocol', 'Contact'].map(l => <span key={l} className="text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-brand-orange transition-colors">{l}</span>)}
          </div>
      </div>
    </div>
  );
};
