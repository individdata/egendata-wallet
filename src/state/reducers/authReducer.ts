import AuthActionType from '../action-types/auth';
import { AuthAction } from '../actions/auth';
import { AuthStateType } from '../reducer-types/auth';

const initialState: AuthStateType = {
  certified: 'inline',
  uncertified: 'none',
  tags: 'none',
};

function reducer(state = initialState, action: AuthAction) {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return {
        certified: 'none',
        uncertified: 'flex',
        tags: 'inline',
      };
    case AuthActionType.LOGOUT:
      return {
        certified: 'inline',
        uncertified: 'none',
        tags: 'none',
      };
    default:
      return state;
  }
}

export default reducer;
