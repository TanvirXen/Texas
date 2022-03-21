import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {Col} from 'react-bootstrap'
import Router from "next/router";
export default function CardC({name,handleShow,description,date,bid,url,keyword}) {



	return (
<Col md={3} style={{paddingRight:'10px'}}>
<Card style={{filter:'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.08))',borderRadius:'8px',marginTop:'16px'}} key={bid}>
			<CardMedia component="img" height="250" image={url} alt="image" />
			<CardContent>
<div style={{marginRight:'16px',marginLeft:'16px'}}>
    <span style={{color:'#656565'}} className='overline'>{date}</span>
<p className="s1 nntext" style={{ color: "#000000" }}>
					{name}
				</p>
			<p className="b2 textL ">
                {description.replace(/<[^>]*>?/gm, '')}
            </p>
		
</div>
			</CardContent>
            <div style={{display:'flex',justifyContent:'center',marginBottom:'16px'}}>
  <a className="btnp btn1" style={{ border:'2px solid #DEFEDE', color: "#35D32F",marginRight:'8px'}} onClick={()=>Router.push({
    pathname: 'edit-blog',
    query: { name: name,
             keywords:keyword,
             thumbnail :url,
			 bid:bid
	        }
})}> Edit</a>
  <a className="btnp btn1" style={{ border:'2px solid #FED2A4', color: "#FD8204" }} onClick={()=>handleShow(bid)}> Remove</a>

            </div>
		</Card>
</Col>
	);
}
