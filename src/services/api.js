import axios from 'axios';

const api = axios.create({
  baseURL: 'https://turnoverbnb-api.herokuapp.com/api',
  // baseURL: 'https://09ee7afdc099.ngrok.io/api',
  // baseURL: 'http://localhost:8000/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Content-Type': 'application/json',
  },
});

export default api;
