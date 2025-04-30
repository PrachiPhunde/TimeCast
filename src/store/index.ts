import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './slices/newsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;