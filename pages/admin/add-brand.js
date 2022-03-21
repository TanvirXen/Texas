import Image from "next/image";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import SideBar from "../../components/SideBar";
import Head from "next/head";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import firebase from "firebase/app";
import Router from "next/router";

export default function AddBrand() {
	const [Logo, setLogo] = useState("/add.svg");
	const [LogoB, setLogoB] = useState("/add.svg");
	const [name, setname] = useState("");
	const [website, setwebsite] = useState("");
	const [category, setcategory] = useState("");
	const [origin, setorigin] = useState("");
	const [desc, setdesc] = useState("");
	const [file, setFile] = useState(null);

	const db = firebase.firestore();
	var storageRef = firebase.storage();
	const addDocument = async () => {
		await db
			.collection("Brands")
			.doc(name)
			.set({
				name: name,
				website: website,
				category: category,
				origin: origin,
				description: desc,
				logo: Logo,
				logob: LogoB,
			})
			.then(async () => {
				await db
					.collection("Aggr")
					.doc("Brands")
					.update({
						List: firebase.firestore.FieldValue.arrayUnion({name:name,logo:Logo}),
					});
				Router.push("brands");
			});
	};

	function handleChange(e) {
		setFile(e.target.files[0]);
		let i = name + (Math.random() + 1).toString(36).substring(7);
		const ref = storageRef.ref(`/logos/${i}`);
		const uploadTask = ref.put(e.target.files[0]);

		uploadTask.on("state_changed",() => {
			ref.getDownloadURL().then((url) => {
				setLogo(url);
			});
		});
	}
	function handleChanges(e) {
		setFile(e.target.files[0]);
		let i = name + (Math.random() + 1).toString(36).substring(7);
		const ref = storageRef.ref(`/logos/${i}`);
		const uploadTask = ref.put(e.target.files[0]);

		uploadTask.on("state_changed", () => {
			ref.getDownloadURL().then((url) => {
				setLogoB(url);
			});
		});
	}

	return (
		<div>
			<Head>
				<title>Texas Admin -Add Brand</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<main>
				<Container>
					<Row>
						<SideBar />
						<Col md={10}>
							<form>
								<div className="btmBar" style={{ display: "flex" }}>
									<div style={{ marginTop: "24px", marginLeft: "75%" }}>
										<a
											className="btnp btn1"
											style={{ backgroundColor: "#35D32F", color: "white" }}
											onClick={() => addDocument()}
										>
											Publish
										</a>
									</div>
								</div>
								<div style={{ margin: "40px 80px" }}>
									<div>
										<p className="t2">Brand Details</p>
									</div>
									<p className="s1 sp">Brand Name</p>
									<TextField
										id="outlined-basic"
										label="Brand Name"
										variant="outlined"
										sx={{ width: "400px" }}
										onChange={(e) => setname(e.target.value)}
									/>
									<br />
									<br />
									<p className="s1 sp">Brand Website</p>
									<TextField
										id="outlined-basic"
										label="Brand Website"
										variant="outlined"
										sx={{ width: "400px" }}
										onChange={(e) => setwebsite(e.target.value)}
									/>
									<br />
									<br />
									<p className="s1 sp">Brand Category</p>
									<TextField
										id="outlined-basic"
										label="Brand Category"
										variant="outlined"
										sx={{ width: "400px" }}
										onChange={(e) => setcategory(e.target.value)}
									/>
									<br />
									<br />
									<p className="s1 sp">Brand Origin</p>
									<TextField
										id="outlined-basic"
										label="Brand Origin"
										variant="outlined"
										sx={{ width: "400px" }}
										onChange={(e) => setorigin(e.target.value)}
									/>
									<br />
									<br />
									<p className="s1 sp">Brand Description</p>
									<TextField
										id="outlined-basic"
										label="Brand Description"
										variant="outlined"
										sx={{ width: "400px" }}
										onChange={(e) => setdesc(e.target.value)}
									/>
									<br />
									<br />
									<p className="s1 sp">Brand Logo</p>
									<label htmlFor="contained-button-file">
										<input
											accept="image/*"
											id="contained-button-file"
											multiple
											type="file"
											hidden
											onChange={(e) => handleChange(e)}
										/>
										<a>
											<span>
												<Image src={Logo} alt="" width={80} height={80} />
											</span>
										</a>
									</label>
									<p className="s1 sp">Brand Logo For Card</p>
									<label htmlFor="contained-button">
										<input
											accept="image/*"
											id="contained-button"
											multiple
											type="file"
											hidden
											onChange={(e) => handleChanges(e)}
										/>
										<a>
											<span>
												<Image src={LogoB} alt="" width={120} height={120} />
											</span>
										</a>
									</label>
									<br />
									<br />
									<br />
								</div>
							</form>
						</Col>
					</Row>
				</Container>
			</main>
		</div>
	);
}
