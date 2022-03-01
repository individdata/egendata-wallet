import { Dispatch } from 'redux';
import AuthActionType from '../action-types/auth';

export const login = (state: string) => (dispatch: Dispatch) => {
  dispatch({
    type: AuthActionType.LOGIN,
    payload: state,
  });
};

export const logout = (state: string) => (dispatch: Dispatch) => {
  dispatch({
    type: AuthActionType.LOGOUT,
    payload: state,
  });
};

export default login;
