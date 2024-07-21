import { ERROR, LOADING, LOGIN_SUCCESS, REGISTER_SUCCESS } from "../actions/types"

const InitialState = {
    loading : false,
    user : null,
    token: null,
    error: null,
    isSucess: false,
    isError: false
}

const  AuthReducer = (state = InitialState, action) => {

    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
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
        default:
            return state
    }
}

export default AuthReducer