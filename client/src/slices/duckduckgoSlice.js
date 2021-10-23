import { createSlice } from '@reduxjs/toolkit';
import {
  getDuckduckgoList,
  getDuckduckgoPersistList,
  getDuckduckgoQueriesList,
} from '../apis/duckduckgoList';

export const duckduckgoSlice = createSlice({
  name: 'duckduckgo',
  initialState: {
    rows: [],
    pastQueries: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPastQueries: (state, action) => {
      state.pastQueries = action.payload;
    },
    addToPastQueries: (state, action) => {
      state.pastQueries.push(action.payload);
    },
  },
  extraReducers: {
    [getDuckduckgoList.fulfilled]: (state, action) => {
      state.rows = action.payload;
    },
    [getDuckduckgoPersistList.fulfilled]: (state, action) => {
      state.rows = action.payload.data;
      state.pastQueries.push(action.payload.query);
    },
    [getDuckduckgoQueriesList.fulfilled]: (state, action) => {
      state.pastQueries = action.payload;
    },
  },
});

export const { setPastQueries, addToPastQueries } =
  duckduckgoSlice.actions;

export default duckduckgoSlice.reducer;
