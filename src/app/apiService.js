import axios from "axios";
import { API_URL } from "./config";

const apiService = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor
apiService.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
apiService.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

// apiService.interceptors.request.use((request) => {
//   //console.log("Start Request", request);
//   return request;
// });

// apiService.interceptors.response.use(
//   (response) => {
//     //console.log("Response", response);
//     return response;
//   },
//   (error) => {
//     //console.log("Response error", error);
//     return error;
//   }
// );

export default apiService;
