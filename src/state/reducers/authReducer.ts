import AuthActionType from '../action-types/auth';
import { AuthAction } from '../actions/auth';

const initialState = 'logout';

function reducer(state = initialState, action: AuthAction) {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return 'login';
    case AuthActionType.LOGOUT:
      return 'logout';
    default:
      return state;
  }
}

export default reducer;
