import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '../store/puzzleSlice';
import { RootState } from '../store';

export const TopNav: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const streak = useSelector((state: RootState) => state.user.streak);
    const totalPoints = useSelector((state: RootState) => state.user.totalPoints);
    const isLoggedIn = !!localStorage.getItem('token');

    const handleNav = (status: any) => {
        dispatch(setStatus(status));
        setIsOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.reload(); // Refresh to reset state
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-8 md:py-10 selection:bg-brand-cyan/30">
            <div className={`max-w-7xl mx-auto flex items-center justify-between p-6 md:px-12 rounded-[2.5rem] md:rounded-[4rem] transition-all duration-700 border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden ${
                isOpen ? 'bg-neutral-900 h-[450px] md:h-auto' : 'bg-neutral-900/60 h-24 md:h-28'
            }`}>
                
                {/* Logo & Branding */}
                <div 
                    onClick={() => handleNav('landing')}
                    className="flex items-center gap-4 cursor-pointer group relative z-50"
                >
                    <motion.div 
                        whileHover={{ rotate: 180 }}
                        className="w-10 h-10 md:w-12 md:h-12 bg-brand-yellow rounded-2xl md:rounded-3xl flex items-center justify-center text-black font-black text-2xl shadow-[0_10px_30px_rgba(255,245,0,0.3)]"
                    >
                        C
                    </motion.div>
                    <span className="text-xl md:text-3xl font-black tracking-tighter text-white group-hover:text-brand-yellow transition-colors leading-none">CAPSTONE.</span>
                </div>

                {/* Desktop Nav Items */}
                <div className="hidden md:flex items-center gap-12 relative z-50">
                    {isLoggedIn ? (
                        <>
                            <button onClick={() => handleNav('idle')} className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 hover:text-brand-yellow transition-all">Dashboard</button>
                            <button onClick={() => handleNav('leaderboard')} className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 hover:text-brand-lavender transition-all">Ladder</button>
                            <button onClick={() => handleNav('playing')} className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-cyan hover:text-brand-ruby transition-all">Initialize Train</button>
                            
                            <div className="h-4 w-px bg-white/10 mx-4" />

                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-end">
                                    <span className="text-[8px] font-black text-neutral-600 uppercase tracking-widest leading-none mb-1">STREAK</span>
                                    <span className="text-sm font-black text-brand-yellow tracking-tighter leading-none">{streak} DAYS</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[8px] font-black text-neutral-600 uppercase tracking-widest leading-none mb-1">TOTAL</span>
                                    <span className="text-sm font-black text-white tracking-tighter leading-none">{totalPoints} PTS</span>
                                </div>
                                <button 
                                    onClick={handleLogout}
                                    className="ml-4 p-3 bg-neutral-800 rounded-2xl hover:bg-brand-ruby/20 hover:text-brand-ruby transition-all group/logout"
                                >
                                     <svg className="w-5 h-5 opacity-50 group-hover/logout:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                </button>
                            </div>
                        </>
                    ) : (
                        <button 
                            onClick={() => handleNav('auth')}
                            className="bg-white text-black px-10 py-5 rounded-[2.2rem] font-black text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all"
                        >
                            AUTHORIZE IDENTITY
                        </button>
                    )}
                </div>

                {/* Mobile Hamburger Layout */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-4 bg-white/5 rounded-2xl relative z-50 overflow-hidden"
                >
                    <div className="w-8 h-8 flex flex-col justify-center gap-1.5 focus:outline-none">
                        <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }} className="w-full h-1 bg-white rounded-full" />
                        <motion.span animate={{ opacity: isOpen ? 0 : 1 }} className="w-full h-1 bg-brand-yellow rounded-full" />
                        <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }} className="w-full h-1 bg-white rounded-full" />
                    </div>
                </button>

                {/* Mobile Menu Content */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute inset-0 pt-32 px-10 flex flex-col gap-8 md:hidden z-40 bg-neutral-900 rounded-[2.5rem]"
                        >
                             {isLoggedIn ? (
                                <>
                                    <button onClick={() => handleNav('idle')} className="text-2xl font-black uppercase text-left tracking-tighter">Dashboard</button>
                                    <button onClick={() => handleNav('leaderboard')} className="text-2xl font-black uppercase text-left tracking-tighter">Ladder</button>
                                    <button onClick={() => handleNav('playing')} className="text-2xl font-black uppercase text-left tracking-tighter text-brand-cyan">Train Node</button>
                                    <button onClick={handleLogout} className="text-sm font-black uppercase text-left tracking-[0.3em] text-brand-ruby mt-4">Close Session ⎋</button>
                                </>
                            ) : (
                                <button 
                                    onClick={() => handleNav('auth')}
                                    className="bg-brand-yellow text-black py-8 rounded-[2rem] font-black text-xl shadow-2xl"
                                >
                                    AUTHORIZE IDENTITY
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </nav>
    );
};
