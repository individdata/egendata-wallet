import { Props } from '../reducer-types/tags';

const initialState: Props = {
  buttonBackgroudColor: '#191B1F',
  buttonTextColor: '#757575',
};

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'consent':
      return {
        buttonBackgroudColor: '#31343C',
        buttonTextColor: '#FFFFFF',
      };
    case 'inbox':
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
