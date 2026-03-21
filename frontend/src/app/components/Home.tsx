import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setStatus } from '../store/puzzleSlice';
import { updateProfile } from '../store/userSlice';
import { Achievements } from './Achievements';

const PuzzlePieceDecoration = ({ color, className, rotate = 0, delay = 0, size = 36 }: any) => (
    <motion.div 
        initial={{ y: 0, opacity: 0 }}
        animate={{ 
            y: [0, -15, 0],
            rotate: [rotate, rotate + 10, rotate],
            opacity: [0, 0.4, 0]
        }}
        transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
        className={`absolute hidden md:block ${className}`}
        style={{ width: size, height: size }}
    >
        <svg viewBox="0 0 24 24" className={`w-full h-full ${
            color === 'orange' ? 'text-brand-orange' : 
            color === 'blue' ? 'text-brand-blue' : 'text-brand-pink'
        } fill-current drop-shadow-lg opacity-20`}><path d="M20.5,11H19V7c0-1.1-0.9-2-2-2h-4V3.5C13,2.12,11.88,1,10.5,1S8,2.12,8,3.5V5H4C2.9,5,2,5.9,2,7v4h1.5c1.38,0,2.5,1.12,2.5,2.5S4.88,16,3.5,16H2v4c0,1.1,0.9,2,2,2h4v-1.5c0-1.38,1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5V22h4c1.1,0,2-0.9,2-2v-4h1.5c1.38,0,2.5-1.12,2.5-2.5S21.88,11,20.5,11z"/></svg>
    </motion.div>
);

const StatPill = ({ label, value, color, delay = 0, trend }: any) => (
    <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -5 }}
        className="bg-white border border-black/5 p-8 rounded-[2rem] flex-1 shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] relative group overflow-hidden"
    >
        <div className="absolute top-[-10px] right-[-10px] w-16 h-16 bg-neutral-50 rounded-full blur-2xl group-hover:bg-brand-orange/5 transition-colors" />
        <div className="flex justify-between items-start mb-3 relative z-10">
            <span className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.3em] block">{label}</span>
            {trend && <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">{trend}</span>}
        </div>
        <span className={`text-4xl font-black tabular-nums tracking-tighter relative z-10 ${
            color === 'orange' ? 'text-brand-orange' : 'text-brand-text'
        }`}>{value}</span>
    </motion.div>
);

