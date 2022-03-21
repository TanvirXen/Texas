import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {Col} from 'react-bootstrap'
import Router from "next/router";
import Link from 'next/link'


export default function CardC({name,description,date,bid,url}) {
	return (
<Col xs={12} md={6} lg={4} xl={3}>
<Link href={'updates/'+bid}>
<a  >
	<Card style={{filter:'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.08))',borderRadius:'8px',marginTop:'16px',cursor:'pointer'}} key={bid} >
			<CardMedia component="img" height="250" image={url} alt="image" />
			<CardContent>
<div style={{marginRight:'16px',marginLeft:'16px'}}>
    <span style={{color:'#656565'}} className='overline'>{date}</span>
<p className="s1 nntext" style={{ color: "#000000" }}>
					{name}
				</p>
			<p className="b2 textL ">
                {description.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ')}
            </p>
		
</div>
			</CardContent>
		</Card>
	</a>
</Link>

</Col>
	);
}
