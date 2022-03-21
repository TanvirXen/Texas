import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import CardG from "../../components/cardG";
import Loader from "../../components/loader";
import meta from '../../public/meta.png'
import Head from "next/head";
const db = firebase.firestore();
function Blog(props) {
	const [Blog, setBlog] = useState([]);
	function map() {
		let obj = [];
		for (let i = 0; i < props.data.length; i++) {
			obj.push(JSON.parse(props.data[i]));
		}
		setBlog(obj);
		setLoad(false);
	}
	const [Load, setLoad] = useState(true);
	let today = new Date();
	useEffect(() => {
		map();
	}, []);

	if (Load === true) {
		return <Loader />;
	}

	return (
		<div>
						<Head>
				<title>Texas- Brands </title>
				<meta name="title" content="Texas- Updates" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://www.texsasbd.com/" />
				<meta
					property="og:title"
					content="Texas- Updates"
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
			<Navbar />
			<Container>
				<Row>
					<Col md={1}></Col>
					<Col md={10}>
						<Row className="brt">
							<h1 className="t1s1 vgh">Updates</h1>
							{Blog.map((e) => {
								return (
									<CardG
										name={e.title}
										key={e.bid}
										description={e.description}
										date={e.date}
										url={e.thumbnail}
										bid={e.bid}
									/>
								);
							})}
						</Row>
						<br />
						<br />
					</Col>
					<Col md={1}></Col>
				</Row>
			</Container>
			<Footer />
		</div>
	);
}
export async function getStaticProps() {
	let obj = [];
	let r = [];
	await db
		.collection("Blogs")
		.orderBy("createdAt", "desc")
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
export default Blog;
