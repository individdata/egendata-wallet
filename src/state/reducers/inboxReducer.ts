import { TagStateType } from '../reducer-types/tags';

const initialState: TagStateType = {
  buttonBackgroudColor: '#31343C',
  buttonTextColor: '#FFFFFF',
  contentVisible: 'inline',
};

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'inbox':
      return {
        buttonBackgroudColor: '#31343C',
        buttonTextColor: '#FFFFFF',
        contentVisible: 'inline',
      };
    case 'consent':
      return {
        buttonBackgroudColor: '#191B1F',
        buttonTextColor: '#757575',
        contentVisible: 'none',
      };
    case 'mydata':
      return {
        buttonBackgroudColor: '#191B1F',
        buttonTextColor: '#757575',
        contentVisible: 'none',
      };
    default:
      return state;
  }
}

export default reducer;
