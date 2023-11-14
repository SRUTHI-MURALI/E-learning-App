import axios from "axios";
import { Base_Url } from "../../../Config/Config";

const api = axios.create({
  baseURL: `${Base_Url}/tutor`,
});

api.interceptors.request.use(
  (config) => {
    const tutorData = localStorage.getItem("tutorData");

    const parseData = tutorData ? JSON.parse(tutorData) : null;
    const token = parseData.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

type LessonType = {
  title: string;
  description: string;
  duration: string;
  pdf: string;
  video: string;
  isActive: boolean;
};

type QuizType= {
  question : string;
  option1 : string;
  option2 : string;
  option3 : string;
  option4 : string;
  answerOption : string;
}


export const addCourse = (
  title: string,
  price: number,
  duration: number,
  description: string,
  category: string,
  photo: string,
  instructor: string
) => {
  return api.post("/addcourse", {
    title,
    price,
    duration,
    description,
    category,
    photo,
    instructor,
  });
};

export const getAllCategory = () => {
  return api.get("/getCourseCategory");
};

export const addNewLesson = (lessons: Array<LessonType>, courseId: string | undefined) => {
  return api.post("/addlessons", { lessons, courseId });
};


export const addQuiz = (
  questionset:Array<QuizType>,
  courseId: string | undefined,
  count: number
) => {
  return api.post("/addquiz", { questionset, courseId, count });
};

export const getAllCourses = () => {
  return api.get("/getallcourses");
};

export const getEditCourse = (id: string | null) => {
  return api.get(`/geteditcourse/${id}`);
};

export const editCourseList = (
  id: string | null,
  title: string,
  duration: number,
  category: string,
  price: number
) => {
  return api.put(`/editcourselist/${id}`, { title, duration, category, price });
};

export const getUser = () => {
  return api.get("/getallcourses");
};

export const getAllLessons = (id: string | undefined) => {
  return api.get(`/getalllessons/${id}`);
};

export const activateLesson = (id: string, courseId: string | undefined) => {
  return api.put(`/activatelesson/${id}`, { courseId });
};

export const inactivateLesson = (id: string, courseId: string | undefined) => {
  return api.put(`/disablelesson/${id}`, { courseId });
};

export const removeQuiz = ( id: string) => {
  console.log('remove...');
  
  return api.put(`/removequiz/${id}`);
};

export const activateQuiz = (id: string) => {
  console.log('active....');
  
  return api.put(`/activatequiz/${id}`);
};

export const tutorLogin = (email: string, password: any) => {
  return axios.post(`${Base_Url}/tutor/login`, { email, password });
};

export const getTutorProfile = (id: string) => {
  return api.get(`/gettutorprofile/${id}`);
};

export const tutorEditProfile = (
  id: string,
  name: string,
  phone: number,
  email: string,
  experience: number,
  qualification: string,
  password: any,
  about: string,
  startOnline:number,
  onlineEnd:number
) => {

  
  return api.put(`/tutoreditedprofile/${id}`, {
    name,
    phone,
    email,
    experience,
    qualification,
    password,
    about,
    startOnline,
    onlineEnd
  });
};

export const tutorSendOtp = (
  name: string,
  email: string,
  phone: number,
  password: any
) => {
  return axios.post(`${Base_Url}/tutor/sendotp`, {
    name,
    email,
    phone,
    password,
  });
};

export const getEnrolledStudents = (id: string) => {
 
  
  return api.get(`/getenrolledstudentlist/${id}`);
};

export const tutorEditPhoto = (id:string,photo:string)=>{
  
  
  return  api.put(`/editprofilephoto/${id}`,{photo});
 
}

export default api;
