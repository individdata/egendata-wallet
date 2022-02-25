function reducer(state: boolean, action: any) {
  switch (action.type) {
    case 'inbox':
      return true;
    default:
      return false;
  }
}

export default reducer;
