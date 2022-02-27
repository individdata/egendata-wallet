import AuthActionType from '../action-types/auth';

interface LoginAction {
  type: AuthActionType.LOGIN
}

interface LogoutAction {
  type: AuthActionType.LOGOUT
}

export type AuthAction = LoginAction | LogoutAction;
