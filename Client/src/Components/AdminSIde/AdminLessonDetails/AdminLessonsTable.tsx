import Table from "react-bootstrap/Table";
import { ImArrowRight } from "react-icons/im";
import { useState, useEffect } from "react";
import "../CourseDetails/CourseTable.css";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import { getalllessons } from "../AxiosConfigAdmin/AxiosConfig";
import { Video_Url } from "../../../Config/Config";

function AdminLessonsTable() {
  const [lessonsList, setLessonslist] = useState([]);

  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const itemsPerPage = 5;

  const { id } = useParams();

  useEffect(() => {
    const getLessons = async () => {
      try {
        console.log(id);
        
        const response = await getalllessons(id);
        setLessonslist(response.data.allLessons);
      } catch (error) {
        console.log(error);
      }
    };
    getLessons();
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedData = lessonsList.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <p className="studentlistheading">
        <ImArrowRight /> <u>Lessons List</u>
      </p>

      <Table className="mt-5 ms-5" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Video</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((lessons, index) => (
            <tr key={lessons._id}>
              <td>{index + 1}</td>
              <td>{lessons?.title}</td>

              <td>{lessons?.description}</td>
              <td>{lessons?.duration}</td>

              <td>
              <video
                          src={`${Video_Url}/${lessons?.video}`}
                          alt="sample"
                          style={{ width: "40px" }}
                          controls
                        />{" "}
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
          pageCount={Math.ceil(lessonsList.length / itemsPerPage)}
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

export default AdminLessonsTable;
