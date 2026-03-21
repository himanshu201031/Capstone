import React from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setStatus } from '../store/puzzleSlice';

const StatPill = ({ label, value, color, delay = 0 }: any) => (
    <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay }}
        className="bg-white border border-black/5 p-6 rounded-3xl flex-1 shadow-lg shadow-black/5"
    >
        <span className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.3em] mb-2 block">{label}</span>
        <span className={`text-3xl font-black tabular-nums tracking-tighter ${
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
            className={`w-3 h-3 md:w-4 md:h-4 rounded-[3px] ${bgOpacity} transition-all cursor-pointer border border-black/5`}
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
        <div className="max-w-7xl mx-auto pt-28 px-6 pb-20 no-scrollbar relative z-10">
            <header className="mb-12 flex flex-col md:flex-row items-end justify-between gap-8 px-4">
                <div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight uppercase text-brand-text">Performance<br/>Dashboard<span className="text-brand-orange">.</span></h2>
                    <p className="text-brand-text/20 font-bold uppercase text-[9px] tracking-[0.4em] mt-2">Capstone Elite | Synchronized Status</p>
                </div>
                
                <div className="flex gap-2">
                    <button className="bg-white border border-black/5 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-50 transition-all">Export Log</button>
                    <button className="bg-brand-orange text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-brand-shadow-orange hover:scale-105 transition-all">Boost Rating</button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                <StatPill label="Active Streak" value={`${streak}d`} color="orange" />
                <StatPill label="Global Rating" value={totalPoints} color="default" delay={0.1} />
                <StatPill label="Nodes Unified" value={historyCount} color="default" delay={0.2} />
                <StatPill label="Tier Protocol" value="Elite" color="orange" delay={0.3} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Heatmap Section */}
                <div className="lg:col-span-2 bg-white border border-black/5 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h4 className="text-xl font-black tracking-tighter leading-none mb-1">Activity Heatmap</h4>
                            <p className="text-[10px] font-black text-brand-text/20 uppercase tracking-widest">Year: 2026 Phase A</p>
                        </div>
                        <div className="flex gap-1">
                            {[0, 1, 2, 3].map(lvl => <ActivityBox key={lvl} level={lvl} />)}
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center py-4">
                        {heatmap.map((lvl, i) => (
                            <ActivityBox key={i} level={lvl} delay={i * 0.01} />
                        ))}
                    </div>
                </div>

                {/* Hero Play Card */}
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-brand-orange rounded-[2.5rem] p-8 flex flex-col justify-between text-white shadow-brand-shadow-orange group relative overflow-hidden cursor-pointer h-full"
                    onClick={() => dispatch(setStatus('playing'))}
                >
                    <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    <div>
                        <div className="bg-white text-brand-orange w-10 h-10 rounded-lg flex items-center justify-center mb-6 shadow-xl">
                            <span className="text-xl">🧩</span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] mb-4">Initialize <br/>Daily Matrix<span className="opacity-20">.</span></h3>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Sync Authorized</span>
                        <div className="w-8 h-8 border-2 border-white/20 rounded-full flex items-center justify-center font-black group-hover:bg-white group-hover:text-brand-orange transition-all">
                            →
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
