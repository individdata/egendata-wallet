import AuthActionType from '../action-types';
import { AuthAction } from '../actions';

function reducer(state: boolean, action: AuthAction) {
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