const ActivityBox = ({ level, delay, day }: any) => {
    // GitHub-style coloring
    const bgClass = level === 0 ? 'bg-neutral-100' : level === 1 ? 'bg-[#9be9a8]' : level === 2 ? 'bg-[#40c463]' : level === 3 ? 'bg-[#30a14e]' : 'bg-[#216e39]';
    return (
        <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay, duration: 0.3 }}
            whileHover={{ scale: 1.2, zIndex: 10 }}
            className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-sm ${bgClass} transition-all cursor-pointer border border-black/5`}
            title={`Day ${day}: ${level} contributions`}
        />
    );
};

export const Home: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [showProfileConfig, setShowProfileConfig] = useState(false);
    
    const availableIcons = ['⚡', '🧠', '🛡️', '💎', '🚀', '⭐', '🧩', '🔥', '🌀', '⚔️'];
    
    // Generate 52 weeks of data (GitHub style) - 7x52 = 364
    const heatmap = Array.from({ length: 364 }).map((_, i) => ({ 
        lvl: Math.floor(Math.random() * 5), 
        day: i + 1 
    }));

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return (
        <div className="max-w-7xl mx-auto pt-32 px-6 pb-20 no-scrollbar relative overflow-hidden font-sans selection:bg-brand-orange/20">
            
            <PuzzlePieceDecoration color="orange" className="top-40 left-10" rotate={10} delay={1} size={48} />
            <PuzzlePieceDecoration color="blue" className="top-80 right-20" rotate={-15} delay={2} size={32} />
            <PuzzlePieceDecoration color="pink" className="bottom-40 left-1/4" rotate={25} delay={3} size={40} />

            <header className="mb-16 flex flex-col md:flex-row items-end justify-between gap-12 px-2 relative z-20">
                <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                >
                    <div className="flex items-center gap-5 mb-6">
                        <motion.div 
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 1, ease: "anticipate" }}
                            onClick={() => setShowProfileConfig(true)}
                            className="w-20 h-20 bg-white border border-black/5 rounded-[2rem] shadow-2xl flex items-center justify-center text-4xl cursor-pointer hover:border-brand-orange transition-all relative group"
                        >
                            <div className="absolute inset-0 bg-brand-orange/5 rounded-[2rem] scale-0 group-hover:scale-100 transition-transform" />
                            <span className="relative z-10">{user.profileIcon}</span>
                        </motion.div>
                        <div className="text-left">
                            <h2 className="text-5xl font-black tracking-tighter leading-none mb-2 text-brand-text truncate max-w-[250px]">{user.name}</h2>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">Alpha Protocol 1.7.4</span>
                                <div className="h-1 w-1 bg-brand-orange rounded-full animate-pulse" />
                            </div>
                        </div>
                    </div>
                </motion.div>
                
                <motion.div className="flex gap-4">
                    <button className="bg-white border border-black/5 px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-50 shadow-sm transition-all border-b-4 border-b-neutral-100">System Logs</button>
                    <button 
                        onClick={() => dispatch(setStatus('playing'))}
                        className="bg-brand-orange text-white px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-brand-shadow-orange hover:scale-105 active:scale-95 transition-all border-b-4 border-b-black/10"
                    >
                        Start
                    </button>
                </motion.div>
            </header>

            <AnimatePresence>
                {showProfileConfig && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xl z-[100] flex items-center justify-center p-6"
                        onClick={() => setShowProfileConfig(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-[4rem] p-12 w-full max-w-md shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 blur-3xl rounded-full" />
                            <h4 className="text-4xl font-black tracking-tighter mb-10 italic">Avatar Selector<span className="text-brand-orange">.</span></h4>
                            <div className="grid grid-cols-5 gap-4 mb-12">
                                {availableIcons.map(icon => (
                                    <button 
                                        key={icon}
                                        onClick={() => {
                                            dispatch(updateProfile({ icon }));
                                            setShowProfileConfig(false);
                                        }}
                                        className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-2xl transition-all ${
                                            user.profileIcon === icon ? 'bg-brand-orange border-brand-orange text-white shadow-brand-shadow-orange' : 'bg-neutral-50 border-black/5 hover:border-brand-orange hover:bg-white'
                                        }`}
                                    >
                                        {icon}
                                    </button>
                                ))}
                            </div>
                            <button 
                                onClick={() => setShowProfileConfig(false)}
                                className="w-full bg-brand-text text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl"
                            >Close Matrix</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-2 relative z-10">
                <StatPill label="Sync Streak" value={`${user.streak}D`} color="orange" trend="+1D" />
                <StatPill label="Neuro Rank" value={user.totalPoints.toLocaleString()} color="default" delay={0.1} trend="+420" />
                <StatPill label="History Nodes" value={Object.keys(user.history).length} color="default" delay={0.2} />
                <StatPill label="Global Index" value="TOP 4%" color="orange" delay={0.3} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-2 relative z-10 mb-20">
                {/* GitHub Style Heatmap Section */}
                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="lg:col-span-12 bg-white border border-black/5 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group"
                >
                    <div className="flex justify-between items-center mb-10 px-4">
                        <h4 className="text-3xl font-black tracking-tighter italic">Puzzle Persistence<span className="text-emerald-500">.</span></h4>
                        <div className="flex items-center gap-2">
                             <span className="text-[10px] font-black uppercase text-brand-text/30 mr-2">Less</span>
                             <div className="w-3 h-3 bg-neutral-100 rounded-sm" />
                             <div className="w-3 h-3 bg-[#9be9a8] rounded-sm" />
                             <div className="w-3 h-3 bg-[#40c463] rounded-sm" />
                             <div className="w-3 h-3 bg-[#30a14e] rounded-sm" />
                             <div className="w-3 h-3 bg-[#216e39] rounded-sm" />
                             <span className="text-[10px] font-black uppercase text-brand-text/30 ml-2">More</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto no-scrollbar pb-4">
                        <div className="flex gap-1.5 min-w-max">
                            <div className="flex flex-col gap-1.5 pr-2 pt-6 text-[8px] font-black uppercase text-brand-text/20">
                                <span>Mon</span>
                                <span>Wed</span>
                                <span>Fri</span>
                            </div>
                            {/* Rendering 52 weeks */}
                            {Array.from({ length: 52 }).map((_, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-1.5 relative">
                                    {weekIndex % 4 === 0 && (
                                        <span className="absolute top-[-15px] left-0 text-[8px] font-black text-brand-text/30 uppercase">{months[Math.floor(weekIndex / 4.3) % 12]}</span>
                                    )}
                                    {heatmap.slice(weekIndex * 7, (weekIndex + 1) * 7).map((data, dayIndex) => (
                                        <ActivityBox key={dayIndex} level={data.lvl} day={data.day} delay={(weekIndex * 0.01)} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between text-brand-text/20">
                        <span className="text-[9px] font-black uppercase tracking-[0.4em]">Daily Neural Snapshots</span>
                        <div className="flex gap-10">
                            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Max Streak: <span className="text-emerald-500">14 Days</span></span>
                            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Total Syncs: <span className="text-brand-text">1,422</span></span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-2 relative z-10 mb-20">
                {/* Evolution Section */}
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="lg:col-span-8 bg-brand-text rounded-[4rem] p-12 text-white shadow-2xl group relative overflow-hidden flex flex-col justify-between border-b-8 border-brand-orange"
                >
                    <div className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-brand-orange/10 rounded-full blur-[100px] group-hover:scale-125 transition-transform" />
                    <div>
                        <span className="bg-brand-orange text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.4em] inline-block mb-10 shadow-2xl">Phase One</span>
                        <h3 className="text-5xl font-black tracking-tighter leading-[0.8] mb-6">Matrix <br/>Evolution<span className="text-brand-orange">.</span></h3>
                        <p className="text-white/30 text-sm font-medium leading-relaxed max-w-[220px]">Establish a 14-day streak to unlock the <span className="text-brand-orange">Infinite Core</span> protocol.</p>
                    </div>
                    
                    <div className="mt-12">
                        <div className="flex justify-between items-end mb-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">Sync Progress</span>
                            <span className="text-xl font-black text-brand-orange">68%</span>
                        </div>
                        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '68%' }}
                                className="bg-brand-orange h-full rounded-full shadow-[0_0_20px_rgba(255,92,0,0.5)]"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Future Scope Card */}
                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="lg:col-span-4 bg-white border border-black/5 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden flex flex-col"
                >
                    <h5 className="text-2xl font-black tracking-tighter mb-8 uppercase">Future Scope<span className="text-brand-blue">.</span></h5>
                    <ul className="space-y-6 text-[11px] font-black uppercase tracking-widest text-brand-text/40">
                        <li className="flex items-start gap-4 group cursor-default">
                            <span className="w-5 h-5 bg-brand-orange/10 rounded-md flex items-center justify-center text-[10px] text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all">01</span>
                            <span>Multiplayer & Friend Challenges</span>
                        </li>
                        <li className="flex items-start gap-4 group cursor-default">
                             <span className="w-5 h-5 bg-brand-blue/10 rounded-md flex items-center justify-center text-[10px] text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">02</span>
                             <span>AI-Based Puzzle Generation</span>
                        </li>
                        <li className="flex items-start gap-4 group cursor-default">
                             <span className="w-5 h-5 bg-brand-pink/10 rounded-md flex items-center justify-center text-[10px] text-brand-pink group-hover:bg-brand-pink group-hover:text-white transition-all">03</span>
                             <span>Reward System & Gear Store</span>
                        </li>
                        <li className="flex items-start gap-4 group cursor-default">
                             <span className="w-5 h-5 bg-emerald-500/10 rounded-md flex items-center justify-center text-[10px] text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">04</span>
                             <span>Real-Time Neuro Competitions</span>
                        </li>
                    </ul>
                    <div className="mt-auto pt-10">
                         <div className="p-4 bg-neutral-50 rounded-2xl border border-black/5 flex items-center justify-between group cursor-pointer hover:bg-brand-blue/5 transition-all">
                             <span className="text-[10px] font-black tracking-widest text-brand-text/20 uppercase">View Roadmap</span>
                             <span className="text-brand-blue tracking-[0.4em] font-black">→</span>
                         </div>
                    </div>
                </motion.div>
            </div>

            {/* Achievements Section */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-20"
            >
                <div className="flex items-center justify-between mb-10 px-2">
                    <h4 className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.6em] ml-4 italic underline decoration-brand-blue decoration-2 transition-all">Neuro Badges | Achievements</h4>
                </div>
                <Achievements />
            </motion.div>

            {/* Added: Recent Activity Feed */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="px-2"
            >
                <div className="flex items-center justify-between mb-10">
                    <h4 className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.6em] ml-4 italic underline decoration-brand-orange decoration-2 transition-all">Sync Feed | Recent Activity</h4>
                    <span className="text-[9px] font-black text-brand-text/20 uppercase tracking-widest">Live Updates</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { type: 'Grid Matrix', score: '940', time: '12m ago', color: 'orange' },
                        { type: 'Neural Sync', score: '2,100', time: '1h ago', color: 'blue' },
                        { type: 'Binary Logic', score: '820', time: '4h ago', color: 'pink' }
                    ].map((act, i) => (
                        <div key={i} className="bg-white border border-black/5 p-6 rounded-3xl flex items-center justify-between shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                            <div className="absolute right-0 top-0 w-1 h-full bg-brand-orange/10 group-hover:bg-brand-orange transition-colors" />
                            <div className="flex items-center gap-4">
                                <div className={`w-3 h-3 rounded-full ${act.color === 'orange' ? 'bg-brand-orange' : act.color === 'blue' ? 'bg-brand-blue' : 'bg-brand-pink'}`} />
                                <div>
                                    <p className="font-black text-sm tracking-tight">{act.type}</p>
                                    <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">{act.time}</span>
                                </div>
                            </div>
                            <span className="text-lg font-black tabular-nums tracking-tighter">+{act.score}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
