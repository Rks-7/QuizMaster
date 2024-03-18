import {Button,Typography} from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import {Loading} from "./Loading"
import {  useNavigate } from "react-router-dom";


function Appbar(){
    const navigate=useNavigate();
    const User=useRecoilValue(userState);
    const setUser=useSetRecoilState(userState);

    if(User.isLoading){
        return <Loading/>
    }
    
    if(User.userRole=="admin"){
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10
        }}>
            <div style={{ marginLeft: 10, marginTop: 10, cursor: "pointer" }} onClick={() => { navigate('/') }}>
                <Typography variant="h6" style={{ fontWeight: 600 }}>QuizMaster</Typography>
            </div>
            <div style={{ display: "flex", marginTop: 10 }}>
                <div style={{ marginRight: 10 }} >
                    <Button variant="contained"
                    onClick={()=>{
                        navigate("/addquiz")
                    }}
                    >Add Quiz</Button>
                </div>
                <div style={{ marginRight: 10 }}>
                    <Button variant="contained" 
                    onClick={()=>{
                        localStorage.setItem("token",null);
                        setUser({
                            isLoading:false,
                            userEmail:null,
                            userRole:null
                        })
                        navigate("/")
                    }}
                    >LogOut</Button>
                </div>
            </div>
        </div>
    }else if(User.userRole=="user"){
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10
        }}>
            <div style={{ marginLeft: 10, marginTop: 10, cursor: "pointer" }} onClick={() => { navigate('/') }}>
                <Typography variant="h6" style={{ fontWeight: 600 }}>QuizMaster</Typography>
            </div>
            <div style={{ display: "flex", marginTop: 10 }}>
                <div style={{ marginRight: 10 }}>
                    <Button variant="contained"
                        onClick={() => {
                            localStorage.setItem("token", null);
                            setUser({
                                isLoading: false,
                                userEmail: null,
                                userRole: null
                            })
                            navigate("/")
                        }}
                    >LogOut</Button>
                </div>
            </div>
        </div>
    }else{
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10
        }}>
            <div style={{ marginLeft: 10, marginTop: 10, cursor: "pointer"}} onClick={()=>{navigate('/')}}>
                <Typography variant="h6" style={{ fontWeight: 600 }}>QuizMaster</Typography>
            </div>
            <div style={{ display: "flex", marginTop: 10 }}>
                <div style={{ marginRight: 10 }} >
                    <Button variant="contained"
                    onClick={()=>{ navigate('/signup')}}
                    >Sign Up</Button>
                </div>
                <div style={{ marginRight: 10 }}>
                    <Button variant="contained"
                    onClick={() => { navigate('/signin') }}
                    >Sign In</Button>
                </div>
            </div>
        </div>
    }
    
}

export default Appbar;