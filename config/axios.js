import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://192.168.100.117:8080',
    timeout: 10000,
})

export default apiClient;