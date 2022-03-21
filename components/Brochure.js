import {
	InputGroup,
	FormControl,
	Form,
} from "react-bootstrap";

export default function Brochure(){
    return(
        <div className="brochure">
        <div style={{ padding: "25px" }}>
     <div style={{marginBottom:'12px'}}>
     <p className="s1" style={{ color: "#002169" }}>
                Download our full brochure with all product details
            </p>
            <span className="b2" style={{ color: "#526899"}}>
                Get all the product details in your email inbox now!
            </span>
     </div>
            <InputGroup>
                <FormControl
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic"
                    id="helper"
                />
                <div className="btn1 button3">Download</div>

            </InputGroup>
            <p className="b2" style={{ color: "#35D32F",marginTop:'12px' }}>
                        Your download is starting.
                    </p>
            {/* end */}
        </div>
    </div>
    )
}