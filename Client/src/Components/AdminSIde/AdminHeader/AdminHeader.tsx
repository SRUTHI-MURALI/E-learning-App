import React from "react";
import { BsPersonCircle, BsJustify } from "react-icons/bs";
import "../Css/Admin.css";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../ReduxComponents/AdminSlice";
import { Button } from "react-bootstrap";

function AdminHeader() {
  

  const navigate= useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    localStorage.removeItem("adminData");  
    await dispatch(logout);
    navigate("/adminlogin");
  };
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" />
      </div>
      <div className="header-left">
        <h3 style={{ color: "#fff" }}>Admin</h3>
      </div>
      <div className="header-right">
        <Button
          onClick={handleLogout}>
          Logout
          </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
