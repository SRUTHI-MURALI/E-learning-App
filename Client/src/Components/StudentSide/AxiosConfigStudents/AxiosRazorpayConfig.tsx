import axios from "axios";
import { Base_Url } from "../../../Config/Config";

const api = axios.create({
    baseURL: `${Base_Url}/Razorpay`
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  export const makePayment = (id: string) => {
    return api.post(`/makepayment/${id}`);
  };

  export const verifyPayment = (response: any,studentId: string,courseId: string) => {
    return api.post('/verifypayment',{response,studentId,courseId});
  };

  export default api