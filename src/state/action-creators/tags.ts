import { Dispatch } from 'redux';
import TagsActionType from '../action-types/tags';
import { TagStateType } from '../reducer-types/tags';

export const inbox = (state: TagStateType) => (dispatch: Dispatch) => {
  dispatch({
    type: TagsActionType.INBOX,
    payload: state,
  });
};

export const consent = (state: TagStateType) => (dispatch: Dispatch) => {
  dispatch({
    type: TagsActionType.CONSENT,
    payload: state,
  });
};

export const mydata = (state: TagStateType) => (dispatch: Dispatch) => {
  dispatch({
    type: TagsActionType.MYDATA,
    payload: state,
  });
};

export default inbox;
