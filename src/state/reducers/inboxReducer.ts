import { Props } from '../reducer-types/tags';

const initialState: Props = {
  buttonBackgroudColor: '#31343C',
  buttonTextColor: '#FFFFFF',
};

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'inbox':
      return {
        buttonBackgroudColor: '#31343C',
        buttonTextColor: '#FFFFFF',
      };
    case 'consent':
      return {
        buttonBackgroudColor: '#191B1F',
        buttonTextColor: '#757575',
      };
    case 'mydata':
      return {
        buttonBackgroudColor: '#191B1F',
        buttonTextColor: '#757575',
      };
    default:
      return state;
  }
}

export default reducer;
