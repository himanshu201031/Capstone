import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { RootState } from './store';
import { TopNav } from './components/TopNav';
import { Home } from './components/Home';
import { GridPuzzle } from './components/GridPuzzle';
import { SequencePuzzle } from './components/SequencePuzzle';
import { Result } from './components/Result';
import { Leaderboard } from './components/Leaderboard';
import { Auth } from './components/Auth';
import { Landing } from './components/Landing';
import { useSync } from './hooks/useSync';
import { setStatus } from './store/puzzleSlice';

const App: React.FC = () => {
  const status = useSelector((state: RootState) => state.puzzle.status);
  const date = useSelector((state: RootState) => state.puzzle.date);
  const dispatch = useDispatch();

  const isLoggedIn = !!localStorage.getItem('token');

  // Initialize syncing
  useSync();

  // Redirect if not logged in and trying to access protected states
  useEffect(() => {
    const protectedStates = ['idle', 'playing', 'leaderboard', 'completed'];
    if (!isLoggedIn && protectedStates.includes(status)) {
        dispatch(setStatus('landing'));
    }
  }, [status, isLoggedIn, dispatch]);

  // Alternate puzzle types daily
  const isSequenceDay = new Date(date).getDate() % 2 === 0;

  // Use dark mode as the default core palette.
  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand-lavender/30 font-sans antialiased overflow-hidden">
      <TopNav />
      
      {/* Immersive Brand Background */}
      <div className="fixed top-[-30%] right-[-10%] w-[80%] h-[80%] bg-brand-lavender/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-yellow/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[40%] h-[40%] bg-brand-cyan/10 blur-[130px] rounded-full pointer-events-none animate-pulse-slow" />
      
      {/* Stylized Swirl/Circle Overlay */}
      <div className="fixed top-10 right-[-10rem] w-[40rem] h-[40rem] border-[40px] border-brand-lavender/10 rounded-full blur-3xl pointer-events-none" />
      
      <main className="relative z-10 h-full w-full overflow-y-auto no-scrollbar overflow-x-hidden">
        <AnimatePresence mode="wait">
          {status === 'landing' && <Landing key="landing" />}
          {isLoggedIn && status === 'idle' && <Home key="home" />}
          {isLoggedIn && status === 'playing' && (
            isSequenceDay ? <SequencePuzzle key="seq" /> : <GridPuzzle key="grid" />
          )}
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
