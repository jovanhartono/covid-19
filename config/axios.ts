import axios, {AxiosInstance} from "axios";

const dev = process.env.NODE_ENV !== 'production';
const server = dev ? 'http://localhost:3000' : 'https://covid-tracker-taupe.vercel.app';

const instance: AxiosInstance = axios.create({
    baseURL: 'https://data.covid19.go.id/public/api/'
});

export default instance;
