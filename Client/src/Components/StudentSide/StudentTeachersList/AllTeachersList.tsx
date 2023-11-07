import React, { useEffect, useMemo, useState } from 'react'
import SearchBarContainer from '../SearchBar/SearchBarContainer'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Image_Url } from '../../../Config/Config'
import ReactPaginate from 'react-paginate'
import {FaBackward} from 'react-icons/fa'
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import './AllTeachersList.css'

function AllTeachersList({tearcherData}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchedCourses, setSearchedCourses] = useState([]);
  
console.log(searchedCourses,'kjjl');

  const filteredCourses = searchedCourses.length > 0 ? searchedCourses : tearcherData;
  
  const PageSize = 8;
  const pageCount = Math.ceil(filteredCourses.length / PageSize);

  const currentTableData = useMemo(() => {
    const firstPage = currentPage * PageSize;
    const lastPage = Math.min(firstPage + PageSize, filteredCourses.length);
    return filteredCourses.slice(firstPage, lastPage);
  }, [currentPage, filteredCourses]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };




  
  return (
    <>
    <SearchBarContainer setSearchedCourses={setSearchedCourses}  />
    <Container  className="mt-5">
      <>
    <Row>
    {currentTableData.map((tutor, index) => (
        
        
        <Col md={3} key={tutor._id}>
          <Link
            style={{ textDecoration: "none" }}
            to={`/tutordetails/${tutor?._id}`}
          >
            <div style={{ width: "18rem" ,height:'25rem'}}>
              <Card.Img style={{ height: "14rem" }} variant="top" src={`${Image_Url}/${tutor?.photo}`} />
              <Card.Body>
                <Card.Title className="text-center" > {tutor?.name}</Card.Title>
                <Card.Text className="text-center m-2" style={{color:'white'}}>
                  Experience:
                  {tutor?.experience} Years
                </Card.Text>
                <Card.Text className="text-center" style={{color:'white'}}>
                  Specialized in : 
                   {tutor?.qualification}
                </Card.Text>

               
              </Card.Body>
            </div>
            
          </Link>
        </Col>
      ))}
    </Row>
      </>
      <ReactPaginate 
          previousLabel={<FaBackward />}
          nextLabel={<TbPlayerTrackNextFilled />}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          
          activeClassName={"active"}
        />
    </Container>
    </>
  
  )
}

export default AllTeachersList
