import Table from "react-bootstrap/Table";
import { ImArrowRight } from "react-icons/im";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import "./StudentTable.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Base_Url } from "../../../Config/Config";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import { getStudents } from "../AxiosConfigAdmin/AxiosConfig";

function StudentTable() {
  const [studentList, setStudentlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const itemsPerPage = 2;

  useEffect(() => {

    const getStudentsList = async()=>{
      try {
        const response = await getStudents()
        setStudentlist(response.data.students);

      } catch (error) {
        console.error(error);
      }
    }
    getStudentsList()
    
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const blockStatus = async (student: any) => {
    try {
      // Display a confirmation dialog using SweetAlert
      const result = await Swal.fire({
        title: `Are you sure you want to ${
          student.isBlocked ? "UnBlock" : "Block"
        } the student "${student.name}"?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        if (!student.isBlocked) {
          await axios.put(`${Base_Url}/admin/blockstudent/${student._id}`);
          student.isBlocked = true;
          toast.success(`student "${student.name}" blocked successfully`);
        } else {
          await axios.put(`${Base_Url}/admin/unblockstudent/${student._id}`);
          student.isBlocked = false;
          toast.success(`student "${student.name}" unblocked successfully`);
        }

        setStudentlist([...studentList]);
      }
    } catch (error) {
      // Handle errors and display an error message to the user
      toast.error("Error");
    }
  };

  const offset = currentPage * itemsPerPage;
  const paginatedData = studentList.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      <p className="studentlistheading">
        <ImArrowRight /> <u>Student List</u>
      </p>

      <Table className="mt-5 ms-5" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th> Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>
                {student.isBlocked ? (
                  <Button
                    onClick={() => {
                      blockStatus(student);
                    }}
                  >
                    Unblock
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      blockStatus(student);
                    }}
                  >
                    Block
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={{ float: "right", margin: "3px" }}>
        <ReactPaginate
          previousLabel={"Previous "}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(studentList.length / itemsPerPage)}
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

export default StudentTable;
