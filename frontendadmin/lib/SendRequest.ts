import axios from "axios"

const backendUrl = "https://exploremongoliaback.vercel.app"

export const sendRequest = axios.create({ baseURL: backendUrl });