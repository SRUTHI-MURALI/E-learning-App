import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { ImArrowRight } from "react-icons/im";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { getEnrolledStudents } from "../AxiosConfigInstructors/AxiosConfig";

interface Order {
  _id: string;
  studentDetails: {
    name: string;
    email: string;
    phone: string;
  };
  courseDetails: {
    title: string;
  };
}

function TutorStudentTable() {
  const [orderList, setOrderlist] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const itemsPerPage = 10;

  const tutorData = localStorage.getItem("tutorData");
  const parseData = tutorData ? JSON.parse(tutorData) : null;

  useEffect(() => {
    const enrolledStudents = async (id: string) => {
      try {
        const response = await getEnrolledStudents(id);
        setOrderlist(response.data.filteredOrders);
       
      } catch (error) {
        console.log(error);
      }
    };

    if (parseData) {
      enrolledStudents(parseData._id);
    }
  }, [parseData]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedData = orderList.slice(offset, offset + itemsPerPage);

  return (
    <>
      {paginatedData.length !== 0 ? (
        <div>
          <ToastContainer position="top-center" autoClose={3000} />
          <p className="studentlistheading">
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
      ) : (
        <h2 style={{ color: "red", fontStyle: "italic", margin: "8rem" }}>
          Sorry No enrolled students available!
        </h2>
      )}
    </>
  );
}

export default TutorStudentTable;
