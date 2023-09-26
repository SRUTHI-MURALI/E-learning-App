import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { ImArrowRight } from "react-icons/im";
import { Base_Url } from "../../../Config/Config";
import axios from "axios";
import ReactPaginate from "react-paginate";

function AdminOrderTable() {
  const [orderList, setOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const itemsPerPage = 4;

  useEffect(() => {
    axios
      .get(`${Base_Url}/admin/getorderlist`)
      .then((response) => {
        setOrderList(response.data.orders);
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
      <p className="studentlistheading">
        <ImArrowRight /> <u>Order History</u>
      </p>
      <Table className="mt-5 ms-5" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>OrderId</th>
            <th>Course Name</th>
            <th>Student Name</th>
            <th>Instructor Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((orders, index) => (
            <tr key={orders._id}>
              <td>{index + 1}</td>
              <td>{orders?._id}</td>
              <td>{orders?.courseDetails?.title}</td>
              <td>{orders?.studentDetails?.name}</td>
              <td>{orders?.courseDetails?.instructor?.name}</td>
              <td>{orders?.courseDetails?.price}</td>
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

export default AdminOrderTable;
