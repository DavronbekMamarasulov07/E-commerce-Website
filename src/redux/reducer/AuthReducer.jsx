import { saveToLocalStorage } from "../../helpers"
import { ERROR, LOADING, LOGIN_SUCCESS, REGISTER_SUCCESS, SIGN_OUT } from "../actions/types"

const InitialState = {
    loading : false,
    user : null,
    token: localStorage.getItem("x-auth-token"),
    error: null,
    isSucess: false,
    isError: false
}

const  AuthReducer = (state = InitialState, action) => {

    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            saveToLocalStorage("x-auth-token", action.token)
            return {
                ...state,
                loading: false,
                user: action.user,
                token: action.token,
                isSucess: true,
                isError: false
            } 
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case ERROR:
            return {
                ...state,
                loading: false,
                user: null,
                token: null,
                error: action.message,
                isError: true
            }
        case SIGN_OUT:
            localStorage.removeItem("x-auth-token")
            return {
                ...state,
                user: null,
                token: null
            }
        default:
            return state
    }
}

export default AuthReducer