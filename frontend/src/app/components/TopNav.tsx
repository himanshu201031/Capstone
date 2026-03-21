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
        window.location.reload(); 
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] px-4 py-3 md:py-4 selection:bg-brand-orange/20">
            <div className={`max-w-7xl mx-auto flex items-center justify-between p-3 md:px-8 rounded-2xl md:rounded-[1.5rem] transition-all duration-700 border border-black/5 backdrop-blur-3xl shadow-lg relative overflow-hidden ${
                isOpen ? 'bg-white h-[400px] md:h-auto' : 'bg-white/90 h-16'
            }`}>
                
                {/* Logo & Branding - Reference: 'puzzle' */}
                <div 
                    onClick={() => handleNav('landing')}
                    className="flex items-center gap-2 cursor-pointer group relative z-50"
                >
                    <motion.div 
                        whileHover={{ rotate: 15, scale: 1.05 }}
                        className="w-8 h-8 md:w-9 md:h-9 bg-brand-orange rounded-xl flex items-center justify-center text-white shadow-brand-shadow-orange"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M20.5,11H19V7c0-1.1-0.9-2-2-2h-4V3.5C13,2.12,11.88,1,10.5,1S8,2.12,8,3.5V5H4C2.9,5,2,5.9,2,7v4h1.5c1.38,0,2.5,1.12,2.5,2.5S4.88,16,3.5,16H2v4c0,1.1,0.9,2,2,2h4v-1.5c0-1.38,1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5V22h4c1.1,0,2-0.9,2-2v-4h1.5c1.38,0,2.5-1.12,2.5-2.5S21.88,11,20.5,11z"/></svg>
                    </motion.div>
                    <div className="flex items-baseline">
                        <span className="text-xl md:text-2xl font-black tracking-tighter text-brand-orange">p</span>
                        <span className="text-xl md:text-2xl font-black tracking-tighter text-brand-text">uzzle.</span>
                    </div>
                </div>

                {/* Desktop Nav Items - Reference Header Links */}
                <div className="hidden md:flex items-center gap-10 relative z-50">
                    <button onClick={() => handleNav('landing')} className="text-sm font-bold text-brand-orange relative group/link">
                        Home
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-orange rounded-full" />
                    </button>
                    <button onClick={() => handleNav('idle')} className="text-sm font-bold text-brand-text/60 hover:text-brand-orange transition-all">Games</button>
                    <button onClick={() => handleNav('leaderboard')} className="text-sm font-bold text-brand-text/60 hover:text-brand-orange transition-all">Ladder</button>
                    <button className="text-sm font-bold text-brand-text/60 hover:text-brand-orange transition-all">Rules</button>
                    <button className="text-sm font-bold text-brand-text/60 hover:text-brand-orange transition-all">Help</button>
                </div>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-4 relative z-50">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4 px-4 py-2 bg-neutral-100 rounded-full border border-black/5">
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] font-black text-brand-text/40 uppercase tracking-widest leading-none">STREAK</span>
                                    <span className="text-xs font-black text-brand-orange tracking-tight">{streak}d</span>
                                </div>
                                <div className="w-[1px] h-4 bg-black/10" />
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] font-black text-brand-text/40 uppercase tracking-widest leading-none">SCORE</span>
                                    <span className="text-xs font-black text-brand-text tracking-tight">{totalPoints}</span>
                                </div>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="p-2.5 bg-neutral-100 rounded-xl hover:bg-brand-pink/10 hover:text-brand-pink transition-all group/logout"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => handleNav('auth')}
                                className="px-5 py-2 rounded-xl text-xs font-black text-brand-orange border-2 border-brand-orange hover:bg-brand-orange hover:text-white transition-all uppercase tracking-widest"
                            >
                                Register
                            </button>
                            <button 
                                onClick={() => handleNav('auth')}
                                className="px-5 py-2.5 rounded-xl text-xs font-black bg-brand-orange text-white shadow-brand-shadow-orange hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
                            >
                                Log in
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Hamburger Layout */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-3 bg-neutral-100 rounded-xl relative z-50 overflow-hidden"
                >
                    <div className="w-6 h-6 flex flex-col justify-center gap-1.5 focus:outline-none">
                        <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }} className="w-full h-0.5 bg-brand-text rounded-full" />
                        <motion.span animate={{ opacity: isOpen ? 0 : 1 }} className="w-full h-0.5 bg-brand-orange rounded-full" />
                        <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }} className="w-full h-0.5 bg-brand-text rounded-full" />
                    </div>
                </button>

                {/* Mobile Menu Content */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute inset-0 pt-24 px-8 flex flex-col gap-6 md:hidden z-40 bg-white rounded-2xl"
                        >
                             {isLoggedIn ? (
                                <>
                                    <button onClick={() => handleNav('idle')} className="text-xl font-black uppercase text-left tracking-tighter">Games</button>
                                    <button onClick={() => handleNav('leaderboard')} className="text-xl font-black uppercase text-left tracking-tighter">Ranking</button>
                                    <button onClick={handleLogout} className="text-sm font-black uppercase text-left tracking-widest text-brand-pink mt-4">Log Out ⎋</button>
                                </>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <button 
                                        onClick={() => handleNav('auth')}
                                        className="bg-neutral-100 text-brand-orange py-5 rounded-2xl font-black text-lg border border-brand-orange/20"
                                    >
                                        REGISTER
                                    </button>
                                    <button 
                                        onClick={() => handleNav('auth')}
                                        className="bg-brand-orange text-white py-5 rounded-2xl font-black text-lg shadow-xl"
                                    >
                                        LOG IN
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </nav>
    );
};
