import Head from "next/head";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import firebase from "firebase/app";
import CardF from "../../components/cardF";
import { useState, useEffect } from "react";
import Loader from "../../components/loader";
import meta from '../../public/meta.png'
const db = firebase.firestore();



 function Brand(props) {
	const [Load, setLoad] = useState(true);
	const [Cards, setCards] = useState([]);
	function map() {
		let obj = [];
		for (let i = 0; i < props.data.length; i++) {
			obj.push(JSON.parse(props.data[i]));
		}
		setCards(obj);
		setLoad(false);
	}

	useEffect(() => {
	map()
	}, []);
	if (Load === true) {
		return <Loader />;
	}
	return (
		<div>
			<Head>
				<title>Texas- Brands </title>
				<meta name="title" content="Texas- Brands" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://www.texsasbd.com/" />
				<meta
					property="og:title"
					content="Texas- Brands"
				/>
				<meta
					property="og:description"
					content="Connecting you to the world’s leading Textile Solutions with top class service."
				/>
				<meta
					property="og:image"
					content={meta}
				/>
			</Head>
			<div>
				<Navbar />
				<Container>
                    <Row className="snt ">
                    <Col md={1}></Col>
				
                        <Col md={10}>	<p className="t2" style={{ color: "#002169" }}>
					
					<br />
							Our Brands
						</p></Col>
                        <Col md={1}></Col>
                        <Col md={1}></Col>
                        <Col md={10}>
                            <div className='rowx'>
                            {Cards.map((e) => {
									return (
										<CardF
											name={e.name}
											key={e.name}
											category={e.category}
											title={e.title}
											url={e.logob}
                                            origin={e.origin}
										/>
									);
								})}
							
                            </div>
							<br />
								<br />
                        </Col>
					
                                <Col md={1}></Col>
							</Row>

				</Container>
				<Footer />
			</div>
		</div>
	);
}
export async function getStaticProps() {
	let obj = [];
	let r = [];
	await db
	.collection("Brands")
		.get()
		.then((docs) => {
			docs.forEach((doc) => {
				r = JSON.stringify(doc.data());
				obj.push(r);
			});
		});
	return {
		props: { data: obj },

		revalidate: 2000,
	};
}
export default Brand;