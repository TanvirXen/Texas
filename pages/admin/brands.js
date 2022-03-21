import Head from "next/head";
import Router from "next/router";
import { useState,useEffect } from "react";
import React from "react";
import { Container, Row, Col,Modal} from "react-bootstrap";
import SideBar from "../../components/SideBar";
import CardB from "../../components/cardB";
import firebase from "firebase/app";

export default function Product() {

	const [Data, setData] = useState([]);
	const db = firebase.firestore();
	const [show, setShow] = useState(false);
	const [Name, setName] = useState('');

	const handleClose = () => setShow(false);
	const handleShow = (name) => {
		setShow(true);
		setName(name)
		 window.alert(name)
	}

	async function Remove(){
		await db.collection("Brands").doc(Name).delete().then(() => {
			 window.alert("Document successfully deleted!");
			handleClose()
			fetchBrands()
		}).catch((error) => {
			console.error("Error removing document: ", error);
		});
	}
	async function fetchBrands(){
		let obj =[]
   await db.collection("Brands").get().then((querySnapshot) => {
	querySnapshot.forEach((doc) => {
        obj.push(doc.data())
        //  window.alert(doc.id, " => ", doc.data());
    });
	setData(obj)
});
	}
useEffect(() => {
fetchBrands()
}, []);

	return (
		<div>
			<Head>
				<title>Texas Admin - Brands</title>
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
									<p className="t2">Brands</p>
									<div style={{ marginTop: "10px" }}>
										<a
											className="button2"
											onClick={() => Router.push("add-brand")}
										>
											ADD BRAND
										</a>
									</div>
								</div>
								<div className="rowx"> 
								{Data.map((e)=>{
       return (
       <CardB name={e.name} key={e.name} category={e.category} origin={e.origin} url={e.logo} description={e.description} website={e.website} handleShow={handleShow} logob={e.logob}/>
     );})
	 }
	       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Brand?</Modal.Title>
        </Modal.Header>
        <Modal.Body> <p className="b2">Your about to delete the Brand permanently. Are you sure ?</p></Modal.Body>
        <Modal.Footer>
		<a className="btnp btn1" style={{ border:'2px solid #DEFEDE', color: "#35D32F",marginRight:'8px' }}  onClick={()=>Remove()}> Yes</a>
  <a className="btnp btn1" style={{ border:'2px solid #FED2A4', color: "#FD8204" } } onClick={()=>handleClose()}> No</a>
        </Modal.Footer>
      </Modal>

								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</main>
		</div>
	);
}
