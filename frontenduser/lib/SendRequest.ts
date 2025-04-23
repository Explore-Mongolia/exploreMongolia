import axios from "axios"

const backendUrl = "http://localhost:9000"

export const sendRequest = axios.create({ baseURL: backendUrl });