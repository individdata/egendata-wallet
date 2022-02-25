import AuthType from '../action-types/index';

interface LoginAction {
  type: AuthType.LOGIN
}

interface LogoutAction {
  type: AuthType.LOGOUT
}

export type AuthAction = LoginAction | LogoutAction;
