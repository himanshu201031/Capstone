import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useOffline } from '../hooks/useSync';
import { setStatus } from '../store/puzzleSlice';
import { motion, AnimatePresence } from 'framer-motion';

export const TopNav: React.FC = () => {
  const dispatch = useDispatch();
  const streak = useSelector((state: RootState) => state.user.streak);
  const totalPoints = useSelector((state: RootState) => state.user.totalPoints);
  const isOnline = useOffline();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isLoggedIn = !!localStorage.getItem('token');

  const navItems = [
    { label: 'Dashboard', status: 'idle' },
    { label: 'Leaderboard', status: 'leaderboard' },
    { label: 'Train', status: 'playing' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-black/60 backdrop-blur-2xl border-b border-white/5 z-50 flex items-center justify-between px-6 md:px-12 transition-all">
      {/* Brand Logo */}
      <div 
        onClick={() => dispatch(setStatus('landing'))}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-2xl bg-brand-yellow flex items-center justify-center group-hover:rotate-12 transition-transform shadow-xl shadow-brand-yellow/20">
          <span className="text-black font-black text-2xl">C</span>
        </div>
        <span className="text-white font-black text-xl tracking-tighter uppercase hidden sm:block">Capstone</span>
      </div>
      
      {/* Mid Navigation (Desktop Only) */}
      <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-[0.2em]">
        {navItems.map(item => (
            <button 
                key={item.label}
                onClick={() => dispatch(setStatus(item.status as any))}
                className="text-neutral-500 hover:text-brand-yellow transition-colors"
            >
                {item.label}
            </button>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-3">
            <div className={`p-1 rounded-full ${isOnline ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
            <div className="bg-neutral-900 border border-white/5 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-inner">
                <span className="text-xs font-black tabular-nums">{streak} FIRE</span>
                <span className="w-1 h-3 bg-neutral-800 rounded-full" />
                <span className="text-xs font-black tabular-nums text-brand-yellow">{totalPoints} ✨</span>
            </div>
        </div>

        {/* Auth/Profile Action */}
        <button 
            onClick={() => {
                if (isLoggedIn) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    window.location.reload();
                } else {
                    dispatch(setStatus('auth'));
                }
            }}
            className="flex items-center gap-2 group"
        >
            <div className="w-11 h-11 rounded-3xl bg-neutral-900 border border-white/5 flex items-center justify-center hover:bg-neutral-800 transition-all font-black text-[10px] text-neutral-400 group-hover:text-white group-hover:scale-105 active:scale-95 shadow-xl">
               {isLoggedIn ? (
                    <span className="text-brand-lavender underline">EXIT</span>
                ) : (
                    <svg className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                )}
            </div>
        </button>

        {/* Mobile Menu Trigger */}
        <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-11 h-11 rounded-2xl bg-neutral-900 border border-white/5 flex flex-col items-center justify-center gap-1 hover:bg-neutral-800 transition-all"
        >
            <span className={`h-0.5 w-5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`h-0.5 w-5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
          {isMenuOpen && (
              <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-24 left-6 right-6 bg-neutral-900 border border-white/5 rounded-4xl p-8 z-[60] shadow-2xl flex flex-col gap-6 font-black uppercase tracking-[0.2em] text-sm"
              >
                  {navItems.map(item => (
                      <button key={item.label} onClick={() => { dispatch(setStatus(item.status as any)); setIsMenuOpen(false); }} className="text-left py-2 hover:text-brand-yellow">
                          {item.label}
                      </button>
                  ))}
                  <div className="h-px bg-white/5 w-full my-2" />
                  <div className="flex justify-between items-center text-xs opacity-50">
                      <span>STREAK: {streak}</span>
                      <span>POINTS: {totalPoints}</span>
                  </div>
              </motion.div>
          )}
      </AnimatePresence>
    </nav>
  );
};
