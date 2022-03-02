import CheckActionType from '../action-types/check';
import { CheckAction } from '../actions/check';

const initialState = 'uncheck';

function reducer(state = initialState, action: CheckAction) {
  switch (action.type) {
    case CheckActionType.UNCHECK:
      return 'uncheck';
    case CheckActionType.CHECKED:
      return 'checked';
    default:
      return state;
  }
}

export default reducer;
