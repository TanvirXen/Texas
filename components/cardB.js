import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {Col} from 'react-bootstrap'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import Router from "next/router";
export default function CardB({name,url,category,origin,handleShow,website,description,logob}) {



	return (
<Col md={3} style={{paddingRight:'10px'}}>
<Card style={{filter:'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.08))',borderRadius:'8px',marginTop:'16px'}} key={name}>
			<CardMedia component="img" height="250" image={logob} alt="image" />
			<CardContent>
<div style={{marginRight:'16px',marginLeft:'16px'}}>
<p className="s1 nntext" style={{ color: "#002169" }}>
					{name}
				</p>
			
					<span className="b2" style={{ color: "#526899" }}>
					<InfoOutlinedIcon/>	 {category}
					</span>
				 <br />
				 <span className="b2" style={{ color: "#526899" }}>
					 <FmdGoodOutlinedIcon/> {origin}
				 </span>
			 <br />
		
</div>
			</CardContent>
            <div style={{display:'flex',justifyContent:'center',marginBottom:'16px'}}>
  <a className="btnp btn1" style={{ border:'2px solid #DEFEDE', color: "#35D32F",marginRight:'8px'}} onClick={()=>Router.push({
    pathname: 'edit-brand',
    query: { name: name,
			 logo :url,
			 category : category,
			 origin:origin,
			 website:website,
			 description:description,
			 logob:logob
	        }
})}> Edit</a>
  <a className="btnp btn1" style={{ border:'2px solid #FED2A4', color: "#FD8204" }} onClick={()=>handleShow(name)}> Remove</a>

            </div>
		</Card>
</Col>
	);
}
