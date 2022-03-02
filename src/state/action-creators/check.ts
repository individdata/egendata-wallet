import { Dispatch } from 'redux';
import CheckActionType from '../action-types/check';

export const uncheck = (state: string) => (dispatch: Dispatch) => {
  dispatch({
    type: CheckActionType.UNCHECK,
    payload: state,
  });
};

export const checked = (state: string) => (dispatch: Dispatch) => {
  dispatch({
    type: CheckActionType.CHECKED,
    payload: state,
  });
};
