import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import "./Footer.css";
import {AiFillFacebook} from 'react-icons/ai'
import {BsInstagram} from 'react-icons/bs'
import {BiLogoGmail} from 'react-icons/bi'
import l1 from "../../../Assets/Images/carouselBody/l1.jpeg";

function Footer() {
  return (
    <div className="mt-5">
      <Card className="footerCard">
        <Row>
          <Col xs={12} md={3}>
            <h4 style={{ textAlign: "center" }} className="mt-5 ms-5">
            Tuto 
            </h4>
            <h6 className="ms-5" style={{ textAlign: "center" }}>Integer vitae triagna. Praesent bibendum quam tellus, quis rhoncus orci cursus vel. Aenean suscipilacerat elit sit amet lacinia. Phasellus volutt ligula eget urna egestas vehicula. Proinpus est sed mauris viverra, eu congue tellus tempus. e </h6>
           
          </Col>
          <Col xs={12} md={4}>
            <h4 style={{ textAlign: "center" }} className="mt-5">
              Quick Links
            </h4>
           <h2 style={{justifyContent:'center', alignItems:'center'}}className="ms-5"><AiFillFacebook className="ms-5"/><BsInstagram className="ms-5"/><BiLogoGmail className="ms-5"/><AiFillFacebook className="ms-5" /></h2>
          </Col>

          <Col xs={12} md={3}>
          <h4 style={{ textAlign: "center" }} className="mt-5">
              Contacts
            </h4>
            <h6 style={{ textAlign: "center" }} className="mt-1">
              123 Street, New York
            </h6>
            <h6 style={{ textAlign: "center" }} className="mt-1">
              USA
            </h6>
            <h6 style={{ textAlign: "center" }} className="mt-1">
              +123 02 32145
            </h6>
            <h6 style={{ textAlign: "center" }} className="mt-1">
              tuto@gmil.com
            </h6>
          </Col>
          <Col xs={12} md={2}>
            <img src={l1}/>
           
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Footer;
