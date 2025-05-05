import axios from "axios"

const backendUrl = "https://backend-five-lyart-36.vercel.app"
// const backendUrl = "http://localhost:9000"


export const sendRequest = axios.create({ baseURL: backendUrl });