import { Card, Typography, Button, TextField, Experimental_CssVarsProvider } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../config"
import { useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {userState} from '../store/atoms/user'
import { useNavigate } from "react-router";
function Signup(){
    const navigate=useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const setUser=useSetRecoilState(userState);
    return <div>
        <div style={{
            paddingTop: 150,
            marginBottom: 10,
            display: "flex",
            justifyContent: "center"
        }}>
            <Typography variant={"h6"}>
                Welcome to QuizMaster. Sign up below
                </Typography>
        </div>
        <div style={{display:"flex", justifyContent:"center"}}>
            <Card variant="outlined" style={{ width: 400, padding: 20,borderRadius:7}}>
                <TextField id="email" label="email" variant="outlined" 
                fullWidth={true}
                onChange={(e)=>{
                    setemail(e.target.value);
                }}
                 />
                <br></br>
                <TextField id="password" label="password" type="password" variant="outlined"
                 fullWidth={true} style={{marginTop:10,marginBottom:10}}
                    onChange={(e) => {
                        setpassword(e.target.value);
                    }}
                   />
                <br />
                <Button variant="contained" onClick={async()=>{
                    const response=await axios.post(`${BASE_URL}/user/signup`,{
                        username:email,
                        password:password
                    })
                    let data=response.data;
                    localStorage.setItem("token",data.token);
                    setUser({userEmail:email ,isLoading:false,userRole:"user"});
                    navigate("/");
                }}>Submit</Button>
            </Card>
        </div>
       
    </div>
}

export default Signup;