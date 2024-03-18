import {Button, Typography} from "@mui/material";
import { useParams } from "react-router";
import gif from "../assets/giphy.gif";
import { useNavigate } from "react-router";
function Startquiz(){
    const navigate=useNavigate();
    const {quizId}=useParams();
    return <div style={{display:"flex",justifyContent:"center",marginTop:50}} >
        <div>
            <Typography variant="h2" style={{fontWeight:400,textAlign:"center"}}>Lets Begin !</Typography>
            <br/>
            <div >
                <img src={gif} alt="" style={{width:500}} />
            </div>
            <br />
            <Button variant="contained" size="large" style={{marginTop:20,marginLeft:"40%"}}
                onClick={()=>{
                    navigate('/quiz/'+quizId);
                }}
            >Start</Button>
        </div>
    </div>
}
export default Startquiz;
