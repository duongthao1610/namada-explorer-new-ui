import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.nodejom.xyz/',
});

export default instance;
