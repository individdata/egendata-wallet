function reducer(state: boolean, action: any) {
  switch (action.type) {
    case 'login':
      return true;
    default:
      return false;
  }
}

export default reducer;
