import axios from "axios";

export const Base_Url = "http://localhost:3001";
export const Image_Url = "https://res.cloudinary.com/dnkc0odiw/image/upload/";
export const Course_Upload_Url =
  "https://api.cloudinary.com/v1_1/dnkc0odiw/image/upload/";
export const Lessons_Upload_Url =
  "https://api.cloudinary.com/v1_1/dnkc0odiw/video/upload/";
export const Video_Url = "https://res.cloudinary.com/dnkc0odiw/video/upload/";

const api = axios.create({
  baseURL: "http://localhost:3001" 
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

export const getUser = () => {
  return api.get('/tutor/getallcourses');
};



export default api;
