import { LOAD_DATA, SELECT_MESSAGE_TYPE, UNSELECT_MESSAGE_TYPE } from "../actions/types";
const MAIN_STATE = {
	data: [],
	selected_message_type: "",
	message_list: []
};

const MainReducer = (state = MAIN_STATE, action) => {
	var newstate = Object.assign({}, state);

	if (action.type == LOAD_DATA) {
		newstate.data = action.data;
		return newstate;
	}
	if (action.type == SELECT_MESSAGE_TYPE) {
		newstate.selected_message_type = action.data;
		return newstate;
	}
	if (action.type == UNSELECT_MESSAGE_TYPE) {
		newstate.selected_message_type = "";
		return newstate;
	}
	return newstate;
};
export default MainReducer;
