import { combineReducers } from 'redux';
import earnings from './earnings.reducer';

const appReducer = combineReducers({
    earnings
});

export default appReducer;
