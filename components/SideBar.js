import Logo from "../public/logoW.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
import firebase from '../components/firebaseConfig'
import Router from "next/router";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useEffect } from "react";

export default function Sidebar() {
	useEffect(() => {
		if (!firebase.isLoggedIN()) {
		  Router.push("login");
		}
	  }, []);
    const router = useRouter();
	return (
		<Col md={2} >
			<div style={{ backgroundColor: "#002169", minHeight: "100vh",position:'fixed',width:'inherit'}}>
			<div style={{marginLeft:'16px'}}>
			<div style={{ marginLeft: "10px" }}>
				<Image src={Logo} alt="" height={96} />
			</div>
			<div className="bar"></div>
			<div className="sideItem">
				<ul>
					<li className={router.pathname == "/admin/products" ? "activeSide" : ""}>
						<a
							className="b2"
							style={{ color: "white" }}
							onClick={() => Router.push("products")}
						>
							<ArticleOutlinedIcon />
							Products
						</a>
					</li>
					<li className={router.pathname == "/admin/brands" ? "activeSide" : ""}>
						<a
							className="b2"
							style={{ color: "white" }}
							onClick={() => Router.push("brands")}
						>
							<ArticleOutlinedIcon />
							Brands
						</a>
					</li>
					<li className={router.pathname == "/admin/blogs" ? "activeSide" : ""}> 
						<a
							className="b2"
							style={{ color: "white" }}
							onClick={() => Router.push("blogs")}
						>
							<ArticleOutlinedIcon />
							Blogs
						</a>
					</li>
					<li>
						<a
							className="b2"
							style={{ color: "white" }}
							onClick={async () => {
								// Logout
								await firebase.logout();
								Router.push("login");
							}}
						>
							<LogoutOutlinedIcon />
							Logout
						</a>
					</li>
				</ul>
			</div>

			</div>

			</div>
								</Col>
	);
}
