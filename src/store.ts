/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tabsReducer from './slices/tabsSlice';
import requestReducer from './slices/requestsSlice';
import popupReducer from './slices/popupSlice';
import langReducer from './slices/langSlice';
import notificationReducer from './slices/notificationSlice';
import websockerReducer from './slices/websocketSlice';
import subjectRequestsReducer from './slices/requests/subjectRequestsSlice';
import providerRequestsReducer from './slices/requests/providerRequestsSlice';
import dataReducer from './slices/dataSlice';
import providerConsentReducer from './slices/consents/providerConsentSlice';
import consumerConsentReducer from './slices/consents/consumerConsentSlice';
import processReducer from './slices/processesSlice';
import redirectReducer from './slices/redirectSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tabs: tabsReducer,
    requests: requestReducer,
    popup: popupReducer,
    lang: langReducer,
    notification: notificationReducer,
    websocket: websockerReducer,
    subjectRequests: subjectRequestsReducer,
    providerRequests: providerRequestsReducer,
    data: dataReducer,
    providerConsents: providerConsentReducer,
    consumerConsents: consumerConsentReducer,
    process: processReducer,
    redirect: redirectReducer,
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
