import { Dispatch } from 'redux';
import TagsActionType from '../action-types/tags';
import { Props } from '../reducer-types/tags';

export const inbox = (state: Props) => (dispatch: Dispatch) => {
  dispatch({
    type: TagsActionType.INBOX,
    payload: state,
  });
};

export const consent = (state: Props) => (dispatch: Dispatch) => {
  dispatch({
    type: TagsActionType.CONSENT,
    payload: state,
  });
};

export const mydata = (state: Props) => (dispatch: Dispatch) => {
  dispatch({
    type: TagsActionType.MYDATA,
    payload: state,
  });
};

export default inbox;
