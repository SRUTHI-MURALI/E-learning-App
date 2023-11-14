import  { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { ImArrowRight } from "react-icons/im";

import ReactPaginate from "react-paginate";
import { getorderlist } from "../AxiosConfigAdmin/AxiosConfig";

function AdminOrderTable() {
  const [orderList, setOrderList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await getorderlist();
        setOrderList(response.data.orders);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  const handlePageChange = ({ selected }: { selected: number }) => {
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
