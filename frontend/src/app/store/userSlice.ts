import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  streak: number;
  totalPoints: number;
  lastPlayed: string | null;
  history: Record<string, number>; // date YYYY-MM-DD -> score
  badges: string[];
  profileIcon: string;
  name: string;
}

const initialState: UserState = {
  streak: 0,
  totalPoints: 0,
  lastPlayed: null,
  history: {},
  badges: [],
  profileIcon: '⚡',
  name: 'Alpha User',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addScore: (state, action: PayloadAction<{ score: number; date: string }>) => {
      const { score, date } = action.payload;
      
      const alreadyPlayedToday = !!state.history[date];
      state.history[date] = score;
      state.totalPoints += score;
      
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      if (!alreadyPlayedToday) {
        if (state.lastPlayed === yesterday) {
            state.streak += 1;
        } else {
            state.streak = 1;
        }
        state.lastPlayed = today;
      }

      const addBadge = (id: string) => {
        if (!state.badges.includes(id)) state.badges.push(id);
      };

      if (score >= 950) addBadge('pulse_nova');
      if (state.streak >= 7) addBadge('iron_nexus');
      if (state.totalPoints >= 5000) addBadge('infinite_core');
      if (Object.keys(state.history).length >= 30) addBadge('matrix_veteran');
    },
    updateProfile: (state, action: PayloadAction<{ icon?: string; name?: string }>) => {
        if (action.payload.icon) state.profileIcon = action.payload.icon;
        if (action.payload.name) state.name = action.payload.name;
    },
    loadLocalUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    }
  },
});

export const { addScore, loadLocalUser, updateProfile } = userSlice.actions;
export default userSlice.reducer;
