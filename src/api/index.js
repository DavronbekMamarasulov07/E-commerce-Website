import axios from "axios";
import store from "../redux/store"
import { SIGN_OUT } from "../redux/actions/types";

const xAuthToken = store.getState().token

const instance = axios.create({
    baseURL:import.meta.env.VITE_API_BASE,
    headers: {
        "Content-Type": "application/json",
         
        
    },
    timeout: 10000,
})

instance.interceptors.request.use((request) => {
    request.headers["Authorization"] = "Bearer " + store.getState().token;
    return request
},
    (error) => {
        return Promise.reject(error)
    }
    
)

instance.interceptors.response.use(
    (response) => {
        if(response){
            return response
        }
    },
    (error) => {
        if(
            error?.response?.status === 401 ||
            error?.response?.status === 403 ||
            error?.response?.status === 500 
        ){
            store.dispatch({type: SIGN_OUT})
        }
        return Promise.reject(error)
    }
    
)

export default instance