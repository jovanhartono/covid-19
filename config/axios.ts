import axios, {AxiosInstance} from "axios";

const instance: AxiosInstance = axios.create({
    baseURL: 'https://data.covid19.go.id/public/api/'
});

export default instance;