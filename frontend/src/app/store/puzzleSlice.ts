import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PuzzleStatus = 'landing' | 'idle' | 'playing' | 'completed' | 'leaderboard' | 'auth';

interface PuzzleState {
  status: PuzzleStatus;
  date: string;
  hintsRemaining: number;
  timeElapsed: number;
  score: number;
}

const initialState: PuzzleState = {
  status: typeof window !== 'undefined' && localStorage.getItem('token') ? 'idle' : 'landing',
  date: new Date().toISOString().split('T')[0],
  hintsRemaining: 3,
  timeElapsed: 0,
  score: 0,
};

const puzzleSlice = createSlice({
  name: 'puzzle',
  initialState,
  reducers: {
    startPuzzle: (state) => {
      state.status = 'playing';
      state.timeElapsed = 0;
      state.score = 0;
      state.hintsRemaining = 3;
    },
    tickTimer: (state) => {
      if (state.status === 'playing') state.timeElapsed += 1;
    },
    useHint: (state) => {
      if (state.hintsRemaining > 0) state.hintsRemaining -= 1;
    },
    finishPuzzle: (state) => {
      state.status = 'completed';
      // Basic scoring formula
      const base = 1000;
      const timePenalty = state.timeElapsed * 2;
      const hintPenalty = (3 - state.hintsRemaining) * 50;
      state.score = Math.max(10, base - timePenalty - hintPenalty);
    },
    setStatus: (state, action: PayloadAction<PuzzleStatus>) => {
      state.status = action.payload;
    },
    resetPuzzle: () => initialState
  },
});

export const { startPuzzle, tickTimer, useHint, finishPuzzle, setStatus, resetPuzzle } = puzzleSlice.actions;
export default puzzleSlice.reducer;
