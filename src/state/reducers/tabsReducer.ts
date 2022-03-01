import TagsActionType from '../action-types/tabs';

const initialState = 'inbox';

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case TagsActionType.INBOX:
      return 'inbox';
    case TagsActionType.CONSENT:
      return 'consent';
    case TagsActionType.MYDATA:
      return 'mydata';
    default:
      return state;
  }
}

export default reducer;
