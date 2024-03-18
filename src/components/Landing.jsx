import { Typography,Card, Button } from "@mui/material";
import {useState,useEffect} from "react";
import { BASE_URL } from "../config";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { useNavigate } from "react-router";

function Landing(){
    const [quizes, setquizes] = useState([]);
  
    const init=async()=>{
       
        const response=await axios.get(`${BASE_URL}/admin/allquiz`)
        
        setquizes(response.data.quizes)
    }

    useEffect(() => {
        init();
    }, []);
    return <div>
        <div style={{ height: 380, width: "100vw", backgroundColor: "#212121" ,marginBottom:10}}>
            <div style={{ height: 380, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <div>
                    <Typography style={{ fontWeight: 600, color: "white", textAlign: "center" }} variant="h4">
                        Knowledge is a treasure, but practice is the key to it
                </Typography>
                </div>
            </div>
        </div>

            <Quizes quizes={quizes}/>
        </div>
    
}

function Quizes({ quizes }){
    return <div>
        <Typography variant="h6" style={{marginLeft:10,marginBottom:20,fontWeight:600}}>All Quizes:</Typography>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
            {
                quizes.map(quiz => {
                    return <Quizcarad quiz={quiz} />
                })
            }
        </div>
        
        
    </div>
}
function Quizcarad({quiz}){
    const User = useRecoilValue(userState);
    const navigate = useNavigate();
    return <Card variant="outlined" style={{
        width: 300,
        margin: 10,
        minHeight: 200}}>
        <img src={quiz.imageLink} alt="" style={{ width: 300, height: 300, objectFit: 'cover'}} />
        <Typography variant="h6" textAlign={"center"}>{quiz.title}</Typography>
        <Typography variant="body2" textAlign={"center"}>{quiz.description}</Typography>
        <div style={{display:"flex",justifyContent:"center" ,paddingTop:10,paddingBottom:10}}>
            {User.userRole==="admin" ?(
                <Button variant="contained" onClick={()=>{
                    navigate('/editquiz/'+quiz._id);
                }}>
                    Edit
            </Button>
            ):User.userRole==="user"?(
                    <Button variant="contained" onClick={()=>{
                        navigate('/startquiz/'+quiz._id);
                    }}   >
                        Give
                    </Button>
            ):(
                        <Button variant="contained" onClick={()=>{
                            navigate('/signin')
                        }}>
                            Give
                        </Button>
            )}
            
        </div>
            </Card>
    
}

export default Landing;

