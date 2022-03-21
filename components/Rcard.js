
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

export default function CardR(){
    return(
        <Card  variant="outlined" style={{backgroundColor:'#F5F9FF'}} className='rCard'>
        <CardContent>
            <p className="s2">
                “It is a long established fact that a reader will be
                distracted by the readable content of a page when looking at
                its layout. The point of using Lorem Ipsum is that it has a
                more-or-less normal distribution of letters, as opposed to
                using Content here, content her, making it look like
                readable English.”
            </p>
            <br />
            <p className="b2" style={{color:'#526899'}}> Imtizza Khan</p>
            <p className="b2" style={{color:'#526899'}}> Managing Director</p>
            <img src="/signature.png" alt="" style={{paddingTop:'8px'}} />
        </CardContent>
        </Card>
    )
}