import axios from "./axios.js";

export const loginRequest = async (user) => axios.post('/api/users/login', user);