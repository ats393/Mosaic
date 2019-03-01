const initialState = {
  symbol: null,
  earnings: []
};
  
const earnings = (state = initialState, action) => {
    switch(action.type){
      case 'RECEIVE_EARNINGS': {
        // API only returns max 5 reports so duplicate data for pagination ...
        if (state.symbol != action.earnings.symbol) {
          state.earnings = [];
          action.earnings.earnings.forEach(element => {
            state.earnings = state.earnings.concat(action.earnings.earnings);
          });
        }
        const newState = Object.assign({}, state);
        return newState;
      }
      default:
        return state;
    }
}
  
  export default earnings;
  