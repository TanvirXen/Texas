import Image from "next/image";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import SideBar from "../../components/SideBar";
import Head from "next/head";
import { useState ,useEffect} from "react";
import TextField from "@mui/material/TextField";
import firebase from "firebase/app";
import Router from "next/router";
import {withRouter,useRouter }from "next/router";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import add from "../../public/add.svg";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
});

const modules = {
	toolbar: [
		[{ header: "1" }, { header: "2" }, { font: [] }],
		[{ size: [] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		["link", "image", "video"],
		["clean"],
	],
	clipboard: {
		// toggle to add extra line breaks when pasting HTML:
		matchVisual: false,
	},
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
	"header",
	"font",
	"size",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
	"image",
	"video",
];

function EditBlog() {
    const router = useRouter()
	const [Logo, setLogo] = useState(router.query.thumbnail);
	const [name, setname] = useState(router.query.name);
	const [desc, setdesc] = useState('');
	const [key, setkey] = useState(router.query.keywords);
	const [file, setFile] = useState(null);

	const [progress, setProgress] = useState(0);
	const [images, setImages] = useState([]);
	const [urls, setUrls] = useState([]);
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	let today = new Date();

	let date =
		monthNames[today.getMonth()] +
		" " +
		today.getDate() +
		"," +
		today.getFullYear();
	const db = firebase.firestore();
	var storageRef = firebase.storage();
	const addDocument = async () => {
		await db
			.collection("Blogs")
            .doc(router.query.bid)
			.update({
				title: name,
				description: desc,
				thumbnail: urls,
				keywords: key,
			})
			.then(Router.push("blogs"));
	};

	const handleChange = (e) => {
		for (let i = 0; i < e.target.files.length; i++) {
		   const newImage = e.target.files[i];
		   newImage["id"] = Math.random();
		   setImages((prevState) => [...prevState, newImage]);
	   }
	   
   };
	const removephoto = () => {
		setImages([])
		setUrls([])
	}

	const handleUpload = () => {
		const promises = [];
		images.map((image) => {
			let i =image.name+name+(Math.random() + 1).toString(36).substring(7)
			const uploadTask = storageRef.ref(`/updates/${i}`).put(image);
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
						.ref("updates")
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

	async function fetchBlogs(){
		
   await db.collection("Blogs").doc(router.query.bid).get().then((doc) => {
    if (doc.exists) {
      setdesc(doc.data().description)
    } else {
        // doc.data() will be undefined in this case
         window.alert("No such document!");
    }
}).catch((error) => {
     window.alert("Error getting document:", error);
});
	}
useEffect(() => {
fetchBlogs()
}, []);

	return (
		<div>
			<Head>
				<title>Texas Admin -Edit Blog</title>
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
										<p className="t2 sp">Blog Details</p>
									</div>
									<div style={{ display: "flex" }}>
														<div>
															{urls.map((url, i) => (
																<img
																	key={i}
																	style={{
																		width: "80px",
																		height: "80px",
																		marginRight: "8px",
																	}}
																	src={url || add}
																	alt="firebase-image"
																/>
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
									<br />
									<p className="s1 sp">Title</p>
									<TextField
										id="outlined-basic"
										label="Blog Title"
										variant="outlined"
										sx={{ width: "400px" }}
										onChange={(e) => setname(e.target.value)}
                                        value={name}
									/>
									<br />
									<br />
									<p className="s1 sp">Keywords</p>
									<TextField
										id="outlined-basic"
										label="Use comma to seperate"
										variant="outlined"
										sx={{ width: "400px" }}
										onChange={(e) => setkey(e.target.value)}
                                        value={key}
									/>
									<br />
									<br />
									<br />
									<p className="s1 sp">Description</p>
									<QuillNoSSRWrapper
										modules={modules}
										formats={formats}
										theme="snow"
										value={desc}
										onChange={setdesc}
										style={{ height: "500px" }}
									/>
									<br />
									<br />
									<br /> <br />
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
export default withRouter(EditBlog)