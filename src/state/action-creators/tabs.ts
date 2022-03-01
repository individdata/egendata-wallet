import { Dispatch } from 'redux';
import TagsActionType from '../action-types/tabs';

export const inbox = (state: string) => (dispatch: Dispatch) => {
  dispatch({
    type: TagsActionType.INBOX,
    payload: state,
  });
};

export const consent = (state: string) => (dispatch: Dispatch) => {
  dispatch({
    type: TagsActionType.CONSENT,
    payload: state,
  });
};

export const mydata = (state: string) => (dispatch: Dispatch) => {
  dispatch({
    type: TagsActionType.MYDATA,
    payload: state,
  });
};

export default inbox;
