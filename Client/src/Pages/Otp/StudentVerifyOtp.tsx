
import StudentOtpVerifyForm from "../../Components/Otp/StudentOtpVerifyForm";
import { useParams } from "react-router-dom";

function StudentVerifyOtp() {
  const { phone } = useParams();
  return (
    <div>
      <StudentOtpVerifyForm phone={phone} />
    </div>
  );
}

export default StudentVerifyOtp;
