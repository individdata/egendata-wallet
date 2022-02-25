function reducer(state: boolean, action: any) {
  switch (action.type) {
    case 'mydate':
      return true;
    default:
      return false;
  }
}

export default reducer;
