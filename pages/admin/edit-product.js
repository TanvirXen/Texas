
import Image from "next/image";
import { Container, Row, Col, Tab, Nav, Modal } from "react-bootstrap";
import SideBar from "../../components/SideBar";
import Head from "next/head";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import add from "../../public/add.svg";
import plus from "../../public/plus.svg";
import firebase from "firebase/app";
import CardD from "../../components/cardD";
import {withRouter,useRouter }from "next/router";
const initial = [
	{
		name: "",
		specs: [{ name: "", description: "", index: 1 }],
		key: "Category1",
	},
];
function EditProduct() {
	const router = useRouter()
	const [event, setevent] = useState("1");
	const [nCat, setnCat] = useState("");
	const [nnCat, setnnCat] = useState([]);
	const [indexS, setindexS] = useState(1);
	const [brands, setBrands] = useState([]);
	const [description, setdescription] = useState("");
	const [arr, setarr] = useState([]);
	const [arrr, setarrr] = useState([]);
	const [name, setname] = useState("");
	const [title, settitle] = useState("");
	const [keyword, setkeyword] = useState("");
	const [Brand, setBrand] = useState("");
	const [BrandLogo, setBrandLogo] = useState('');
	const [urls, setUrls] = useState([]);
	const [Data, setData] = useState(initial);
	const [BrandQ, setBrandQ] = useState("");
	const [CatQ, setCatQ] = useState("");
	const [Cards, setCards] = useState([]);
	

	async function queryData(e){
		let obj = [];
		await db.collection("Products").where("brand", "==", e)
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				obj.push(doc.data());
			});
			setCards(obj);
			setCatQ('')
		})
		.catch((error) => {
			 window.alert("Error getting documents: ", error);
		});
	}

	async function querydata(e){
		let obj = [];
		await db.collection("Products").where("category", "array-contains", e)
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				obj.push(doc.data());
			});
			setCards(obj);
			setBrandQ('')
		})
		.catch((error) => {
			 window.alert("Error getting documents: ", error);
		});
	}
	async function fetchProduct() {
		let obj = [];
		await db
			.collection("Products")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					obj.push(doc.data());
				});
				setCards(obj);
			});
	}
	async function fetchData() {
let obj =[]
		await db.collection("Products").doc(router.query.id)
			.get().then((doc) => {
				if (doc.exists) {
				
					setData(doc.data().data)
					setname(doc.data().name)
					settitle(doc.data().title)
					setkeyword(doc.data().keyword)
					setBrand(doc.data().brand)
					setUrls(doc.data().urls)
					setBrandLogo(doc.data().brandLogo)
					setarrr(doc.data().auxilary)
					setarr(doc.data().category)
					setdescription(doc.data().description)
					 window.alert(Brand)
				} else {
					// doc.data() will be undefined in this case
					 window.alert("No such document!");
				}
			}).catch((error) => {
				 window.alert("Error getting document:", error);
			});
			//  window.alert(Data)

	}
	
	const handlepublish = async () => {
		await db
			.collection("Products").doc(router.query.id)
			.update({
				name: name,
				category: arr,
				title: title,
				keyword: keyword,
				brand: Brand,
				urls: urls,
				data: Data,
				brandLogo:BrandLogo,
				auxilary: arrr
			})
			.then(
				router.push('products')
			)
	};

	const [show, setShow] = useState(false);

	const selectedAuxilary = (e) => {
		if (arrr.includes(e)) {
			var filtered = arrr.filter(function (el) {
				return el != e;
			});
			setarrr(filtered);
		} else {
			arrr.push(e);
			setarrr([...arrr]);
		}
	};
	function removeUrl(e){
		if (urls.includes(e)) {
			var filtered = arrr.filter(function (el) {
				return el != e;
			});
			setUrls(filtered);
		} else {
			 window.alert(e)
		}
	}
	const removephoto = () => {
		setImages([])
		setUrls([])
	}
	const selectedCategory = (e) => {
		if (arr.includes(e)) {
			var filtered = arr.filter(function (el) {
				return el != e;
			});
			setarr(filtered);
		} else {
			arr.push(e);
			setarr([...arr]);
		}
	};
	const handleClose = () => {
		setShow(false);
		fetchCategory();
	};

	const handleShow = () => {
		setShow(true);
	};
	const AddSpecCat = () => {
		setindexS(indexS + 1);
		let obj = [
			{
				name: "",
				specs: [{ name: "", description: "", index: 1 }],
				key: "Category" + (indexS + 1),
			},
		];
		setData(Data.concat(obj));
	};
	const NewSpec = (e) => {
		let obj = { name: "", description: "", index: e.specs.length + 1 };
		e.specs.push(obj);
		setData([...Data]);
	};
	const AddCategory = async () => {
		await db
			.collection("Aggr").doc('Category')
			.update({
				List: firebase.firestore.FieldValue.arrayUnion(nCat),
			})
			.then(() => {
				setnCat('')
				handleClose();
			});
	};

	const db = firebase.firestore();
	var storageRef = firebase.storage();
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
	const [images, setImages] = useState([]);

	const [progress, setProgress] = useState(0);
	const handleChange = (e) => {
		 for (let i = 0; i < e.target.files.length; i++) {
			const newImage = e.target.files[i];
			newImage["id"] = Math.random();
			setImages((prevState) => [...prevState, newImage]);
		}
		
	};

	const handleUpload = () => {
		const promises = [];
		images.map((image) => {
			let i =image.name+name+(Math.random() + 1).toString(36).substring(7)
			const uploadTask = storageRef.ref(`/products/${i}`).put(image);
			promises.push(uploadTask);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setProgress(progress);
				},
				(error) => {
					 window.alert(error);
				},
				async () => {
					await storageRef
						.ref("products")
						.child(i)
						.getDownloadURL()
						.then((urls) => {
							setUrls((prevState) => [...prevState, urls]);
						});
				}
			);
		});

		Promise.all(promises)
			.then(() =>  window.alert("All images uploaded"))
			.catch((err) =>  window.alert(err));
	};

	useEffect(() => {
		fetchBrands();
		fetchCategory();
		fetchData();
		fetchProduct()
	}, []);
	return (
		<div>
			<Head>
				<title>Texas Admin -Add Products</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<main>
				<Container>
					<Row>
						<SideBar />
						<Col md={10}>
							<Modal show={show} onHide={handleClose}>
								<Modal.Header closeButton>
									<Modal.Title>Add Category</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									{" "}
									<p className="b2">Your about to add a new Category.</p>
									<TextField
										id="outlined-basic"
										label="Category Name"
										variant="outlined"
										sx={{ width: "400px" }}
										value={nCat}
										onChange={(e) => setnCat(e.target.value)}
									/>
								</Modal.Body>
								<Modal.Footer>
									<a
										className="btnp btn1"
										style={{
											border: "2px solid #DEFEDE",
											color: "#35D32F",
											marginRight: "8px",
										}}
										onClick={() => AddCategory()}
									>
										{" "}
										Yes
									</a>
									<a
										className="btnp btn1"
										style={{ border: "2px solid #FED2A4", color: "#FD8204" }}
										onClick={() => handleClose()}
									>
										{" "}
										No
									</a>
								</Modal.Footer>
							</Modal>
							<Tab.Container id="left-tabs-example" defaultActiveKey="1">
								<div className="btmBar" style={{ display: "flex" }}>
									<Nav>
										<div style={{ marginTop: "24px", marginLeft: "16px" }}>
											<Nav.Link
												eventKey="1"
												className={event == "1" ? "btnOA" : "btnO"}
												onClick={() => setevent("1")}
											>
												Details
											</Nav.Link>

											<Nav.Link
												eventKey="2"
												className={event == "2" ? "btnOA" : "btnO"}
												onClick={() => setevent("2")}
											>
												Specefications
											</Nav.Link>

											<Nav.Link
												eventKey="3"
												className={event == "3" ? "btnOA" : "btnO"}
												onClick={() => setevent("3")}
											>
												{" "}
												Auxilaries
											</Nav.Link>

											{/* <Nav.Link
												eventKey="4"
												className={event == "4" ? "btnOA" : "btnO"}
												onClick={() => setevent("4")}
											>
												{" "}
												Review
											</Nav.Link> */}
										</div>
										<div
											style={{
												marginTop: "24px",
												marginLeft: "40vw",
												marginRight: "2vw",
											}}
										>
											<Nav.Link
												eventKey={event}
												className="btnp btn1"
												style={{ backgroundColor: "#35D32F", color: "white" }}
												onClick={() => handlepublish()}
											>
												Publish
											</Nav.Link>
										</div>
									</Nav>
								</div>
								<br />

								<div style={{ margin: "40px 80px" }}>
								<form action="">
										<Tab.Content>
											<Tab.Pane eventKey="1">
												<div>
													<div
														style={{
															display: "flex",
															justifyContent: "space-between",
														}}
													>
														<p className="t2">Product Details</p>
													</div>
													<p className="s1 sp">Product Name</p>
													<TextField
														id="outlined-basic"
														label="Product Name"
														variant="outlined"
														sx={{ width: "400px" }}
														value={name}
														onChange={(e) => setname(e.target.value)}
													/>
													<br />
													<br />
													<p className="s1 sp">Product Brand</p>
													<div>
														{brands.map((e) => {
															return (
																<span
																	key={e.name}
																	className={
																		"btnp btn1 " +
																		(Brand == e.name ? "producta" : "product")
																	}
																	onClick={() => {setBrand(e.name)
																					setBrandLogo(e.logo)
																	}}
																>
																	{e.name}
																</span>
															);
														})}

													
													</div>
													<br />
													<br />
													<p className="s1 sp">Product Photos</p>
													<div style={{ display: "flex" }}>
														<div>
															{urls.map((url, i) => (
																<a onClick={()=>removeUrl(url)} key={i}>
		<img
																	
																	style={{
																		width: "80px",
																		height: "80px",
																		marginRight: "8px",
																	}}
																	src={url}
																	alt="firebase-image"
																	
																/>
																</a>
													
														
															))}
															<div>
																<br />

																<br />
															</div>
														</div>
														<label htmlFor="contained-button-file">
															<input
																accept="image/*"
																id="contained-button-file"
																multiple
																type="file"
																hidden
																onChange={handleChange}
															/>
															<a>
																<span>
																	<Image src={add} alt="" />
																</span>
															</a>
														</label>
													</div>
													<br />

													<div>
														<span
															className="btnp product btn1"
															onClick={handleUpload}
														>
															Upload
														</span>
														<span
														style={{ border:'2px solid #FED2A4', color: "#FD8204" }}
															className="btnp btn1"
															onClick={removephoto}
														>
															Remove
														</span>
													</div>
													<br />
													<p className="s1 sp">Product Category</p>
													<div style={{ display: "flex" }}>
														<div style={{ marginTop: "10px" }}>
															{nnCat.map((e) => {
																return (
																	<span
																		key={e}
																		className={
																			"btnp btn1 " +
																			(arr.includes(e)
																				? "producta"
																				: "product")
																		}
																		onClick={() => selectedCategory(e)}
																	>
																		{e}
																	</span>
																);
															})}
														</div>
														<div>
															<a onClick={() => handleShow()}>
																<Image src={plus} height={45} />
															</a>
														</div>
													</div>
													<br />
													<br />
													<p className="s1 sp">Product Title</p>
													<TextField
														id="outlined-basic"
														label="Product Title"
														variant="outlined"
														sx={{ width: "400px" }}
														value={title}
														onChange={(e) => settitle(e.target.value)}
													/>
																		<br />
													<br />
													<p className="s1 sp">Product Description</p>
													<TextField
														id="outlined-basic"
														label="Product Description"
														variant="outlined"
														sx={{ width: "400px" }}
														value={description}
														onChange={(e) => setdescription(e.target.value)}
													/>
													<br />
													<br />
													<p className="s1 sp">Product Keyword</p>
													<TextField
														id="outlined-basic"
														label="Keywords seperated by comma"
														variant="outlined"
														sx={{ width: "400px" }}
														value={keyword}
														onChange={(e) => setkeyword(e.target.value)}
													/>
													<br />
													<br />
													<br />
													<br />
												</div>
											</Tab.Pane>
											<Tab.Pane eventKey="2">
												<div>
													<div
														style={{
															display: "flex",
															justifyContent: "space-between",
														}}
													>
														<p className="t2">Product Specification</p>
													</div>
													{Data.map((e) => {
														return (
															<div className="cardSpecs" key={e.key}>
																<div
																	style={{
																		marginLeft: "50px",
																		marginRight: "50px",
																	}}
																>
																	<div className="row">
																		<p
																			className="s1 sp"
																			style={{ paddingTop: "20px" }}
																		>
																			Specefication Category
																		</p>
																		<TextField
																			id="outlined-basic"
																			label="Product Name"
																			variant="outlined"
																			sx={{ width: "99%" }}
																			value={e.name}
																			onChange={(r) => {
																				e.name = r.target.value;
																				setData([...Data]);
																			}}
																		/>
																	</div>
																	<br />
																	<br />
																	<br />
																	<div className="spcBar"></div>
																	{/* Part 1 */}

																	{e.specs.map((s) => {
																		return (
																			<div
																				className="row"
																				style={{ marginTop: "16px" }}
																				key={s.index}
																			>
																				<div className="col-md-4">
																					<p
																						className="s1 sp"
																						style={{ paddingTop: "20px" }}
																					>
																						Specefication Title
																					</p>
																					<TextField
																						id="outlined-basic"
																						label="Product Name"
																						variant="outlined"
																						sx={{ width: "100%" }}
																						value={s.name}
																						onChange={(r) => {
																							s.name = r.target.value;
																							setData([...Data]);
																						}}
																					/>
																				</div>
																				<div className="col-md-8">
																					<p
																						className="s1 sp"
																						style={{ paddingTop: "20px" }}
																					>
																						Specefication Description
																					</p>
																					<TextField
																						id="outlined-basic"
																						label="Product Name"
																						variant="outlined"
																						sx={{ width: "100%" }}
																						value={s.description}
																						onChange={(r) => {
																							s.description = r.target.value;
																							setData([...Data]);
																						}}
																					/>
																				</div>

																				<br />
																			</div>
																		);
																	})}
																	<div
																		className="col-md-12"
																		style={{
																			marginTop: "30px",
																			textAlign: "center",
																		}}
																	>
																		<br />
																		<span
																			className="btnp producta btn1"
																			onClick={() => NewSpec(e)}
																		>
																			Add new specification
																		</span>
																	</div>
																	<br />
																	<br />
																</div>
															</div>
														);
													})}
													<div
														style={{ marginTop: "45px", textAlign: "center" }}
													>
														<span
															className="btnSP btn1"
															onClick={() => AddSpecCat()}
														>
															New specification category
														</span>
													</div>
													<br />
													<br />
													<br />
													<br />
												</div>
											</Tab.Pane>
											<Tab.Pane eventKey="3">
												<div >
													<p className="t2">Select Auxilary Products</p>
													<br />

													<p className="s2 sp" style={{ color: "#002169" }}>
														Sort by Category
													</p>
													<div style={{ display: "flex" }}>
														<div style={{ marginTop: "10px" }}>
	
															{nnCat.map((e) => {
																return (
																	<span
																		key={e}
																		className={
																			"btnp btn1 " +
																			(CatQ == e? "producta" : "product")
																		}
																		onClick={()=>{setCatQ(e)
																			querydata(e)
																		}}
																	>
																		{e}
																	</span>
																);
															})}
														</div>
													</div>
													<br />
													<p className="s2 sp" style={{ color: "#002169" }}>
														Sort by Brand
													</p>
													<div>
														{brands.map((e) => {
															return (
																<span
																	key={e.name}
																	className={
																		"btnp btn1 " +
																		(BrandQ == e.name ? "producta" : "product")
																	}
																	onClick={() => {setBrandQ(e.name) 
																		queryData(e.name)}}
																>
																	{e.name}
																</span>
															);
														})}
													</div>
													<br />
													<br />
											
													<div className="rowx" style={{marginLeft:'4px'}}>
														{Cards.map((e) => {
															return (
																<CardD
																	name={e.name}
																	key={e.pid}
																	category={e.category}
																	img={e.urls[0]}
																	title={e.title}
																	arrr={arrr}
																	pid={e.pid}
																	selectedAuxilary={selectedAuxilary}
																	brand={e.brandLogo}
																/>
															);
														})}
													</div>
													<br />
													<br />
													<br />
													<br />
													
												</div>
											</Tab.Pane>
											<Tab.Pane eventKey="4">
												<div>Rev</div>
											</Tab.Pane>
										</Tab.Content>
									</form>
								</div>
							</Tab.Container>
						</Col>
					</Row>
				</Container>
			</main>
		</div>
	);
}
export default withRouter(EditProduct)