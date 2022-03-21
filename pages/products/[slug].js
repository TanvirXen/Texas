import Link from "next/link";
import firebase from "firebase";
import { useState ,useEffect} from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
	Container,
	Row,
	Col
} from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import CardE from "../../components/cardE";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Brochure from '../../components/Brochure'
import Head from 'next/head'

const db = firebase.firestore();
const initial = [
	{
		name: "",
		specs: [{ name: "", description: "", index: 1 }],
		key: "Category1",
	},
];
var settings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 4,
	slidesToScroll: 4,
	arrows: false,
	initialSlide: 0,
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
				initialSlide: 3
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
				initialSlide: 1.8
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
				initialSlide: 1.3
				
			},
		},
	],
};
function Product(props) {
    const data = JSON.parse(props.data);
    const [name, setname] = useState(data.name);
	const [title, settitle] = useState(data.title)
	const [desc, setdesc] = useState(data.description);
    const [BrandLogo, setBrandLogo] = useState(data.brandLogo);
    const [activeSlide, setActiveSlide] = useState(0);
    const [Urls, setUrls] = useState(data.urls);
    const [Url, setUrl] = useState([]);
    const [arr, setarr] = useState(data.category);
    const [arrr, setarrr] = useState([]);
    const [CategoryName, setCategoryName] = useState(data.category.join());
    const handleDragStart = (e) => e.preventDefault();
    const [nnCat, setnnCat] = useState([]);
    const [Data, setData] = useState(data.data);
    const [keyword, setkeyword] = useState(data.keyword);
    const [support, setsupport] = useState("");
    const [auxilary, setauxilary] = useState(data.auxilary);

	function mapData() {
		let items = [];

		Urls.map((url, i) =>
			items.push(
				<img
					key={i}
					onDragStart={handleDragStart}
					role="presentation"
					src={url}
					alt="firebase-image"
				/>
			)
		);
		setUrl(items);
	}

		let supp;
		if (arrr.length !== 0) {
			supp=
<Col md={11}>
		<p className="t2" style={{ color: "#002169" }}>
			Supporting Machines
		</p>
		<Slider {...settings}>
{arrr.map((e) => (
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
		<br />
		<br />
	</Col>	
		}else{
			supp=''
		}

	async function fetchCategory() {
		let obj = [];
		await db
			.collection("Category")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					obj.push(doc.data());
					//  window.alert(doc.id, " => ", doc.data());
				});
				setnnCat(obj);
			});
	}
	async function mapAuxilary(e) {
		let obj = [];
if(e.length !==0){
	await db
	.collection("Products")
	.where("pid", "in", e)
	.get()
	.then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			obj.push(doc.data());
		});
	});
setarrr(obj);
}
	}

	useEffect(() => {
		mapData();
		fetchCategory();
		if (auxilary.length != 0) {
			mapAuxilary(auxilary);
		}else{
			
			setarrr([])
		}
	}, []);
	return (
		<div>
			<Head>
			<title>Texas- {data.brand+" " +data.name} </title>
			<meta name="description" content={data.description}/>
			</Head>
			<Navbar />
            <Container>
					<Row>
						<Col md={1}></Col>
						<Col
							md={10}
							style={{
								display: "flex",
								justifyContent: "space-between",
								paddingTop: "100px",
							}}
						>
							<div>
								<h1 className="t2s1" style={{ color: "#002169" }}>
									{name}
								</h1>
							</div>
							<div>
								<img src={BrandLogo} alt="brandlogo" className="ish" />
							</div>
						</Col>
						<Col md={1}></Col>

						<Col md={1}></Col>
						<Col
							md={10}
							className='prd'
							style={{
								display: "flex",
								justifyContent: "space-between",
								paddingTop: "40px",
							}}
						>
					
							
						</Col>
						<Col md={1}></Col>

						<Col md={1}></Col>
						<Col md={10} >
						<Carousel showStatus={false} swipeable={true} showArrows={false} showIndicators={true} emulateTouch={true}>
							{Urls.map((e)=>{
								return(
									<img src={e} alt="" key={e} className='productImg' />
								)
							})}
							</Carousel>
						</Col>
						<Col md={1}></Col>
					
						<Col md={1}></Col>
						<Col md={10}>
						<div className="row">
							<Col md={12} lg={7}>
							<h3 className="overline" style={{ color: "#002169",wordBreak:'break-word' }}>{CategoryName}</h3>
							<h1 className="t2s1" style={{ color: "#002169" }}>{title}</h1>
							<p className="b1" style={{ color: "#526899" ,paddingBottom:'30px'}}>{desc}</p>
							</Col>
							<Col md={12} lg={5} className='brch'>
							<Brochure/>
							</Col>
						</div>
						</Col>
						<Col md={1}></Col>
						<Col md={1}></Col>
						<Col md={10}>
							<h3 className="t2" style={{ color: "#002169" }}>
								Specifications
							</h3>

							{Data.map((e) => {
								return (
									<div key={e.key} style={{marginTop:'20px'}}>
										<h3 className="s1" style={{ color: "#002169" }}>
											{e.name}
										</h3>
										<div className="blbar"></div>
										<br />
										{e.specs.map((s) => {
											return (
												<Row key={s.index}>
													<Col md={4}>
														<p
															className="overline"
															style={{ marginLeft: "10px", color: "#3D568D" }}
														>
															{s.name}
														</p>
													</Col>
													<Col md={8}>
														<p
															className="b2 mb10"
															style={{ marginLeft: "10px", color: "#3D568D" ,}}
														>
															{s.description}{" "}
														</p>
													</Col>
												</Row>
											);
										})}
									</div>
								);
							})}

							<br />
							<br />
						</Col>
						<Col md={1}></Col>
						<Col md={1}></Col>
                            {supp}
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
		.collection("Products")
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
		.collection("Products")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				obj.push(doc.data());
			});
		});

	const paths = obj.map((post) => ({ params: { slug: post.pid } }));

	return { paths, fallback: "blocking" };
}

export default Product;
