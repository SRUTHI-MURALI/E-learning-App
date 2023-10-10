import axios from "axios";
import { Base_Url } from "../../../Config/Config";

const api = axios.create({
  baseURL: `${Base_Url}/student`,
});

api.interceptors.request.use(
  (config) => {
    const studentData = localStorage.getItem("studentData");
    console.log("kkkk", studentData);
    const parseData = JSON.parse(studentData);
    const token = parseData.token;
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getInstructors = () => {
  return api.get("/getalltutors");
};

export const getAllCourses = () => {
  return api.get("/getallcourses");
};

export const getEnrolledCourses = (id: string) => {
  return api.get(`/getenrolledcourses/${id}`);
};

export const googleLogin = (id_token: any) => {
  return api.post(`/getenrolledcourses/${id_token}`);
};

export const studentLogin = (email: string, password: string) => {
  return axios.post(`${Base_Url}/student/login`, { email, password });
};

export const getStudentProfile = (id: string) => {
  return api.get(`/getstudentprofile/${id}`);
};

export const getStudentEditProfile = (
  id: string,
  name: string,
  phone: string,
  email: string,
  password: string,
  gender: string,
  photo: string,
  age: string,
  country: string
) => {
  return api.put(`/getstudentprofile/${id}`, {
    name,
    phone,
    email,
    password,
    gender,
    photo,
    age,
    country,
  });
};

export const studentSendOtp = (
  name: string,
  email: string,
  phone: number,
  password: any
) => {
  return axios.post(`${Base_Url}/student/sendotp`, {
    name,
    email,
    phone,
    password,
  });
};

export const getTutorProfile = (id: string) => {
  return api.get(`/gettutordetails/${id}`);
};

export default api;
