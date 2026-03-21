import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  streak: number;
  totalPoints: number;
  lastPlayed: string | null;
  history: Record<string, number>; // date YYYY-MM-DD -> score
  badges: string[];
}

const initialState: UserState = {
  streak: 0,
  totalPoints: 0,
  lastPlayed: null,
  history: {},
  badges: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addScore: (state, action: PayloadAction<{ score: number; date: string }>) => {
      const { score, date } = action.payload;
      
      // Don't count duplicate scores for the same day for streak
      const alreadyPlayedToday = !!state.history[date];
      state.history[date] = score;
      state.totalPoints += score;
      
      // Streak Calculation
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      if (!alreadyPlayedToday) {
        if (state.lastPlayed === yesterday) {
            state.streak += 1;
        } else if (state.lastPlayed !== today) {
            state.streak = 1;
        }
        state.lastPlayed = today;
      }

      // Achievement Logic
      const addBadge = (id: string) => {
        if (!state.badges.includes(id)) state.badges.push(id);
      };

      if (score >= 950) addBadge('pulse_nova');
      if (state.streak >= 7) addBadge('iron_nexus');
      if (state.totalPoints >= 5000) addBadge('infinite_core');
      if (Object.keys(state.history).length >= 30) addBadge('matrix_veteran');
    },
    loadLocalUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    }
  },
});

export const { addScore, loadLocalUser } = userSlice.actions;
export default userSlice.reducer;
