import { legacy_createStore } from "redux";
import  AuthReducer  from "../reducer/AuthReducer";

const store = legacy_createStore(AuthReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;