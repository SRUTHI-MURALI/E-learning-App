import Table from "react-bootstrap/Table";
import { ImArrowRight } from "react-icons/im";

import { useState, useEffect } from "react";
import axios from "axios";
import "./TutorStudentTable.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Base_Url } from "../../../Config/Config";
import ReactPaginate from "react-paginate";

function TutorStudentTable() {
  const [orderList, setOrderlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const itemsPerPage = 2;

  const tutorData = localStorage.getItem("tutorData");
  const parseData = JSON.parse(tutorData);

  useEffect(() => {
    axios
      .get(`${Base_Url}/tutor/getenrolledstudentlist/${parseData._id}`)
      .then((response) => {
        setOrderlist(response.data.filteredOrders);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedData = orderList.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      <p className="tutorstudentlistheading">
        <ImArrowRight /> <u>Student List</u>
      </p>

      <Table className="mt-5 ms-5" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Enrolled Course</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order?.studentDetails?.name}</td>
              <td>{order?.studentDetails?.email}</td>
              <td>{order?.studentDetails?.phone}</td>
              <td>{order?.courseDetails?.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={{ float: "right", margin: "3px" }}>
        <ReactPaginate
          previousLabel={"Previous "}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(orderList.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"pagination"} // Remove one of the containerClassName attributes
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

export default TutorStudentTable;
