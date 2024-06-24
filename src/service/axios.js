import axios from "axios"

const api = axios.create({
    baseURL:"https://estokk.com/api"
    // baseURL:"https://backend-fitness-dk.vercel.app/api"
})

export default api