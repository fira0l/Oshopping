// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1000', 
});

export default api;