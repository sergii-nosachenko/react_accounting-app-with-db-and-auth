import axios from 'axios';

export function createClient() {
  return axios.create({
    baseURL: 'https://node-accounting-app-with-db-and-auth.onrender.com',
    withCredentials: true,
    timeout: 10000,
  });
}
