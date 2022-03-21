import Head from "next/head";
import Router from "next/router";
import { useState,useEffect } from "react";
import React from "react";
import { Container, Row, Col,Modal} from "react-bootstrap";
import SideBar from "../../components/SideBar";
import CardC from "../../components/cardC";
import firebase from "firebase/app";

export default function Blogs() {

	const [Data, setData] = useState([]);
	const db = firebase.firestore();
	const [show, setShow] = useState(false);
	const [Name, setName] = useState('');

	const handleClose = () => setShow(false);
	const handleShow = (bid) => {
		setShow(true);
		setName(bid)
	}

	async function Remove(){
		await db.collection("Blogs").doc(Name).delete().then(() => {
			 window.alert("Document successfully deleted!");
			handleClose()
			fetchBlogs()
		}).catch((error) => {
			console.error("Error removing document: ", error);
		});
		
	}
	async function fetchBlogs(){
		let obj =[]
   await db.collection("Blogs").orderBy('createdAt','desc').get().then((querySnapshot) => {
	querySnapshot.forEach((doc) => {
        obj.push(doc.data())
    });
	setData(obj)
});
	}
useEffect(() => {
fetchBlogs()
}, []);

	return (
		<div>
			<Head>
				<title>Texas Admin - Blogs</title>
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
									<p className="t2">Blogs</p>
									<div style={{ marginTop: "10px" }}>
										<a
											className="button2"
											onClick={() => Router.push("add-blog")}
										>
											ADD BLOG
										</a>
									</div>
								</div>
								<div className="rowx">
								{Data.map((e)=>{
       return (
       <CardC name={e.title} key={e.bid}  description={e.description}  handleShow={handleShow} date={e.date} url={e.thumbnail} bid={e.bid} keyword={e.keywords}/>
     );})
	 }
	       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Blog?</Modal.Title>
        </Modal.Header>
        <Modal.Body> <p className="b2">Your about to delete the Blog permanently. Are you sure ?</p></Modal.Body>
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
