/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './pages/direct/auth/authSlice';
import afterLoginReducer from './pages/direct/auth/afterLoginSlice';
import tabsReducer from './pages/direct/home/tabsSlice';
import flowReducer from './pages/direct/home/flowSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    afterLogin: afterLoginReducer,
    tabs: tabsReducer,
    flow: flowReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
