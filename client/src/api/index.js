import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT;

export const Login = (params) => {
  return axios.post(`/api/login`, params).then((res) => res);
};
export const GetUser = (params) => {
  return axios.get(`/api/getUser`, { params }).then((res) => res);
};
export const EndGame = (params) => {
  return axios.post(`/api/endGame`, params).then((res) => res);
};
