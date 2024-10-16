import { createSlice } from '@reduxjs/toolkit';

const colorThemeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: 'orange',
  },
  reducers: {
    setColorThemeAction(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setColorThemeAction } = colorThemeSlice.actions;

export const colorThemeReducer = colorThemeSlice.reducer;
