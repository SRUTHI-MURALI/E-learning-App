
import StudentHeader from '../../Components/StudentSide/StudentHeader/StudentHeader'
import BodyCarousel from '../../Components/StudentSide/HomePage/BodyCarousel/BodyCarousel'
import Card from '../../Components/StudentSide/HomePage/Cards/Cards'
import Body1 from '../../Components/StudentSide/HomePage/Body1/Body1'
import Body2 from '../../Components/StudentSide/HomePage/Body2/Body2'
import Footer from '../../Components/StudentSide/StudentFooter/Footer'

function StudentLandingPage() {
  return (
  <div>
    <StudentHeader/>
    <BodyCarousel/>
    <Card/>
    <Body1/>
    <Body2/>
    <Footer/>
  </div>
  )
}

export default StudentLandingPage
