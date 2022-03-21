import Link from "next/link";
import firebase from "firebase";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
	Container,
	Row,
	Col
} from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Brochure from '../../components/Brochure'
import Head from "next/head";
const db = firebase.firestore();

function Blog(props) {
	const post = JSON.parse(props.data);
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
					content={post.thumbnail[0]}
				/>
			</Head>
			<Navbar />
			<Container>
				<Row>
					<Col md={1}></Col>
					<Col md={10} style={{paddingTop:'100px'}}>
					<Carousel showStatus={false} swipeable={true} showArrows={false} showIndicators={true} emulateTouch={true}>
					{post.thumbnail.map((e)=>{
								return(
									<img src={e} alt="" key={e} className='productImg' />
								)
							})}
						</Carousel>
					</Col>
					<Col md={1}></Col>
				</Row>
			</Container>
			<Container>
				<Row>
					<Col md={1}></Col>
					<Col md={10}>
						<Row>
							<Col md={12} lg={7} className="mgb">
								<h1 className="t1s1">{post.title}</h1>

								<p
									className="b1"
									dangerouslySetInnerHTML={{ __html: post.description }}
								></p>
							</Col>
							<Col md={12} lg={5} className='brch'>
								<Brochure/>
							</Col>
						</Row>
					</Col>
					<Col md={1}></Col>
				</Row>
			</Container>
			<Footer />
		</div>
	);
}
export async function getStaticProps({ params }) {
	const slug = params.slug;
	let obj = [];
	await db
		.collection("Blogs")
		.doc(slug)
		.get()
		.then((doc) => {
			obj = JSON.stringify(doc.data());
		});
	// if (!docs.exists) {

	//   } else{
	//     obj =
	//   }
	return {
		props: { data: obj },
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every 10 seconds
		revalidate: 2000, // In seconds
	};
}
export async function getStaticPaths() {
	let obj = [];
	await db
		.collection("Blogs")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				obj.push(doc.data());
			});
		});

	const paths = obj.map((post) => ({ params: { slug: post.bid } }));

	return { paths, fallback: "blocking" };
}

export default Blog;
