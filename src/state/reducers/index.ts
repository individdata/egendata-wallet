import { combineReducers } from 'redux';
import tabsReducer from './tabsReducer';
import authReducer from './authReducer';
import flowReducer from './flowReducer';
import checkReducer from './checkReducer';

const reducers = combineReducers({
  auth: authReducer,
  tabs: tabsReducer,
  flow: flowReducer,
  check: checkReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
