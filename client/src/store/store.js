import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../slices/appSlice';
import duckduckgoReducer from '../slices/duckduckgoSlice';

export default configureStore({
  reducer: {
    app: appReducer,
    duckduckgo: duckduckgoReducer,
  },
});
