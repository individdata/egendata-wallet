import { combineReducers } from 'redux';
import tabsReducer from './tabsReducer';
import authReducer from './authReducer';
import flowReducer from './flowReducer';

const reducers = combineReducers({
  auth: authReducer,
  tabs: tabsReducer,
  flow: flowReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
