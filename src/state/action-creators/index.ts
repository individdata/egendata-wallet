export const login = (state: boolean) => (dispatch: any) => {
  dispatch({
    type: 'login',
    payload: state,
  });
};

export const inbox = (state: boolean) => (dispatch: any) => {
  dispatch({
    type: 'inbox',
    payload: state,
  });
};

export const consent = (state: boolean) => (dispatch: any) => {
  dispatch({
    type: 'consent',
    payload: state,
  });
};

export const mydata = (state: boolean) => (dispatch: any) => {
  dispatch({
    type: 'mydata',
    payload: state,
  });
};

export default login;
