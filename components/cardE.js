import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {Col} from 'react-bootstrap'
import Image from 'next/image'
import Router from "next/router";
import { useRouter } from 'next/router'
import Link from 'next/link'
export default function CardP({name,title,img,brand,pid}) {
	const router = useRouter()
	return (
<div>
	<Link href={'/products/'+pid}>
	<a >
<Card style={{filter:'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.08))',borderRadius:'8px',marginTop:'16px',cursor:'pointer',height:'80%',marginBottom:'4px',marginRight:'16px'}} >
			<CardMedia component="img" height="250" image={img} alt="image" />
			<CardContent>
				<p className="s1s2 nntext" style={{ color: "#002169" }}>
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
</a>
	</Link>

		</div>
	);
}
