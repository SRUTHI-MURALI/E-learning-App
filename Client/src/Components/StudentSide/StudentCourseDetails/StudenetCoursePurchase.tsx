

import { Button, Card, Container, Row } from "react-bootstrap";
import { Image_Url } from "../../../Config/Config";
import { useNavigate } from "react-router-dom";
import {
  makePayment,
  verifyPayment,
} from "../AxiosConfigStudents/AxiosRazorpayConfig";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface StudentCoursePurchaseProps {
  courseData: any;
}
function StudenetCoursePurchase({ courseData }: StudentCoursePurchaseProps) {
  const studentDetails = localStorage.getItem("studentData");

  const students = studentDetails ? JSON.parse(studentDetails) : null;
  const navigate = useNavigate();

  const initPayment = (res: any) => {
    const options = {
      key: "rzp_test_k3gSFHEQ2G2e8U",
      amount: res.amount,
      name: courseData?.title,
      currency: res.currency,
      order_id: res.id,
      handler: async (response: any) => {
        const verifyRazorPay = async (
          response: any,
          studentId: string,
          courseId: string
        ) => {
          try {
            await verifyPayment(response, studentId, courseId);
          } catch (error) {
            console.log(error);
          }
        };

        verifyRazorPay(response, students._id, courseData?._id);
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (students) {
      const makeRazorPay = async (id:any) => {
        try {
          e.preventDefault();
          const res = await makePayment(id);
          initPayment(res.data.data);
          
        } catch (error) {
          console.log(error);
        }
      };

   await  makeRazorPay(courseData._id);
      
    } else {
      navigate("/studentlogin");
    }
   
  };

  

  return (
    <div>
      <Container  className=" text-center m-5">
        <Row style={{marginTop:'280px'}}>
          <Card className="mt-5">
            <Card.Body>
              <img
                style={{ width: "200px" }}
                src={`${Image_Url}/${courseData?.photo}`}
              />
              <Card.Title
                style={{
                  color: "rgb(80, 100, 198)",
                  fontWeight: "bolder",
                  fontSize: "30px",
                  margin: "15px",
                }}
              >
                Enroll Now{" "}
              </Card.Title>
              <Card.Text>Rate: {courseData?.price}</Card.Text>
              <Card.Text>Duration:{courseData?.duration} </Card.Text>
              <Card.Text>Ratings: 4.5</Card.Text>
              <Card.Text>Offers: 20 %</Card.Text>
              <Card.Text>Instructor: {courseData?.instructor?.name}</Card.Text>
              <Button onClick={handlePayment}>Buy Now </Button>
              <Card.Text>Start your learning Now !!!</Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default StudenetCoursePurchase;
