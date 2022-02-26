import AuthActionType from '../action-types/login';
import { AuthAction } from '../actions/login';

function reducer(state = false, action: AuthAction) {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return true;
    case AuthActionType.LOGOUT:
      return false;
    default:
      return state;
  }
}

export default reducer;
