import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import menuReducer from '../reducers/menuReducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

export default ()=>{
    const store = createStore(combineReducers({
        menu:menuReducer
    }),composeEnhancers(applyMiddleware(thunk)));

    return store;
}