import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {Col} from 'react-bootstrap'
import Image from 'next/image'
import Router from "next/router";
export default function CardP({name,title,img,brand,pid}) {
	return (
		<>
<Col xl={4} lg={6} md={6} sm={6} xs={11} style={{paddingLeft:'10px'}} >
<Card style={{filter:'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.08))',borderRadius:'8px',marginTop:'16px',cursor:'pointer'}} onClick={()=>Router.push({
    pathname: 'products/'+pid
})}>
			<CardMedia component="img" height="250" image={img} alt="image" />
			<CardContent>
				<p className="s1 nntext" style={{ color: "#002169" }}>
					{name}
				</p>
				<p className="b2" style={{ color: "#526899" }}>
				{title}
				</p>
				<img src={brand}
		style={{width:'auto',height:'38px'}}
				/>
			</CardContent>
		</Card>
</Col>

</>
	);
}
