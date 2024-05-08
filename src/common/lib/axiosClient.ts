import axios from 'axios';

export const instance = axios.create({
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: 'http://localhost:3001',
});
