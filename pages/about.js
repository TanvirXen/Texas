import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import ship from "../public/shipment.png";
export default function About() {
	return (
		<div>
			<Navbar />
			<Container className="abtHero">
				<Row>
					<Col md={1}></Col>
					<Col md={10}>
						<div className="rowx">
							<Col md={6}>
								<h1 className="t1s1 mtn" style={{ color: "#002169" }}>
									We are a One Stop Textile Solutions and Service provider in
									Bangladesh
								</h1>
								<p
									className="b1 "
									style={{ color: "#002169", paddingBottom: "50px" }}
								>
									From finding the best Textile solution for you, to servicing
									of products; TEXSAS aims to be the one place you need to come
									for all your needs!
								</p>
							</Col>
							<Col md={6}></Col>
						</div>
					</Col>
					<Col md={1}></Col>
				</Row>
			</Container>
			<Container>
				<Row>
					<Col md={1}></Col>
					<Col md={5}>
						<br />
						<br />
						<iframe
									style={{ width: "100%", height: "500px" }}
									src="https://www.youtube.com/embed/NYF0bFkLxWA?autoplay=1&cc_load_policy=1&mute=1&loop=1"
									title="YouTube video player"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe>
						<br />
						<br />
					</Col>
					<Col md={5} className="pdl20">
						<p className="overline abt" style={{ color: "#526899" }}>
							About us
						</p>
						<h1 className="t2 ss1" style={{ color: "#002169" }}>
							We are a Textile Printing Company supporting the Garments industry
							in Bangladesh
						</h1>
						<p
							className="b1"
							style={{ color: "#526899", paddingBottom: "30px" }}
						>
							We are a professional Trading Company for Supplying dyeing,
							printing and finishing machinery along with all type of printing
							auxiliary materials.
						</p>
					</Col>
					<Col md={1}></Col>
				</Row>
			</Container>
			<Container style={{ backgroundColor: "#F4F6F9" }}>
				<Row>
					<Col md={1}></Col>
					<Col md={8} className="pdl20">
						<p className="overline mggg" style={{ color: "#526899" }}>
							Our mission
						</p>
						<p className="t2 ss1" style={{ color: "#002169" }}>
							We are consistent on our mission to bring you the best Textile
							Solutions and Services.
						</p>
					</Col>
					<Col md={3}></Col>

					<Col md={1}></Col>
					<Col md={10} className="pdl20">
						<div
							className="rowx mggy"
							style={{ paddingTop: "30px", paddingBottom: "40px" }}
						>
							<Col md={4}>
								<p className="s1 ss1" style={{ color: "#002169" }}>
									Client Value Creation
								</p>
								<p className="b2 pd" style={{ color: "#526899" }}>
									OUR BIGGEST PRIORITY AS AN INTERNATIONAL TRADING ORGANIZATION
									AS WELL AS A BUSINESS & FINANCIAL CONSULTANT IS TO BRING FORTH
									VALUE TO OUR CLIENTS IN TERMS OF NEGOTIATION, PRODUCT QUALITY
									AND PRICING. WE BELIEVE THAT VALUE CREATION IS AN ESSENTIAL
									PART TO CLIENT SATISFACTION AND BUSINESS SUCCESS.
								</p>
							</Col>

							<Col md={4}>
								<p className="s1 ss1" style={{ color: "#002169" }}>
									Trustworthiness & Transparency
								</p>
								<p className="b2 pd" style={{ color: "#526899" }}>
									COMMUNICATING HONESTLY AND CREATING RELATIONSHIPS IS A BIG
									PART OF WHO WE ARE. WE BELIEVE THAT TRUSTWORTHINESS AND
									TRANSPARENCY ARE VITAL ELEMENTS IN RETAINING AND CREATING
									SUCCESSFUL FUTURE BUSINESS RELATIONSHIPS.
								</p>
							</Col>

							<Col md={4}>
								<p className="s1 ss1" style={{ color: "#002169" }}>
									Integrity
								</p>
								<p className="b2 pd" style={{ color: "#526899" }}>
									{" "}
									WE ABIDE BY THE RULES AND REGULATIONS OF BUSINESS SOCIETY. WE
									BELIEVE THAT COMMUNICATING ETHICALLY AND MORALLY TOWARDS OUR
									CUSTOMERS IS ESSENTIAL TO CORPORATE GROWTH AND STRENGTH.{" "}
								</p>
							</Col>
							<Col md={4}>
								<p className="s1 ss1" style={{ color: "#002169" }}>
									Innovation
								</p>
								<p className="b2 pd" style={{ color: "#526899" }}>
									RESPONDING INNOVATIVELY TO DIFFICULT SOLUTIONS IS WHAT SETS US
									APART FROM OUR COMPETITORS. WE BELIEVE THAT THIS HELPS US GAIN
									A FRESH NEW PERSPECTIVE TO PROBLEM SOLVING.
								</p>
							</Col>
							<Col md={4}>
								<p className="s1 ss1" style={{ color: "#002169" }}>
									Success
								</p>
								<p className="b2 pd" style={{ color: "#526899" }}>
									NOW WE ARE CO-OPERATING WITH MORE THAN 60 COMPANIES WHO ARE
									DIRECTLY USE OUR MACHINES AND PROVIDING AFTER SALES SERVICE
									SUCESSFULLY.
								</p>
							</Col>
						</div>
					</Col>
					<Col md={1}></Col>
				</Row>
			</Container>
			<Container>
				<Row>
					<Col md={1}></Col>
					<Col md={5}>
						<br />
						<br />
						<img
							src="/garment.png"
							alt=""
							style={{ width: "100%", height: "auto" }}
						/>
						<br />
						<br />
					</Col>
					<Col md={5} className="pdl20">
						<p className="overline abt" style={{ color: "#526899" }}>
							History
						</p>
						<h1 className="t2 ss1" style={{ color: "#002169" }}>
							We are a Textile Printing Company supporting the Garments industry
							in Bangladesh
						</h1>
						<p
							className="b1"
							style={{ color: "#526899", paddingBottom: "30px" }}
						>
							We are a professional Trading Company for Supplying dyeing,
							printing and finishing machinery along with all type of printing
							auxiliary materials.
						</p>
					</Col>
					<Col md={1}></Col>
				</Row>
			</Container>
			<Container>
				<Row>
                <Col md={1}></Col>
					<Col md={8}>
						<p className="overline mggg" style={{ color: "#526899" }}>
							Our mission
						</p>
						<p className="t2 ss1" style={{ color: "#002169" }}>
							We are consistent on our mission to bring you the best Textile
							Solutions and Services.
						</p>
					</Col>
					<Col md={3}></Col>
					<Col md={1}></Col>
					<Col md={10}>
<Row>
<Col md={4}>
                            <div><img src="/anik.jpg" alt=""  style={{ width: "95%", height: "auto" }}/></div>
                            <div>
                            <p className="s1" style={{ color: "#002169" }}>MD. Amirul Islam</p>
                            <p className="b1" style={{ color: "#526899",paddingBottom:'18px' }}>Managing Director</p>
                            </div>
                            </Col>
                            <Col md={4}>
                            <div><img src="/anik.jpg" alt=""  style={{ width: "95%", height: "auto" }}/></div>
                            <div>
                            <p className="s1" style={{ color: "#002169" }}>MD. Amirul Islam</p>
                            <p className="b1" style={{ color: "#526899" ,paddingBottom:'18px'}}>Managing Director</p>
                            </div>
                            </Col>
                            <Col md={4}>
                            <div><img src="/anik.jpg" alt=""  style={{ width: "95%", height: "auto" }}/></div>
                            <div>
                            <p className="s1" style={{ color: "#002169" }}>MD. Amirul Islam</p>
                            <p className="b1" style={{ color: "#526899",paddingBottom:'38px' }}>Managing Director</p>
                            </div>
                            </Col>
</Row>
                        
                        
                        
                        </Col>
					<Col md={1}></Col>
				</Row>
			</Container>
			<Footer />
		</div>
	);
}
