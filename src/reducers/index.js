import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import MainReducer from "./main-reducer";
import MessageScreenReducer from "./message-screen-reducer";

var reducers = combineReducers({
	main_store: MainReducer,
	message_store: MessageScreenReducer
});

const enhancer = compose(applyMiddleware(thunk));

const store = createStore(reducers, enhancer);

export default store;
