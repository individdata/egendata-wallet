import { combineReducers } from 'redux';
import inboxReducer from './inboxReducer';
import consentReducer from './consentReducer';
import mydataReducer from './mydataReducer';
import authReducer from './authReducer';

const reducers = combineReducers({
  auth: authReducer,
  inbox: inboxReducer,
  consent: consentReducer,
  mydata: mydataReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
