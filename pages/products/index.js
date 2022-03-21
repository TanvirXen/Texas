import Head from "next/head";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import firebase from "firebase/app";
import Router from "next/router";
import CardP from "../../components/cardP";
import { useState, useEffect } from "react";
import {DataContext} from '../../components/context'
import { useContext } from "react";
import Pagination from '@mui/material/Pagination';
export default function Product() {
	const db = firebase.firestore();
	const value = useContext(DataContext);
	const [Cards, setCards] = useState([]);
	const [brands, setBrands] = useState([]);
	const [nnCat, setnnCat] = useState([]);
	const [CatQ, setCatQ] = useState("");
	const [BrandQ, setBrandQ] = useState("");
	async function fetchProduct() {
		setCards(value.value)
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
				setBrandQ("");
			})
			.catch((error) => {
				 window.alert("Error getting documents: ", error);
			});
	}

	async function queryData(e) {
		let obj = [];
		await db
			.collection("Products")
			.where("brand", "==", e)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					obj.push(doc.data());
				});
				setCards(obj);
				setCatQ("");
			})
			.catch((error) => {
				 window.alert("Error getting documents: ", error);
			});
	}
	async function fetchBrands() {
		await db
			.collection("Aggr").doc('Brands')
			.get()
			.then((querySnapshot) => {
				setBrands(querySnapshot.data().List);
			});
	}
	async function fetchCategory() {
		await db
			.collection("Aggr").doc('Category')
			.get()
			.then((querySnapshot) => {
				setnnCat(querySnapshot.data().List);
			});
	}
	useEffect(() => {
		fetchProduct();
		fetchBrands();
		fetchCategory();
	}, []);
	return (
		<div>
			<Head>
				<title>Texas- Products </title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div>
				<Navbar />
				<Container>
					<div className="ttl">
						<p className="t2" style={{ color: "#002169" }}>
							Products
						</p>
						<div
							style={{
								border: " 1px solid rgba(225, 230, 237, 0.64)",
								height: "0px",
								width: "95%",
							}}
						></div>
					</div>

					<Row>
						<Col md={1}></Col>
						<Col md={2}>
							<br />
							<br />
							<p style={{ color: "#002169" }} className="s2">
								Sort By Category
							</p>
							<div style={{ display: "grid" }} className='speciala'>
								{nnCat.map((e) => {
									return (
										<span
											key={e}
											className={
												"btnp btn1 " + (CatQ == e ? "producta" : "product")
											}
                      style={{marginTop:'16px'}}
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
							<br />
							<br />
							<p style={{ color: "#002169" }} className="s2">
								Sort By Brand
							</p>
							<div style={{ display: "grid" }} className='speciala'>
								{brands.map((e) => {
									return (
										<span
											key={e.name}
                      style={{marginTop:'16px'}}
											className={
												"btnp btn1 " +
												(BrandQ == e.name ? "producta" : "product")
											}
											onClick={() => {
												setBrandQ(e.name);
												queryData(e.name);
											}}
										>
											{e.name}
										</span>
									);
								})}
							</div>
              <br />
              <br />
              <a className="btnp btn1" style={{ border:'2px solid #FED2A4', color: "#FD8204" }} onClick={()=>fetchProduct()}> RESET</a>
							<br />
							<br />
						</Col>
						<Col md={1}></Col>
						<Col md={7}>
							<br />
							<br />
							<div className="rowx">
								{Cards.map((e) => {
									return (
										<CardP
											name={e.name}
											key={e.pid}
											category={e.category}
											img={e.urls[0]}
											title={e.title}
											brand={e.brandLogo}
											pid={e.pid}
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
