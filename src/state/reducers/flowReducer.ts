import FlowActionType from '../action-types/flow';
import { FlowAction } from '../actions/flow';

const initialState = 'unopen';

function reducer(state = initialState, action: FlowAction) {
  switch (action.type) {
    case FlowActionType.UNOPEN:
      return 'unopen';
    case FlowActionType.OPEN:
      return 'open';
    case FlowActionType.CONSENTED:
      return 'consented';
    case FlowActionType.GETDATA:
      return 'getdata';
    case FlowActionType.SHAREDATA:
      return 'sharedata';
    case FlowActionType.CERTIFICATE:
      return 'certificate';
    case FlowActionType.FINISH:
      return 'finish';
    default:
      return state;
  }
}

export default reducer;
