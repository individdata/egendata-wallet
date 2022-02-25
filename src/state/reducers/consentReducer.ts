function reducer(state: boolean, action: any) {
  switch (action.type) {
    case 'consent':
      return true;
    default:
      return false;
  }
}

export default reducer;
