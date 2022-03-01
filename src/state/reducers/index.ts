import { combineReducers } from 'redux';
import tabsReducer from './tabsReducer';
import authReducer from './authReducer';

const reducers = combineReducers({
  auth: authReducer,
  tabs: tabsReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
