
import StudentOtpVerifyForm from "../../Components/Otp/StudentOtpVerifyForm";
import { useParams } from "react-router-dom";

function StudentVerifyOtp() {
  const { phone } = useParams<{ phone: string }>();
  return (
    <div>
      <StudentOtpVerifyForm phone={phone ? +phone : null} />
    </div>
  );
}

export default StudentVerifyOtp;
