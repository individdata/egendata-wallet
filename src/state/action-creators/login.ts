import { Dispatch } from 'redux';
import AuthActionType from '../action-types/login';

export const login = (state: boolean) => (dispatch: Dispatch) => {
  dispatch({
    type: AuthActionType.LOGIN,
    payload: state,
  });
};

export const logout = (state: boolean) => (dispatch: Dispatch) => {
  dispatch({
    type: AuthActionType.LOGOUT,
    payload: state,
  });
};

export default login;
