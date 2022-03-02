import { Dispatch } from 'redux';
import FlowActionType from '../action-types/flow';

export const unopen = (state: string) => (dispatch: Dispatch) => {
  dispatch({
    type: FlowActionType.UNOPEN,
    payload: state,
  });
};

export const open = (state: string) => (dispatch: Dispatch) => {
  dispatch({
    type: FlowActionType.OPEN,
    payload: state,
  });
};

export const consented = (state: string) => (dispatch: Dispatch) => {
  dispatch({
    type: FlowActionType.CONSENTED,
    payload: state,
  });
};

export const getdata = (state: string) => (dispatch: Dispatch) => {
  dispatch({
    type: FlowActionType.GETDATA,
    payload: state,
  });
};

export const sharedata = (state: string) => (dispatch: Dispatch) => {
  dispatch({
    type: FlowActionType.SHAREDATA,
    payload: state,
  });
};

export const certificate = (state: string) => (dispatch: Dispatch) => {
  dispatch({
    type: FlowActionType.CERTIFICATE,
    payload: state,
  });
};

export const finish = (state: string) => (dispatch: Dispatch) => {
  dispatch({
    type: FlowActionType.FINISH,
    payload: state,
  });
};

export default unopen;
