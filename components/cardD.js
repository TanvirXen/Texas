import * as React from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { Col } from "react-bootstrap";
import Image from "next/image";
export default function CardD({ name, title, img, arrr,pid,selectedAuxilary, brand}) {

	
	return (
		<Col md={3} style={{paddingRight:'10px'}}>
			<Card
				style={{
					filter: "drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.08))",
					borderRadius: "8px",
					marginTop: "16px",
				}}
			>
				<CardMedia component="img" height="250" image={img} alt="image" />
				<CardContent>
					<p className="s1 nntext" style={{ color: "#002169" }}>
						{name}
					</p>
					<p className="b2" style={{ color: "#526899" }}>
						{title}
					</p>
					<Image
						src={brand}
						alt=""
						height={38}
						width={80}
					/>
				</CardContent>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginBottom: "16px",
					}}
				>
					<span
						className={"btnp btn1 " + (arrr.includes(pid) ? "aux" : "auxx")}
						onClick={() => selectedAuxilary(pid)}
					>
						Selected
					</span>
				</div>
			</Card>
		</Col>
	);
}
