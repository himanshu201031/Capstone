import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { RootState } from './store';
import { TopNav } from './components/TopNav';
import { Home } from './components/Home';
import { GridPuzzle } from './components/GridPuzzle';
import { SequencePuzzle } from './components/SequencePuzzle';
import { NumberMatrixPuzzle } from './components/NumberMatrixPuzzle';
import { MathSequencePuzzle } from './components/MathSequencePuzzle';
import { BinaryLogicPuzzle } from './components/BinaryLogicPuzzle';
import { DeductionPuzzle } from './components/DeductionPuzzle';
import { PatternMatchingPuzzle } from './components/PatternMatchingPuzzle';
import { Result } from './components/Result';
import { Leaderboard } from './components/Leaderboard';
import { Auth } from './components/Auth';
import { Landing } from './components/Landing';
import { useSync } from './hooks/useSync';
import { setStatus } from './store/puzzleSlice';
import { addScore } from './store/userSlice';

const App: React.FC = () => {
  const status = useSelector((state: RootState) => state.puzzle.status);
  const date = useSelector((state: RootState) => state.puzzle.date);
  const score = useSelector((state: RootState) => state.puzzle.score);
  const dispatch = useDispatch();

  const isLoggedIn = !!localStorage.getItem('token');

  // Add score to user profile when puzzle completes
  useEffect(() => {
    if (status === 'completed' && score > 0) {
      dispatch(addScore({ score, date }));
    }
  }, [status, score, date, dispatch]);

  // Initialize syncing
  useSync();

  // Redirect if not logged in and trying to access protected states
  useEffect(() => {
    const protectedStates = ['idle', 'playing', 'leaderboard', 'completed'];
    if (!isLoggedIn && protectedStates.includes(status)) {
        dispatch(setStatus('landing'));
    }
  }, [status, isLoggedIn, dispatch]);

  // Redirect if ALREADY logged in and trying to access landing/auth
  useEffect(() => {
    if (isLoggedIn && (status === 'landing' || status === 'auth')) {
        dispatch(setStatus('idle'));
    }
  }, [status, isLoggedIn, dispatch]);

  // Final Rotation (5 Types)
  const seed = new Date(date).getDate();
  const puzzleTypeIndex = seed % 5;
  
  const renderPuzzle = () => {
    switch (puzzleTypeIndex) {
        case 0: return <NumberMatrixPuzzle key="matrix" />;
        case 1: return <MathSequencePuzzle key="math" />;
        case 2: return <DeductionPuzzle key="deduction" />;
        case 3: return <BinaryLogicPuzzle key="binary" />;
        case 4: return <PatternMatchingPuzzle key="pattern" />;
        default: return <GridPuzzle key="grid" />;
    }
  };

  // Use dark mode as the default core palette.
  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand-lavender/30 font-sans antialiased overflow-hidden">
      <TopNav />
      
      {/* Immersive Neural Mesh Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none">
          <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-brand-lavender/10 blur-[120px] rounded-full animate-pulse-slow" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-brand-cyan/5 blur-[100px] rounded-full" />
          <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-brand-ruby/5 blur-[80px] rounded-full animate-pulse-slow" />
          
          {/* Floating Neural Nodes - Enhanced replacement for old ring model */}
          <motion.div 
            animate={{ 
                y: [0, -30, 0], 
                rotate: [0, 45, 0],
                opacity: [0.1, 0.2, 0.1] 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[20%] w-64 h-64 border border-white/5 rounded-[4rem] rotate-12"
          />
          <motion.div 
            animate={{ 
                x: [0, 20, 0], 
                rotate: [0, -90, 0],
                opacity: [0.05, 0.1, 0.05] 
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] left-[15%] w-96 h-96 border border-white/5 rounded-full"
          />
          <motion.div 
            animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1] 
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[40%] left-[45%] w-32 h-32 bg-brand-yellow/5 blur-3xl rounded-full"
          />
      </div>
      
      <main className="relative z-10 h-full w-full overflow-y-auto no-scrollbar overflow-x-hidden">
        <AnimatePresence mode="wait">
          {status === 'landing' && <Landing key="landing" />}
          {isLoggedIn && status === 'idle' && <Home key="home" />}
          {isLoggedIn && status === 'playing' && renderPuzzle()}
          {isLoggedIn && status === 'completed' && <Result key="result" />}
          {isLoggedIn && status === 'leaderboard' && (
              <Leaderboard key="lead" onBack={() => dispatch(setStatus('idle'))} />
          )}
          {status === 'auth' && <Auth key="auth" />}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
