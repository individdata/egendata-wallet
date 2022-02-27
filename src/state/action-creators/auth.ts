import { Dispatch } from 'redux';
import AuthActionType from '../action-types/auth';
import { AuthStateType } from '../reducer-types/auth';

export const login = (state: AuthStateType) => (dispatch: Dispatch) => {
  dispatch({
    type: AuthActionType.LOGIN,
    payload: state,
  });
};

export const logout = (state: AuthStateType) => (dispatch: Dispatch) => {
  dispatch({
    type: AuthActionType.LOGOUT,
    payload: state,
  });
};

export default login;
