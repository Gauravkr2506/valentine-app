import { LOAD_DATA, SELECT_MESSAGE_TYPE, SELECT_VIDEO } from "./types";
import { mainData } from "./main-data";
export const LoadData = () => ({ type: LOAD_DATA, data: mainData() });
export const SelectMessageType = key => ({ type: SELECT_MESSAGE_TYPE, data: key });
export const SelectVideo = id => ({ type: SELECT_VIDEO, data: id });
