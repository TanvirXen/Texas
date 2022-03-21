import Head from "next/head";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Marquee from "react-easy-marquee";
import { useState, useEffect, useRef } from "react";
import firebase from "firebase/app";
import ship from "../public/shipment.png";
import nextR from "../public/arrowR.svg";
import nextL from "../public/arrowL.svg";
import Slider from "react-slick";
import CardE from "../components/cardE";
import CardR from "../components/Rcard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Router from "next/router";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import { DataContext } from "../components/context";
import { useContext } from "react";

export default function Home() {
	const db = firebase.firestore();
	const slider = useRef(null);
	const sliders = useRef(null);
	const value = useContext(DataContext);
	const [CatQ, setCatQ] = useState("init");
	const [Data, setData] = useState([]);
	const [Cards, setCards] = useState([]);
	const [nnCat, setnnCat] = useState([]);
	var settingss = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 2,
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
					slidesToShow: 2,
					slidesToScroll: 1,
					arrows: false,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 600,
				settings: {
					dots: false,
					infinite: false,
					speed: 500,
					slidesToShow: 1.8,
					slidesToScroll: 1,
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
					slidesToScroll: 1,
					arrows: false,
					initialSlide: 1.3,
				},
			},
		],
	};
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
	if (Cards.length !== 0) {
		support = (
			<Slider ref={slider} {...settings}>
				{Cards.map((e) => (
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
		support = (
			<p className="s1" style={{ color: "#002169", marginTop: "20px" }}>
				Sorry, No Products found.
			</p>
		);
	}
	async function fetchProduct() {
		setCards(value.value);
	}
	async function fetchCategory() {
		await db
			.collection("Aggr")
			.doc("Category")
			.get()
			.then((querySnapshot) => {
				setnnCat(querySnapshot.data().List);
			});
	}
	async function fetchBrands() {
		let obj = [];
		await db
			.collection("Aggr")
			.doc("Brands")
			.get()
			.then((querySnapshot) => {
				querySnapshot.data().List.forEach((doc) => {
					obj.push(doc.logo);
				});
				setData(obj);
			});
	}
	async function querydata(e) {
		let obj = [];
		await db
			.collection("Products")
			.where("category", "array-contains", e)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					obj.push(doc.data());
				});
				setCards(obj);
			})
			.catch((error) => {});
	}
	useEffect(() => {
		fetchBrands();
		fetchProduct();
		fetchCategory();
	}, []);
	return (
		<div>
			<Head>
				<title>Texas- Home </title>
				<meta
					name="google-site-verification"
					content="NDv76VQOyFym8ToQYWj9HKlCdFr2_RQh1IiWlaWLEj4"
				/>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link
					rel="stylesheet"
					type="text/css"
					charset="UTF-8"
					href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
				/>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff"></meta>
			</Head>
			<div>
				<Navbar />

				<Container className="hero p-0" fluid>
					<div className="rowx">
						<Col md={1} style={{ backgroundColor: "#002169" }}></Col>
						<Col md={10}>
							<Row>
								<Col
									md={{ span: 6, order: "last" }}
									lg={{ span: 7, order: "last" }}
								>
									<div style={{ paddingTop: "100px", paddingBottom: "20px" }}>
										<Carousel
											showStatus={false}
											swipeable={true}
											showArrows={false}
											showIndicators={true}
											emulateTouch={true}
											showThumbs={false}
											dynamicHeight={true}
											autoPlay={true}
											width="100%"
										>
											<img src="/1.png" alt="" />
											<img src="/2.png" alt="" />
											<img src="/3.png" alt="" />
											<img src="/4.png" alt="" />
											<img src="/5.png" alt="" />
										</Carousel>
									</div>
								</Col>

								<Col
									md={{ span: 6, order: "first" }}
									lg={{ span: 5, order: "first" }}
									className="herotext pdl30"
									style={{ backgroundColor: "#002169", paddingBottom: "50px" }}
								>
									<h1
										className="t1s1 jkh"
										style={{ color: "#fff", paddingRight: "24px" }}
									>
										One Stop Textile Solutions And Services in Bangladesh
									</h1>
									<p
										className="b1 "
										style={{
											color: "#EFF2F6",
											paddingBottom: "1em",
											paddingRight: "24px",
										}}
									>
										Connecting you to the world’s leading Textile Solutions with
										top class service.
									</p>
									<div style={{ paddingBottom: "50px" }}>
										<span
											className="button1 btn2 "
											onClick={() => Router.push({ pathname: "contact-us" })}
										>
											Get In Touch
										</span>
									</div>
								</Col>
							</Row>
						</Col>
						<Col md={1}></Col>
					</div>
				</Container>
				<Container>
					<Row style={{ justifyContent: "space-between" }}>
						<p
							className="s2 center1"
							style={{
								color: "#002169",
								marginTop: "40px",
								marginBottom: "20px",
							}}
						>
							We partner up with the best around the world
						</p>
						<Col md={1}></Col>
						<Col md={10}>
							<Marquee
								duration={20000}
								height="180px"
								width="100%"
								axis="X"
								align="center"
								pauseOnHover={false}
								reverse={true}
							>
								{Data.map((i, r) => {
									return (
										<img
											src={i}
											alt=""
											key={r}
											style={{ marginRight: "40px" }}
										/>
									);
								})}
							</Marquee>
						</Col>
						<Col md={1}></Col>
					</Row>
				</Container>
				<Container className="hero2">
					<Row>
						<Col md={6}>
							<div className="shipbox pdl30">
								<iframe
									style={{ width: "100%", height: "500px" }}
									src="https://www.youtube.com/embed/NYF0bFkLxWA?autoplay=1&cc_load_policy=1&mute=1&loop=1"
									title="YouTube video player"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe>
							</div>
						</Col>
						<Col md={5}>
							<br />
							<br />
							<div className="shipbox pdl30 pdl30W">
								<p className="overline" style={{ color: "#002169" }}>
									What do we do?
								</p>
								<p className="t1 ss1 jkh" style={{ color: "#002169" }}>
									From shipment to <br /> servicing, we’ve got you <br /> all
									covered!
								</p>
								<p
									className="b1"
									style={{ color: "#526899", paddingBottom: "25px" }}
								>
									Our team of professionals are here to support you <br />{" "}
									through the shipment of your textile products, setting <br />{" "}
									it up, to future servicing of it all under one roof!
								</p>
							</div>
						</Col>
						<Col md={1}></Col>
					</Row>
				</Container>
				<Container className="hero3">
					<Row>
						<Col md={1}></Col>
						<Col md={10}>
							<Row>
								<Col md={6}>
									<p className="overline mggg ghk" style={{ color: "#002169" }}>
										Our values
									</p>
									<h3 className="t2 ss1 ghk" style={{ color: "#002169" }}>
										TEXSAS prioritise customer value creation over anything!
									</h3>
								</Col>
								<Col md={6}>
									<div className="ghk">
										<div className="mgin ">
											<img
												src="/solution.svg"
												alt=""
												style={{ paddingBottom: "10px" }}
											/>
											<p className="s1" style={{ color: "#002169" }}>
												Affordable Textile Solutions
											</p>
											<p className="b1" style={{ color: "#002169" }}>
												We promise to provide the best value for money among
												Textile Solutions in Bangladesh.
											</p>
										</div>
										<div className="spc">
											<img
												src="/service.svg"
												alt=""
												style={{ paddingBottom: "10px" }}
											/>
											<p className="s1" style={{ color: "#002169" }}>
												Top Notch Service
											</p>
											<p className="b1" style={{ color: "#002169" }}>
												Our team of professionals are standby to support you
												with world class service for your Textile machinaries.
											</p>
										</div>
										<div className="spc mgdn">
											<img
												src="/heart.svg"
												alt=""
												style={{ paddingBottom: "10px" }}
											/>
											<p className="s1" style={{ color: "#002169" }}>
												Commitment and Dedication
											</p>
											<p className="b1" style={{ color: "#002169" }}>
												We are commited and dedicated to our clients throughout
												their experience with us and beyond.{" "}
											</p>
										</div>
									</div>
								</Col>
							</Row>
						</Col>
						<Col md={1}></Col>
					</Row>
				</Container>
				<Container className="hero2">
					<Row>
						<Col md={1}></Col>
						<Col md={10}>
							<div className="ghk">
								<p className="overline mggg" style={{ color: "#002169" }}>
									Our Products
								</p>
								<p className="t1s1" style={{ color: "#002169" }}>
									{" "}
									A glance at our wide range of Textile Products
								</p>
								<p className="s2" style={{ color: "#002169" }}>
									Product Categories:
								</p>
								<div className="special">
									<span
										key="2"
										className={
											"btnp btn1 " + (CatQ == "init" ? "produca" : "produc")
										}
										style={{ marginTop: "16px" }}
										onClick={() => {
											setCatQ("init");
											fetchProduct();
										}}
									>
										All Categories{" "}
									</span>
									{nnCat.map((e) => {
										return (
											<span
												key={e}
												className={
													"btnp btn1 " + (CatQ == e ? "produca" : "produc")
												}
												style={{ marginTop: "16px" }}
												onClick={() => {
													setCatQ(e);
													querydata(e);
												}}
											>
												{e}
											</span>
										);
									})}
								</div>
								<div className="mgdn">
									{support}
									<div style={{ marginTop: "16px" }} className="none">
										<a onClick={() => slider?.current?.slickPrev()}>
											<Image src={nextL} alt="" />
										</a>
										<a onClick={() => slider?.current?.slickNext()}>
											<Image src={nextR} alt="" />
										</a>
									</div>
								</div>
							</div>
						</Col>
						<Col md={1}></Col>
					</Row>
				</Container>
				<Container className="heroR">
					<Row>
						<Col md={1}></Col>
						<Col md={10}>
							<div className="ghk">
								<p className="overline mggg" style={{ color: "#002169" }}>
									Testimonials
								</p>
								<p className="t1s1" style={{ color: "#002169" }}>
									{" "}
									We are a reknowned name in the industry
								</p>
								<p
									className="b1"
									style={{ color: "#526899", paddingBottom: "30px" }}
								>
									Connecting you to the world’s leading Textile Solutions with
									top class service.
								</p>
								<div className="mgdn">
									<Slider ref={sliders} {...settingss}>
										<CardR />
										<CardR />
										<CardR />
										<CardR />
									</Slider>
									<div style={{ marginTop: "16px" }} className="none">
										<a onClick={() => sliders?.current?.slickPrev()}>
											<Image src={nextL} alt="" />
										</a>
										<a onClick={() => sliders?.current?.slickNext()}>
											<Image src={nextR} alt="" />
										</a>
									</div>
								</div>
							</div>
						</Col>
						<Col md={1}></Col>
					</Row>
				</Container>
				<Footer />
			</div>
		</div>
	);
}

