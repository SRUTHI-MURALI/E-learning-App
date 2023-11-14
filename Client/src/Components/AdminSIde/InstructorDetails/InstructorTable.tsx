import  { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { ImArrowRight } from "react-icons/im";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import {
  blockInstructor,
  getInstructor,
  unBlockInstructor,
} from "../AxiosConfigAdmin/AxiosConfig";

interface Instructor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isBlocked: boolean;
}

function InstructorTable() {
  const [instructorList, setInstructorlist] = useState<Instructor[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const getInstructorList = async () => {
      try {
        const response = await getInstructor();
        setInstructorlist(response.data.instructor);
      } catch (error) {
        console.error(error);
      }
    };
    getInstructorList();
  }, []);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const blockStatus = async (instructor: Instructor) => {
    try {
      const result = await Swal.fire({
        title: `Are you sure you want to ${
          instructor.isBlocked ? "Unblock" : "Block"
        } the instructor "${instructor.name}"?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        if (!instructor.isBlocked) {
          await blockInstructor(instructor._id);
          instructor.isBlocked = true;
          toast.success(`Instructor "${instructor.name}" blocked successfully`);
        } else {
          await unBlockInstructor(instructor._id);
          instructor.isBlocked = false;
          toast.success(
            `Instructor "${instructor.name}" unblocked successfully`
          );
        }

        setInstructorlist([...instructorList]);
      }
    } catch (error) {
      toast.error("Error");
    }
  };

  const offset = currentPage * itemsPerPage;
  const paginatedData = instructorList.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <p className="instructorlistheading">
        <ImArrowRight /> <u>Instructor List</u>
      </p>
      <ToastContainer position="top-center"></ToastContainer>
      <Table className="mt-5 ms-5" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((instructor, index) => (
            <tr key={instructor._id}>
              <td>{index + 1}</td>
              <td>{instructor.name}</td>
              <td>{instructor.email}</td>
              <td>{instructor.phone}</td>
              <td>
                {instructor.isBlocked ? (
                  <Button
                    onClick={() => {
                      blockStatus(instructor);
                    }}
                  >
                    Unblock
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      blockStatus(instructor);
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
          pageCount={Math.ceil(instructorList.length / itemsPerPage)}
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

export default InstructorTable;
