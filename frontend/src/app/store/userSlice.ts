import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  streak: number;
  totalPoints: number;
  lastPlayed: string | null;
  history: Record<string, number>; // date YYYY-MM-DD -> score
}

const initialState: UserState = {
  streak: 0,
  totalPoints: 0,
  lastPlayed: null,
  history: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addScore: (state, action: PayloadAction<{ score: number; date: string }>) => {
      const { score, date } = action.payload;
      state.history[date] = score;
      state.totalPoints += score;
      
      // Calculate streak
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      if (state.lastPlayed === yesterday) {
        state.streak += 1;
      } else if (state.lastPlayed !== today) {
        state.streak = 1; // Unbroken streak reset if missed yesterday
      }
      
      state.lastPlayed = today;
    },
    loadLocalUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    }
  },
});

export const { addScore, loadLocalUser } = userSlice.actions;
export default userSlice.reducer;
