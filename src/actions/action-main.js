import { LOAD_DATA, SELECT_MESSAGE_TYPE } from "./types";
import { mainData } from "./main-data";
export const LoadData = () => ({ type: LOAD_DATA, data: mainData() });
export const SelectMessageType = key => ({ type: SELECT_MESSAGE_TYPE, data: key });

