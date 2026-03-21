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

  return (
    <div className="min-h-screen bg-neutral-50 text-brand-text selection:bg-brand-orange/20 font-sans antialiased overflow-hidden">
      <TopNav />
      
      {/* Decorative Atmosphere Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-brand-orange/5 blur-[100px] rounded-full" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-brand-blue/5 blur-[80px] rounded-full" />
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
