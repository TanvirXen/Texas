import Head from "next/head";
import Image from "next/image";
import firebase from "firebase/app";
import Router from "next/router";
import { useState, useEffect } from "react";
import React from "react";
import Button from "@mui/material/Button";
import { Container, Row, Col, Modal } from "react-bootstrap";
import SideBar from "../../components/SideBar";
import CardA from "../../components/cardA";

export default function Product() {
	const db = firebase.firestore();
	const [Name, setName] = useState("");
	const [show, setShow] = useState(false);
	const [brands, setBrands] = useState([]);
	const handleClose = () => setShow(false);
	const handleShow = (bid) => {
		setShow(true);
		setName(bid);
		 window.alert(bid);
	};

	const [Cards, setCards] = useState([]);
	async function fetchProduct() {
		let obj = [];
		await db
			.collection("Products")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					obj.push(doc.data());
					//  window.alert(doc.id, " => ", doc.data());
				});
				setCards(obj);
			});
	}
	async function Remove() {
		await db
			.collection("Products")
			.doc(Name)
			.delete()
			.then(() => {
				 window.alert("Document successfully deleted!");
				handleClose();
				fetchBlogs();
			})
			.catch((error) => {
				console.error("Error removing document: ", error);
			});
		fetchProduct();
	}
	async function fetchBrands() {
		await db
			.collection("Aggr").doc('Brands')
			.get()
			.then((querySnapshot) => {
				setBrands(querySnapshot.data().List);
			});
	}
	useEffect(() => {
		fetchProduct();
		fetchBrands();
	}, []);
	return (
		<div>
			<Head>
				<title>Texas Admin - Products</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<main>
				<Container>
					<Row>
						<SideBar />
						<Col md={10}>
							<br />
							<div style={{ margin: "40px 80px" }}>
								<div
									style={{ display: "flex", justifyContent: "space-between" }}
								>
									<p className="t2">Products</p>
									<div style={{ marginTop: "10px" }}>
										<a
											className="button2"
											onClick={() => Router.push("add-products")}
										>
											ADD PRODUCT
										</a>
									</div>
								</div>
								{/* Cards start here */}
							<div className="rowx">
									<Modal show={show} onHide={handleClose}>
										<Modal.Header closeButton>
											<Modal.Title>Delete Product?</Modal.Title>
										</Modal.Header>
										<Modal.Body>
											{" "}
											<p className="b2">
												Your about to delete the Product permanently. Are you
												sure ?
											</p>
										</Modal.Body>
										<Modal.Footer>
											<a
												className="btnp btn1"
												style={{
													border: "2px solid #DEFEDE",
													color: "#35D32F",
													marginRight: "8px",
												}}
												onClick={() => Remove()}
											>
												{" "}
												Yes
											</a>
											<a
												className="btnp btn1"
												style={{
													border: "2px solid #FED2A4",
													color: "#FD8204",
												}}
												onClick={() => handleClose()}
											>
												{" "}
												No
											</a>
										</Modal.Footer>
									</Modal>

									{Cards.map((e) => {
										return (
											<CardA
												name={e.name}
												key={e.pid}
												category={e.category}
												img={e.urls[0]}
												title={e.title}
												brand={e.brandLogo}
												pid={e.pid}
												handleShow={handleShow}
											/>
										);
									})}
						</div>
							</div>
						</Col>
					</Row>
				</Container>
			</main>
		</div>
	);
}
