import axios from "axios";
import { API_URL } from "./config";

const apiService = axios.create({
  baseURL: API_URL,
});

apiService.interceptors.request.use((request) => {
  //console.log("Start Request", request);
  return request;
});

apiService.interceptors.response.use(
  (response) => {
    //console.log("Response", response);
    return response;
  },
  (error) => {
    // console.log("Response error", error);
    return error;
  }
);

export default apiService;
