import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setStatus } from '../store/puzzleSlice';

const PuzzlePieceDecoration = ({ color, className, rotate = 0, delay = 0 }: any) => (
    <motion.div 
        animate={{ 
            y: [0, -15, 0],
            rotate: [rotate, rotate + 10, rotate] 
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
        className={`absolute hidden md:block w-32 h-32 ${className}`}
    >
        <svg viewBox="0 0 24 24" className={`w-full h-full ${
            color === 'orange' ? 'text-brand-orange' : 
            color === 'blue' ? 'text-brand-blue' : 
            color === 'pink' ? 'text-brand-pink' : 'text-brand-yellow'
        } fill-current drop-shadow-xl`}><path d="M20.5,11H19V7c0-1.1-0.9-2-2-2h-4V3.5C13,2.12,11.88,1,10.5,1S8,2.12,8,3.5V5H4C2.9,5,2,5.9,2,7v4h1.5c1.38,0,2.5,1.12,2.5,2.5S4.88,16,3.5,16H2v4c0,1.1,0.9,2,2,2h4v-1.5c0-1.38,1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5V22h4c1.1,0,2-0.9,2-2v-4h1.5c1.38,0,2.5-1.12,2.5-2.5S21.88,11,20.5,11z"/></svg>
    </motion.div>
);

const FeatureCard = ({ icon, title, desc, color, delay = 0 }: any) => (
    <motion.div 
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8 }}
        whileHover={{ y: -5 }}
        className="bg-white rounded-[2rem] p-8 border border-black/5 shadow-xl transition-all group relative overflow-hidden"
    >
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg ${
            color === 'orange' ? 'bg-brand-orange/10 text-brand-orange' : 
            color === 'blue' ? 'bg-brand-blue/10 text-brand-blue' : 
            'bg-brand-pink/10 text-brand-pink'
        }`}>
            {icon}
        </div>
        <h4 className="text-xl font-black mb-3 leading-none tracking-tight text-brand-text">{title}</h4>
        <p className="text-sm font-medium text-brand-text/50 leading-relaxed">{desc}</p>
    </motion.div>
);

export const Landing: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center min-h-screen pt-32 pb-20 px-6 md:px-12 select-none no-scrollbar relative overflow-hidden selection:bg-brand-orange/20">
      
      {/* Decorative Puzzle Pieces - Reference Layout */}
      <PuzzlePieceDecoration color="blue" className="top-[15%] left-[2%]" rotate={-20} />
      <PuzzlePieceDecoration color="orange" className="top-[40%] left-[8%]" rotate={15} delay={1} />
      <PuzzlePieceDecoration color="yellow" className="bottom-[15%] left-[4%]" rotate={-10} delay={2} />

      <PuzzlePieceDecoration color="pink" className="top-[20%] right-[3%]" rotate={25} delay={0.5} />
      <PuzzlePieceDecoration color="orange" className="top-[55%] right-[10%]" rotate={-15} delay={1.5} />
      <PuzzlePieceDecoration color="blue" className="bottom-[20%] right-[5%]" rotate={10} delay={2.5} />

      {/* Hero Section - Reference: puzzle title style */}
      <div className="w-full max-w-4xl flex flex-col items-center text-center relative z-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-[8.5rem] font-black tracking-tighter leading-none text-brand-text mb-8">
                puzzle.
            </h1>
            
            <div className="max-w-xl mx-auto mb-10">
                <p className="text-xl md:text-3xl font-black text-brand-text/80 leading-tight mb-4">
                    Get an amazing new <br/>
                    <span className="text-brand-orange">play game experience</span>
                </p>
                <p className="text-sm md:text-base font-medium text-brand-text/40 leading-relaxed max-w-md mx-auto">
                    Cognitive training re-imagined through vibrant spatial puzzles. Synchronize your brain nodes in a world of color and logic.
                </p>
            </div>

            <div className="flex flex-col items-center gap-6">
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => dispatch(setStatus('auth'))}
                    className="bg-brand-orange text-white px-12 py-4 rounded-2xl font-black text-lg shadow-brand-shadow-orange transition-all uppercase tracking-widest"
                >
                    Play Now
                </motion.button>
                <div className="flex items-center gap-1 opacity-40">
                    <span className="text-[10px] font-black tracking-widest text-brand-text uppercase">Scroll to learn more</span>
                    <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
            </div>
          </motion.div>
      </div>

      {/* Feature Section with Premium Cards */}
      <div className="mt-64 w-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl relative z-10">
          <FeatureCard 
              icon="⚡" 
              title="Neural Pulse" 
              desc="Experience real-time calibration of spatial cognitive nodes in our high-energy matrix." 
              color="blue"
          />
          <FeatureCard 
              icon="🧩" 
              title="Sync Logic" 
              desc="Dynamic procedural puzzles engineered to amplify neural plastic performance." 
              color="orange"
              delay={0.2}
          />
          <FeatureCard 
              icon="💎" 
              title="Master Archive" 
              desc="Secure retrieval of your cognitive progression and global rank metrics." 
              color="pink"
              delay={0.4}
          />
      </div>

      {/* Technical Integration Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-40 w-full max-w-6xl flex flex-col md:flex-row items-center gap-12 p-10 md:p-16 bg-white rounded-[3rem] border border-black/5 shadow-2xl relative overflow-hidden group z-10"
      >
          <div className="absolute top-0 right-[-10%] w-64 h-64 bg-brand-orange/5 rounded-full blur-[100px]" />
          
          <div className="flex-[1.5]">
              <span className="text-brand-orange font-black text-xs uppercase tracking-[0.4em] mb-4 block">Engine Core</span>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8">Spatial Integrity<br/><span className="text-brand-text/30">By Design.</span></h3>
              <p className="text-brand-text/50 font-medium text-lg leading-relaxed max-w-md">Every puzzle matrix is procedurally generated to ensure zero predictive bias and peak cognitive friction.</p>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
              {['SYNC', 'CORE', 'MODE', 'RANK'].map((txt, i) => (
                  <div 
                    key={txt} 
                    className="bg-neutral-50 p-8 rounded-3xl border border-black/5 flex flex-col items-center justify-center gap-3 transition-all hover:bg-white hover:shadow-lg group/box"
                  >
                      <span className="text-3xl filter grayscale group-hover/box:grayscale-0 transition-all">{['🔗', '🧩', '🚀', '⭐'][i]}</span>
                      <span className="text-[10px] font-black text-brand-text/40 tracking-widest uppercase">{txt}</span>
                  </div>
              ))}
          </div>
      </motion.div>

      {/* Ready to Play Footer */}
      <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         whileInView={{ opacity: 1, scale: 1 }}
         className="mt-40 text-center w-full max-w-5xl px-8 py-24 bg-brand-text rounded-[3.5rem] text-white shadow-3xl relative overflow-hidden z-10"
      >
          <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-brand-orange opacity-20 rounded-full blur-[120px]" />
          <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-brand-blue opacity-10 rounded-full blur-[100px]" />
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 leading-none">Ready to start <br/>your <span className="text-brand-orange italic">puzzle</span> session?</h2>
          
          <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(setStatus('auth'))}
              className="px-12 py-4 rounded-xl bg-brand-orange text-white font-black text-lg shadow-xl uppercase tracking-widest"
          >
              Get Started Now
          </motion.button>
      </motion.div>
    </div>
  );
};
