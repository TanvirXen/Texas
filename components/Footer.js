
import { Container,Row,Col } from "react-bootstrap"
import Logo from '../public/logo1.svg'
import Image from "next/image"
import { useRouter } from 'next/router';
import Router from "next/router";
export default function Footer(){

    const { asPath} = useRouter();
    if (asPath.includes('admin')===true) {
        return <div> </div>
      } 

    return(
        <footer className="foot">
            <div>
             <Container>
              <Row >
                  <Col md={1}></Col>
                <Col md={5}> <p className="t2s1 mgl " style={{color:'white',marginTop:'80px'}}>We make Textile solutions <br /> accessible to everyone in <br/> Bangladesh.</p></Col>
                <Col md={5}> <p className="b1 mgl mgt" style={{color:'#C7CFDF'}}>We are a professional Trading Company for Supplying dyeing, printing and finishing machinery along with all type of printing auxiliary materials.

</p>
               <div style={{marginTop:'40px'}} className='mgl'>  <span className="btn2 button1" onClick={()=>Router.push({ pathname: '/contact-us'})}>GET IN TOUCH</span> </div>
                </Col>
                <Col md={1}></Col>
                <Col md={1}></Col>
                <Col md={5}> <div className="lgft" style={{marginTop:'60px',cursor:'pointer'}}><Image src={Logo} alt="" height={88}  onClick={()=>Router.push({ pathname: '/'})}/>  </div></Col>
                <Col md={5}>
                    <div className="menus">
                    <ul>
                                <li><a href="#" className="btn1">Facebook</a></li>
                                <li><a href="#" className="btn1">Youtube</a></li>
                                <li><a href="#" className="btn1">Linkedin</a></li>
                </ul>
                    </div>
        
                </Col>
                <Col md={1}></Col>
                <Col md={1}></Col>
                <Col md={10} > <div className="line"></div></Col>
                <Col md={1}></Col>
                <Col md={1}></Col>
                <Col md={10} >
                <div className="rowx">
                <Col xs={{ span: 12 ,order:'last' }} md={{ span: 6 ,order:'first' }}> 
                <p className="b2 ft fga" style={{color: 'rgba(225, 230, 237, 0.64)',marginTop:'10px'}}>© 2022 - TEXSAS Engineering Company LTD.</p>
                </Col>
                <Col xs={{ span: 12 ,order:'first'}} md={{ span: 6 ,order:'last' }} className='fgx'>
                <p className="b2 bhg" style={{marginRight:'10px'}}>PRIVACY POLICY</p>
               <p className="b2 bhg" >TERMS OF SERVICE</p>
                </Col>
                </div>
               <div> </div>
               <div > 
                  
               </div>
                </Col>
                <Col md={1}></Col>
              </Row>
              </Container>
            </div>
        </footer>
    )
}