import { createStore, applyMiddleware } from 'redux';
import appReducer from '../reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
    return createStore(
        appReducer,
        initialState,
        applyMiddleware(thunk)
    );
};
