// import { Card, Typography, Button, TextField } from "@mui/material";
// import { useState } from "react";
// import axios from "axios";
// import {useSetRecoilState} from 'recoil';
// import {userState} from "../store/atoms/user";
// import {BASE_URL} from "../config"
// import {  useNavigate } from "react-router-dom";
// function Signin(){
//     const navigate=useNavigate();
//     const [email, setemail] = useState("");
//     const [password, setpassword] = useState("");
//     const setUser = useSetRecoilState(userState);
//     return <div>
//         <div style={{
//             paddingTop: 150,
//             marginBottom: 10,
//             display: "flex",
//             justifyContent: "center"
//         }}>
//             <Typography variant={"h6"}>
//                 Welcome back . Sign in below
//                 </Typography>
//         </div>
//         <div style={{ display: "flex", justifyContent: "center" }}>
//             <Card variant="outlined" style={{ width: 400, padding: 20 ,borderRadius:7}}>
//                 <TextField 
//                 id="email" 
//                 label="email" variant="outlined" 
//                 fullWidth={true}
//                 onChange={(e)=>{
//                     setemail(e.target.value);
//                 }}
//                  />
//                 <br></br>
//                 <TextField 
//                 id="password" 
//                 label="password" 
//                 type="password" 
//                 variant="outlined" 
//                 onChange={(e)=>{
//                     setpassword(e.target.value);
//                 }}
//                 fullWidth={true} style={{ marginTop: 10, marginBottom: 10 }} />
//                 <br />
//                 <Button variant="contained"
//                  onClick={async()=>{
//                     const response = await axios.post(`${BASE_URL}/admin/login`,{
//                         username:email,
//                         password:password
//                     },{
//                         headers:{
//                             "Content-type":"application/json",
//                         }
//                     });
//                     const  data=response.data;
//                     localStorage.setItem("token",data.token);
//                     setUser({userEmail:email ,isLoading:false});
//                     navigate("/")
//                 }} >Submit</Button>
//             </Card>
//         </div>

//     </div>
// }

// export default Signin

import { Card, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from 'recoil';
import { userState } from "../store/atoms/user";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

function Signin() {
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const setUser = useSetRecoilState(userState);

    const handleLogin = async (role) => {
        try {
            const response = await axios.post(`${BASE_URL}/${role}/login`, {
                username: email,
                password: password
            }, {
                headers: {
                    "Content-type": "application/json",
                }
            });

            const data = response.data;
            localStorage.setItem("token", data.token);
            setUser({ userEmail: email, isLoading: false ,userRole:role});
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
            // Handle login failure (e.g., show error message)
        }
    };

    return (
        <div>
            <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant={"h6"}>
                    Welcome back. Sign in below
                </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Card variant="outlined" style={{ width: 400, padding: 20, borderRadius: 7 }}>
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        fullWidth={true}
                        onChange={(e) => {
                            setemail(e.target.value);
                        }}
                    />
                    <br></br>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        onChange={(e) => {
                            setpassword(e.target.value);
                        }}
                        fullWidth={true} style={{ marginTop: 10, marginBottom: 10 }} />
                    <br />
                    <div style={{display:"flex"}}>
                        <Button variant="contained" style={{marginRight:10}} onClick={() => handleLogin("admin")}>Admin Login</Button>
                        
                        <Button variant="contained" onClick={() => handleLogin("user")}>User Login</Button>
                    </div>
                    
                </Card>
            </div>
        </div>
    );
}

export default Signin;

