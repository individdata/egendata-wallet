/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './pages/auth/authSlice';
import tabsReducer from './pages/direct/tabsSlice';
import requestReducer from './pages/requests/requestSlice';
import popupReducer from './components/popups';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tabs: tabsReducer,
    requests: requestReducer,
    popup: popupReducer,
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
