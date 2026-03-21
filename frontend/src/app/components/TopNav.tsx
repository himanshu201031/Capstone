import React from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setStatus } from '../store/puzzleSlice';

export const TopNav: React.FC = () => {
    const dispatch = useDispatch();
    const status = useSelector((state: RootState) => state.puzzle.status);
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.reload();
    };

    const linkStyle = "text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-brand-orange hover:shadow-brand-shadow-orange/30 px-3 py-2 rounded-lg cursor-pointer";

    return (
        <motion.nav 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between pointer-events-none"
        >
            {/* Logo Section */}
            <div 
                className="flex items-center gap-3 pointer-events-auto cursor-pointer group"
                onClick={() => dispatch(setStatus(isLoggedIn ? 'idle' : 'landing'))}
            >
                <div className="w-10 h-10 bg-brand-orange flex items-center justify-center rounded-xl shadow-brand-shadow-orange group-hover:rotate-12 group-hover:scale-110 transition-all">
                    <span className="text-white font-black text-xs leading-none">LL</span>
                </div>
                <h1 className="text-xl font-black tracking-tighter text-brand-text group-hover:text-brand-orange transition-colors">
                    logic looper<span className="text-brand-orange">.</span>
                </h1>
            </div>

            {/* Desktop Navbar - Shown only after login */}
            {isLoggedIn && status !== 'landing' && status !== 'auth' && (
                <div className="hidden md:flex items-center gap-6 bg-white/80 backdrop-blur-xl border border-black/5 px-8 py-3 rounded-2xl shadow-xl shadow-black/5 pointer-events-auto">
                    <span 
                       onClick={() => dispatch(setStatus('idle'))}
                       className={`${linkStyle} ${status === 'idle' ? 'text-brand-orange' : 'text-brand-text/40'}`}
                    >
                        Home
                    </span>
                    <span 
                       onClick={() => dispatch(setStatus('playing'))}
                       className={`${linkStyle} ${status === 'playing' ? 'text-brand-orange' : 'text-brand-text/40'}`}
                    >
                        Games
                    </span>
                    <span 
                       onClick={() => dispatch(setStatus('leaderboard'))}
                       className={`${linkStyle} ${status === 'leaderboard' ? 'text-brand-orange' : 'text-brand-text/40'}`}
                    >
                        Leaderboard
                    </span>
                </div>
            )}

            {/* Auth/Profile Section */}
            <div className="flex items-center gap-4 pointer-events-auto">
                {!isLoggedIn ? (
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => dispatch(setStatus('auth'))}
                        className="bg-brand-text text-white text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl hover:bg-brand-orange transition-all"
                    >
                        Connect
                    </motion.button>
                ) : (
                    <div className="flex items-center gap-3">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="bg-white border border-black/5 p-2 px-3 rounded-xl shadow-lg flex items-center gap-3"
                        >
                            <div className="w-6 h-6 bg-brand-orange/10 rounded-lg flex items-center justify-center font-black text-[10px] text-brand-orange">A</div>
                            <span className="text-[9px] font-black text-brand-text/40 uppercase tracking-widest hidden md:inline">Alpha User</span>
                            <button 
                                onClick={handleLogout}
                                className="ml-2 hover:text-red-500 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                        </motion.div>
                    </div>
                )}
            </div>
        </motion.nav>
    );
};
