export const login = (state: boolean) => (dispatch: any) => {
  dispatch({
    type: 'login',
    payload: state,
  });
};

export default login;
