import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isDarkMode: true,
  },
  reducers: {
    changeDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { changeDarkMode } = appSlice.actions;

export default appSlice.reducer;
