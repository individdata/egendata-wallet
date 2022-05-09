/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './pages/auth/authSlice';
import tabsReducer from './slices/tabsSlice';
import requestReducer from './slices/requestSlice';
import popupReducer from './components/popups/popupSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tabs: tabsReducer,
    requests: requestReducer,
    popup: popupReducer,
    notification: notificationReducer,
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
