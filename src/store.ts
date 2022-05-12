/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tabsReducer from './slices/tabsSlice';
import requestReducer from './slices/requestsSlice';
import popupReducer from './slices/popupSlice';
import notificationReducer from './slices/notificationSlice';
import websockerReducer from './slices/websocketSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tabs: tabsReducer,
    requests: requestReducer,
    popup: popupReducer,
    notification: notificationReducer,
    websocket: websockerReducer,
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
