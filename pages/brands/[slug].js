import Link from "next/link";
import firebase from "firebase";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LanguageIcon from "@mui/icons-material/Language";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import CardE from "../../components/cardE";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Head from "next/head";
import Image from 'next/image'
const db = firebase.firestore();

function Brand(props) {
	const post = JSON.parse(props.data);
    const card = props.card;
    var settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		arrows: false,
		initialSlide: 0,
		centerMode: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					dots: false,
					infinite: false,
					speed: 500,
					slidesToShow: 3,
					slidesToScroll: 3,
					arrows: false,
					initialSlide: 3,
				},
			},
			{
				breakpoint: 600,
				settings: {
					dots: false,
					infinite: false,
					speed: 500,
					slidesToShow: 1.8,
					slidesToScroll: 1.8,
					arrows: false,
					initialSlide: 1.8,
				},
			},
			{
				breakpoint: 480,
				settings: {
					dots: false,
					infinite: false,
					speed: 500,
					slidesToShow: 1.3,
					slidesToScroll: 1.3,
					arrows: false,
					initialSlide: 1.3,
				},
			},
		],
	};
	let support;
	if (card.length !== 0) {
		support = (
			<Slider {...settings}>
				{card.map((e) => (
					<CardE
						name={e.name}
						key={e.pid}
						category={e.category}
						img={e.urls[0]}
						title={e.title}
						brand={e.brandLogo}
						pid={e.pid}
					/>
				))}
			</Slider>
		);
	} else {
		support = <div style={{textAlign:'center'}}> <p className="s1" style={{ color: "#002169",marginTop:'20px' }}>Sorry, No Products found.</p></div> ;
	}
	return (
		<div>
			<Head>
			<title>{"Texas-"+post.name}</title>
			<meta name="title" content={"Texas-"+post.name }/>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://www.texsasbd.com/" />
				<meta
					property="og:title"
					content={"Texas-"+post.name }
				/>
				<meta
					property="og:description"
					content={post.description}
				/>
				<meta
					property="og:image"
					content={post.logo}
				/>
			</Head>
			<Navbar />
			<Container style={{ minHeight: "56vh" ,paddingTop:'60px' }}>
				<Row>
					<Col md={1}></Col>
					<Col md={10}>
						<div className="rowx margin60t" >
							<Col xs={12} md={3} >
								<img src={post.logob} alt="" className="centerM" style={{filter: "drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.08))",width:'100%',height:'auto'}}/>
							</Col>
							<Col md={1}></Col>
							<Col md={8}>
								<h1 className="t2 margin25t" style={{ color: "#002169" }}>
									{post.name}
								</h1>
                                <span className="b1" style={{ color: "#0062FF" }}>
									<LanguageIcon /> <span style={{textDecoration:'underline'}}> <a href={post.website}>{post.website}</a> </span> 
								</span>
                                <br />
								<span className="b1" style={{ color: "#0062FF" }}>
									<InfoOutlinedIcon /> <span style={{ color: "#294581" }}>{post.category} </span>
								</span>
								<br />
								<span className="b1" style={{ color: "#0062FF" }}>
									<FmdGoodOutlinedIcon /><span style={{ color: "#294581" }}>{post.origin} </span>
								</span>
                                <br />
                                <br />
                                <h2 className="s1" style={{color:'#002169'}}>Description</h2>
                                <p className="b1" style={{color:'#294581'}}>{post.description}</p>
							</Col>
						</div>
					</Col>
					<Col md={1}></Col>
				</Row>
			</Container>
            <Container>
                <Row>
                <Col md={1}></Col>
                <Col md={11} className='mggy'>
                <p className="t2s1 spds" style={{color:'#002169'}}>Products by the brand</p>
        
               
								{support}
                </Col>
                  
                </Row>
            </Container>
			<Footer />
		</div>
	);
}
export async function getStaticProps({ params }) {
	const slug = params.slug;
	let obj = [];
    let ob= []
	await db
		.collection("Brands")
		.doc(slug)
		.get()
		.then((doc) => {
			obj = JSON.stringify(doc.data());
		});
        await db
        .collection("Products")
        .where("brand", "==", slug)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                ob.push(doc.data());
            });
        })
	return {
		props: { data: obj, card:ob },
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every 10 seconds
		revalidate: 2000, // In seconds
	};
}
export async function getStaticPaths() {
	let obj = [];
	await db
		.collection("Brands")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				obj.push(doc.data());
			});
		});

	const paths = obj.map((post) => ({ params: { slug: post.name } }));

	return { paths, fallback: "blocking" };
}

export default Brand;
