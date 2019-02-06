import { Messages } from "./../messages/index";
import { LOAD_MESSAGE,UNSELECT_MESSAGE_TYPE } from "./types";
export const LoadMessage = () => ({ type: LOAD_MESSAGE, data: Messages().map((msg,i)=>({...msg,key:i.toString()})) });
export const UnselectMessageType = ()=> ({type:UNSELECT_MESSAGE_TYPE})