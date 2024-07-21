import { legacy_createStore } from "redux";
import  reducer  from "../reducer/AuthReducer";

const store = legacy_createStore(reducer);

export default store;