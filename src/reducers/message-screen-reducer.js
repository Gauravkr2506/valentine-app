import { LOAD_MESSAGE, SELECT_MESSAGE_TYPE, SELECT_VIDEO } from "../actions/types";
const MAIN_STATE = {
	data: []
};

const MessageScreenReducer = (state = MAIN_STATE, action) => {
	var newstate = Object.assign({}, state);

	if (action.type == LOAD_MESSAGE) {
		newstate.data = action.data;
		return newstate;
	}

	return newstate;
};
export default MessageScreenReducer;
