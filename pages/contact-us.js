import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from 'next/image'
import ship from "../public/shipment.png";
import { InlineWidget } from "react-calendly";
import { useEffect } from "react";
export default function About() {

    useEffect(() => {

    }, [])
    
	return (
		<div>
			<Navbar />
			<Container>
<Row style={{marginBottom:'70px'}}>
    <Col md={1}></Col>
    <Col md={5} className='pdlAbt'>
    <InlineWidget url="https://calendly.com/tanvirishtiaq/meeting-1" styles={{
  height: '500px'
}}  />
    </Col>
    <Col md={5} className='pdlAbt pdl20'>

    <h1 className="t2 ss1"  style={{color:'#002169'}}>TEXSAS Headquaters, Dhaka</h1>
        <p className="b2"  style={{color:'#002169'}}><a href="mailto: abc@example.com"  style={{color:'#002169',textDecoration:'underline'}}>hello@texsasbd.com</a></p>
    <p className="b2"  style={{color:'#002169'}}><a href="tel:+8801713129762"  style={{color:'#002169',textDecoration:'underline'}}>+8801713129762</a></p>
    <p className="b2"  style={{color:'#002169'}}> HOUSE # 23, LEVEL 1A, <br /> SECTOR 4, UTTARA, <br /> DHAKA-1230, <br />
BANGLADESH</p>
<br />
<p className="b2"  style={{color:'#002169'}}>TEXSAS ENGINEERING CO. LTD IS A SUCCESSFUL TRADING HOUSE WITH EXTENSIVE
EXPERIENCE ACQUIRED OVER THE YEARS IS SUPPLEMENTED BY RELIABLE SUPPLY SOURCES AND TRUSTWORTHY CUSTOMER BASE TO MEET THE CHALLENGE OF THE CURRENT BUSINESS CONTESTS.</p>  </Col>
    <Col md={1}></Col>


    {/* <Col md={1}></Col>
    <Col md={5}>
        <img src="/c1.png" alt=""  style={{width:'100%',paddingBottom:'20px'}} />
    </Col>
    <Col md={5}>
       <div className="rowx">
           <Col md={12}>
           <img src="/c2.png" alt="" style={{width:'100%'}} />
           </Col>
           <Col md={12}>
           <img src="/c3.png" alt=""  style={{width:'100%',paddingTop:'20px' ,paddingBottom:'20px'}} />
           </Col>
       </div>
    </Col>
    <Col md={1}></Col> */}

</Row>
            </Container>
        
			<Footer />
		</div>
	);
}
