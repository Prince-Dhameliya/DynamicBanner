import axios from 'axios';
const BASE_URL = 'https://dynamic-banner-service.vercel.app/api';

export default axios.create({
    baseURL: BASE_URL
});