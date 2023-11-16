
import { useParams } from "react-router-dom";
import TutorOtpVerifyForm from "../../Components/Otp/TutorOtpVerifyForm";

function TutorVerifyOtp() {
  const { email } = useParams<{ email: string }>();
  return (
    <div>
      <TutorOtpVerifyForm email={email ? email : null}/>
    </div>
  );
}

export default TutorVerifyOtp;
