import { messages } from "./main-data";
import { LOAD_MESSAGE } from "./types";
export const LoadMessage = () => ({ type: LOAD_MESSAGE, data: messages() });
