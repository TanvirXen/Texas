import { Container, Row, Col } from "react-bootstrap";
import Logo from "../public/logo.svg";
import Ham from "../public/ham.svg";
import cross from "../public/cross.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Link from 'next/link'
import Router from "next/router";
const useMediaQuery = (width) => {
	const [targetReached, setTargetReached] = useState(false);

	const updateTarget = useCallback((e) => {
		if (e.matches) {
			setTargetReached(true);
		} else {
			setTargetReached(false);
		}
	}, []);

	useEffect(() => {
		const media = window.matchMedia(`(max-width: ${width}px)`);
		media.addListener(updateTarget);

		// Check on mount (callback is not called until a change occurs)
		if (media.matches) {
			setTargetReached(true);
		}

		return () => media.removeListener(updateTarget);
	}, []);

	return targetReached;
};

export default function Navbar() {
	const isBreakpoint = useMediaQuery(1200);
	return <div>{isBreakpoint ? <HamburgerMenu /> : <FullNav />}</div>;
}
function HamburgerMenu() {
	const [open, setopen] = useState(false);
	return (
		<div  style={{position:'fixed',zIndex:'1'}}>
			<div className="hamburger">
				<div style={{ marginLeft: "32px",cursor:'pointer' }}>
					<Image src={Logo} alt="" height={80}  onClick={()=>Router.push({ pathname: '/'})} />
				</div>
				<div style={{ marginRight: "24px"}} onClick={() => setopen(true)}>
					<Image src={Ham} alt="" height={80} />
				</div>
			</div>
			<Drawer anchor="right" open={open}>
				<Box role="presentation" onClick={() => setopen(false)} sx={{width:'60vw'}}>
					<div style={{marginRight:'24px',direction:'rtl'}} onClick={() => setopen(false)}>
						<Image src={cross} alt="" height={80} />
					</div>
<div className="ham">
<ul>
									<li>
									<Link href="/">Home</Link>
									</li>
									<li>
									<Link href="/products">Products</Link>
									</li>
									<li>
									<Link href="/brands">Brands</Link>
									</li>
									<li>
									<Link href="/about">About</Link>
									</li>
									<li>
									<Link href="/updates">Updates</Link>
									</li>
									<li>
									
									<Link  href="/contact-us">
										<a className="contacts btn1">Contact</a>	
										</Link>
										
									</li>
								</ul>
</div>
				</Box>
			</Drawer>
		</div>
	);
}
function FullNav() {
	const { asPath } = useRouter();

	if (asPath.includes("admin") === true) {
		return <div> </div>;
	}

	return (
		<nav>
			<div>
				<Container style={{position:'fixed',zIndex:'1'}}>
					<Row className="nav">
                        <Col xl={1} lg={1}>
                        
                        </Col>
						<Col xl={5} lg={4} md={3}>
                            <div style={{cursor:'pointer'}}>
								<img src='/logo.svg' alt="" style={{height:'45px',marginTop:'14px'}}  onClick={()=>Router.push({ pathname: '/'})}/>
                            {/* <Image src={Logo} alt="" height={75} /> */}
                            </div>
						
						</Col>
						<Col xl={5} lg={6} md={7}>
							<div className="menu">
								<ul>
									<li>
										<Link href="/">Home</Link>
									</li>
									<li>
										<Link href="/products">Products</Link>
									</li>
									<li>
										<Link href="/brands">Brands</Link>
									</li>
									<li>
										<Link href="/about">About</Link>
									</li>
									<li>
										<Link href="/updates">Updates</Link>
									</li>
									<li>
									<Link  href="/contact-us">
										<a className="contacts btn1">Contact</a>	
										</Link>
									</li>
								</ul>
							</div>
						</Col>
                        <Col xl={1} lg={1}>
                        
                        </Col>
					</Row>
				</Container>
			</div>
		</nav>
	);
}
