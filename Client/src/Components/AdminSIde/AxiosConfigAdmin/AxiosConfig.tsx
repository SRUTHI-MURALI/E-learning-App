import axios from "axios";
import { Base_Url } from "../../../Config/Config";

const api = axios.create({
  baseURL: `${Base_Url}/admin`,
});

api.interceptors.request.use(
  (config) => {
    const adminData = localStorage.getItem("adminData");
    const parseData = adminData ? JSON.parse(adminData) : null;
    const token = parseData.token;

    // Assuming you store the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const adminLogin = (email: string, password: string) => {
  return axios.post(`${Base_Url}/admin/login`, { email, password });
};

export const getalllessons = (id: string | undefined) => {
  return api.get(`/getalllessons/${id}`);
};

export const getorderlist = () => {
  return api.get("/getorderlist");
};

export const addCategory = (category: string, description: string) => {
  return api.post("/addcategory", { category, description });
};

export const getCategory = () => {
  return api.get("/getcategorylist");
};

export const getEditCategory = (id: string | undefined) => {
  return api.get(`/geteditcategorylist/${id}`);
};

export const editCategory = (
  id: string | undefined,
  category: string,
  description: string
) => {
  return api.put(`/editcategory/${id}`, { category, description });
};

export const getAllCourse = () => {
  return api.get("/getallcourses");
};


export const getInstructor = () => {
  return api.get("/getinstructorlist");
};

export const getStudents = () => {
  return api.get("/getstudentlist");
};

export const approveCourse = (id: string | undefined) => {
  return api.put(`/approvecourse/${id}`);
};

export const cancelCourse = (id: string | undefined) => {
  return api.put(`/cancelcourse/${id}`);
};

export const blockInstructor = (id: string | undefined) => {
  return api.put(`/blockinstructor/${id}`);
};

export const unBlockInstructor = (id: string | undefined) => {
  return api.put(`/unblockinstructor/${id}`);
};

export const activateCategory = (id: string | undefined) => {
  return api.put(`/activatecategory/${id}`);
};

export const inactivateCategory = (id: string | undefined) => {
  return api.put(`/inactivatecategory/${id}`);
};

export const getCount = () => {
  return api.get("/getstudentcount");
};
export default api;
