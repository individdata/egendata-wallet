import { Dispatch } from 'redux';
import RequestFlowActionType from '../action-types/requestFlow';

export const requestContent = (state: string ) => (dispatch: Dispatch) => {
  dispatch({
    type: RequestFlowActionType.RequestContent,
    payload: state,
  });
};

export default requestContent;
