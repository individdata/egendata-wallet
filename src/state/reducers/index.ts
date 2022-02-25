import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import inboxReducer from './inboxReducer';
import consentReducer from './consentReducer';
import mydataReducer from './mydataReducer';

const reducers = combineReducers({
  login: loginReducer,
  inbox: inboxReducer,
  consent: consentReducer,
  mydata: mydataReducer,
});

export default reducers;
