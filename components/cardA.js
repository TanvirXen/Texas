import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import demo from "../public/demo.png";
import {Col} from 'react-bootstrap'
import Image from 'next/image'
import Router from "next/router";
export default function CardA({name,title,img,brand,pid,handleShow}) {
	return (
<Col md={3} style={{paddingRight:'10px'}}>
<Card style={{filter:'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.08))',borderRadius:'8px',marginTop:'16px'}}>
			<CardMedia component="img" height="250" image={img} alt="image" />
			<CardContent>
				<p className="s1 nntext" style={{ color: "#002169" }}>
					{name}
				</p>
				<p className="b2" style={{ color: "#526899" }}>
				{title}
				</p>
				<Image src={brand}
				height={38}
				width={80}
				/>
			</CardContent>
            <div style={{display:'flex',justifyContent:'center',marginBottom:'16px'}}>
			<span className="btnp btn1" style={{ border:'2px solid #DEFEDE', color: "#35D32F",marginRight:'8px' }}
			onClick={()=>Router.push({
				pathname: 'edit-product',
				query: { id:pid
						}
			})}
			> Edit</span>
  <span className="btnp btn1" style={{ border:'2px solid #FED2A4', color: "#FD8204" }}onClick={()=>handleShow(pid)}> Remove</span>
            </div>
		</Card>
</Col>
	);
}
