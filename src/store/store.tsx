/* eslint-disable import/no-cycle */
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import langReducer from './slices/langSlice';

export const store = configureStore({
  reducer: {
    lang: langReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
