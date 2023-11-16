
import StudentOtpVerifyForm from "../../Components/Otp/StudentOtpVerifyForm";
import { useParams } from "react-router-dom";

function StudentVerifyOtp() {
  const { email } = useParams<{ email: string }>();
  return (
    <div>
      <StudentOtpVerifyForm email={email ? email : null} />
    </div>
  );
}

export default StudentVerifyOtp;
