import React from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setStatus } from '../store/puzzleSlice';

const StatPill = ({ label, value, color, delay = 0 }: any) => (
    <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="bg-white border border-black/5 p-8 rounded-[2rem] flex-1 shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] transform transition-transform group relative overflow-hidden"
    >
        <div className="absolute top-[-10px] right-[-10px] w-16 h-16 bg-neutral-50 rounded-full blur-2xl group-hover:bg-brand-orange/5 transition-colors" />
        <span className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.3em] mb-3 block relative z-10">{label}</span>
        <span className={`text-4xl font-black tabular-nums tracking-tighter relative z-10 ${
            color === 'orange' ? 'text-brand-orange' : 'text-brand-text'
        }`}>{value}</span>
    </motion.div>
);

const ActivityBox = ({ level, delay }: any) => {
    const bgOpacity = level === 0 ? 'bg-neutral-100' : level === 1 ? 'bg-brand-orange/20' : level === 2 ? 'bg-brand-orange/50' : 'bg-brand-orange';
    return (
        <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ scale: 1.2 }}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-[4px] ${bgOpacity} transition-all cursor-crosshair border border-black/5 flex-shrink-0 hover:shadow-lg`}
        />
    );
};

export const Home: React.FC = () => {
    const dispatch = useDispatch();
    const streak = useSelector((state: RootState) => state.user.streak);
    const totalPoints = useSelector((state: RootState) => state.user.totalPoints);
    const historyCount = Object.keys(useSelector((state: RootState) => state.user.history)).length;

    // Mock heatmap data
    const heatmap = Array.from({ length: 42 }).map(() => Math.floor(Math.random() * 4));

    return (
        <div className="max-w-7xl mx-auto pt-32 px-6 pb-20 no-scrollbar relative z-10 font-sans">
            <header className="mb-16 flex flex-col md:flex-row items-end justify-between gap-12 px-4 relative z-20">
                <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase text-brand-text mb-4">Performance <br/>Hub<span className="text-brand-orange italic">.</span></h2>
                    <p className="text-brand-text/20 font-black uppercase text-[10px] tracking-[0.4em] mt-2">Logic Looper | Synchronized Network</p>
                </motion.div>
                
                <motion.div 
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="flex gap-4"
                >
                    <button className="bg-white border border-black/5 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-50 hover:shadow-lg active:scale-95 transition-all shadow-sm">Export Log</button>
                    <button className="bg-brand-orange text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-brand-shadow-orange hover:scale-105 active:scale-95 transition-all">Boost Rating</button>
                </motion.div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-2">
                <StatPill label="Active Streak" value={`${streak}D`} color="orange" />
                <StatPill label="Global Rating" value={totalPoints} color="default" delay={0.1} />
                <StatPill label="Nodes Unified" value={historyCount} color="default" delay={0.2} />
                <StatPill label="Tier Protocol" value="Elite" color="orange" delay={0.3} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
                {/* Heatmap Section */}
                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-2 bg-white border border-black/5 p-10 rounded-[3rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden group min-h-[400px]"
                >
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h4 className="text-3xl font-black tracking-tighter leading-none mb-2">Activity Heatmap</h4>
                            <p className="text-[10px] font-black text-brand-text/20 uppercase tracking-[0.5em]">Phase A Transmission History</p>
                        </div>
                        <div className="flex gap-1.5 p-2 bg-neutral-50 rounded-xl border border-black/5 shadow-inner">
                            {[0, 1, 2, 3].map(lvl => <ActivityBox key={lvl} level={lvl} />)}
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 md:gap-3 justify-center py-6 mt-8 relative z-20">
                        {heatmap.map((lvl, i) => (
                            <ActivityBox key={i} level={lvl} delay={i * 0.01} />
                        ))}
                    </div>

                    <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-brand-blue/5 transition-colors duration-1000" />
                </motion.div>

                {/* Hero Play Card */}
                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-brand-orange rounded-[3rem] p-10 flex flex-col justify-between text-white shadow-brand-shadow-orange group relative overflow-hidden cursor-pointer h-full"
                    onClick={() => dispatch(setStatus('playing'))}
                >
                    <div className="absolute top-[-30px] right-[-30px] w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-brand-blue/20 rounded-full blur-2xl group-hover:opacity-100 opacity-0 transition-opacity" />
                    
                    <div>
                        <div className="bg-white text-brand-orange w-12 h-12 rounded-[1rem] flex items-center justify-center mb-8 shadow-2xl group-hover:rotate-[360deg] transition-all duration-700">
                            <span className="text-2xl">🧩</span>
                        </div>
                        <h3 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.8] mb-6">Initialize <br/>Daily Matrix<span className="opacity-10 italic">.</span></h3>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Synaptic calibration active</p>
                    </div>

                    <div className="flex items-center justify-between mt-12 bg-white/10 backdrop-blur-md p-4 px-6 rounded-2xl border border-white/10">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Ready to sync</span>
                        <div className="w-10 h-10 border-2 border-white/20 rounded-full flex items-center justify-center font-black group-hover:bg-white group-hover:text-brand-orange transition-all duration-300">
                            →
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
