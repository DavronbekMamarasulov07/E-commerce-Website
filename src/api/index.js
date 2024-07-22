import axios from "axios";

const instance = axios.create({
    baseURL:import.meta.env.VITE_API_BASE,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    timeout: 10000,
})

export default instance