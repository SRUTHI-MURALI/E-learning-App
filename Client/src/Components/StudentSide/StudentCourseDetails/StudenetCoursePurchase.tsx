/* eslint-disable no-mixed-spaces-and-tabs */

import { Button, Card, Container, Row } from 'react-bootstrap'
import { Base_Url, Image_Url } from '../../../Config/Config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    Razorpay: any;
  }
}


function StudenetCoursePurchase({data}) {
 
  const studentDetails=localStorage.getItem("studentData")

  const students=JSON.parse(studentDetails)
  const navigate= useNavigate()
  
  const initPayment = (res:any) => {
  
    
		const options = {
			key:"rzp_test_k3gSFHEQ2G2e8U",
			amount: res.amount,
      name:data?.title,
      currency:res.currency,
      order_id:res.id,
			handler: async (response:any) => {
				try {
          
          
					 await axios.post(`${Base_Url}/Razorpay/verifypayment`,{
            response,
            studentId:students._id,
            courseId:data?._id,
          });
					
				
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

    const handlePayment=async(e)=>{
      if(students){
        try {
          e.preventDefault();
          const res=await axios.post(`${Base_Url}/Razorpay/makepayment/${data._id}`)
         
          initPayment(res.data.data);
          
        } catch (error) {
          console.log(error);
           
        }
          
      }else{
        navigate('/studentlogin')
      }
    
    }
  
    return (
        <div >
          <Container className=" text-center m-5">
          <Row>
          <Card className='mt-5'>

          <Card.Body >
          <img style={{width:"200px"}} src={`${Image_Url}/${data?.photo}`} />
            <Card.Title style={{color:'rgb(80, 100, 198)',fontWeight:'bolder',fontSize:'30px', margin:'15px'}}>Enroll Now </Card.Title>
            <Card.Text >Rate: {data?.price}</Card.Text>
            <Card.Text >Duration:{data?.duration} </Card.Text>
            <Card.Text >Ratings: 4.5</Card.Text>
            <Card.Text>Offers: 20 %</Card.Text>
            <Card.Text>Instructor: {data?.instructor?.name}</Card.Text>
            <Button onClick={handlePayment}>Buy Now </Button> 
            <Card.Text>Start your learning Now !!!</Card.Text>
          </Card.Body>
         
        </Card>
          </Row>
          </Container>
        </div>
      )
    
}

export default StudenetCoursePurchase
