import AdminHeader from "../../Components/AdminSIde/AdminHeader/AdminHeader";
import AdminSidebar from "../../Components/AdminSIde/AdminSidebar/AdminSidebar";
import AdminDashBoard from "../../Components/AdminSIde/AdminDashBoard/AdminDashBoard";

function AdminHome() {
  return (
    <div className="grid-container">
      <AdminHeader />
      <AdminSidebar />
      <AdminDashBoard />
    </div>
  );
}

export default AdminHome;
