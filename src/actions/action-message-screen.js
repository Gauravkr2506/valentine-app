import { Messages } from "./../messages/index";
import { LOAD_MESSAGE } from "./types";
export const LoadMessage = () => ({ type: LOAD_MESSAGE, data: Messages().map((msg,i)=>({...msg,key:i.toString()})) });
