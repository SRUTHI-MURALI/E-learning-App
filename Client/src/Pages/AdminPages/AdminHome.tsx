import {useEffect} from 'react'
import AdminHeader from "../../Components/AdminSIde/AdminHeader/AdminHeader";
import AdminSidebar from "../../Components/AdminSIde/AdminSidebar/AdminSidebar";
import AdminDashBoard from "../../Components/AdminSIde/AdminDashBoard/AdminDashBoard";
import { useNavigate } from 'react-router-dom';

function AdminHome() {

  const adminData = localStorage.getItem("adminData");
  const parseData = JSON.parse(adminData);

  const navigate = useNavigate()

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    const parseData = JSON.parse(adminData);
    if (!parseData) {
      navigate("/adminlogin");
    }
  }, [navigate]);
 
  return (
    <>
   {parseData && (
    <div className="grid-container">
    <AdminHeader />
    <AdminSidebar />
    <AdminDashBoard />
  </div>
   )}
       
   
   
    </>
  );
}

export default AdminHome;
