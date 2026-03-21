import React, { useEffect, useMemo } from 'react';
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
import { LogicGridPuzzle } from './components/LogicGridPuzzle';
import { Result } from './components/Result';
import { Leaderboard } from './components/Leaderboard';
import { Auth } from './components/Auth';
import { Landing } from './components/Landing';
import { useSync } from './hooks/useSync';
import { setStatus } from './store/puzzleSlice';
import { addScore } from './store/userSlice';
import { saveScoreLocally } from './utils/idb';

const App: React.FC = () => {
  const puzzle = useSelector((state: RootState) => state.puzzle);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const isLoggedIn = !!localStorage.getItem('token');

  // Add score to user profile when puzzle completes
  useEffect(() => {
    if (puzzle.status === 'completed' && puzzle.score > 0) {
      dispatch(addScore({ score: puzzle.score, date: puzzle.date }));
      
      const userId = localStorage.getItem('userId') || 'guest';
      saveScoreLocally({
          userId,
          date: puzzle.date,
          score: puzzle.score,
          timeTaken: puzzle.timeElapsed,
          streak: user.streak,
          hintsUsed: 3 - puzzle.hintsRemaining,
          hintsRemaining: puzzle.hintsRemaining
      }).catch(err => console.error("IDB Save Error", err));
    }
  }, [puzzle.status, puzzle.score, puzzle.date, puzzle.timeElapsed, puzzle.hintsRemaining, user.streak, dispatch]);

  // Initialize syncing
  useSync();

  // Redirect if not logged in and trying to access protected states
  useEffect(() => {
    const protectedStates = ['idle', 'playing', 'leaderboard', 'completed'];
    if (!isLoggedIn && protectedStates.includes(puzzle.status)) {
        dispatch(setStatus('landing'));
    }
  }, [puzzle.status, isLoggedIn, dispatch]);

  // Redirect if ALREADY logged in and trying to access landing/auth
  useEffect(() => {
    if (isLoggedIn && (puzzle.status === 'landing' || puzzle.status === 'auth')) {
        dispatch(setStatus('idle'));
    }
  }, [puzzle.status, isLoggedIn, dispatch]);

  // Final Rotation (6 Types)
  const puzzleTypeIndex = useMemo(() => {
      return Math.floor(Math.random() * 6);
  }, [puzzle.status === 'playing']); // Reseed when they start playing

  const renderPuzzle = () => {
    switch (puzzleTypeIndex) {
        case 0: return <NumberMatrixPuzzle key="matrix" />;
        case 1: return <MathSequencePuzzle key="math" />;
        case 2: return <DeductionPuzzle key="deduction" />;
        case 3: return <BinaryLogicPuzzle key="binary" />;
        case 4: return <PatternMatchingPuzzle key="pattern" />;
        case 5: return <LogicGridPuzzle key="logic" />;
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
          {puzzle.status === 'landing' && <Landing key="landing" />}
          {isLoggedIn && puzzle.status === 'idle' && <Home key="home" />}
          {isLoggedIn && puzzle.status === 'playing' && renderPuzzle()}
          {isLoggedIn && puzzle.status === 'completed' && <Result key="result" />}
          {isLoggedIn && puzzle.status === 'leaderboard' && (
              <Leaderboard key="lead" onBack={() => dispatch(setStatus('idle'))} />
          )}
          {puzzle.status === 'auth' && <Auth key="auth" />}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
