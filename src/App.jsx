import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from "./components/Appbar";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import Signin from "./components/Signin"
import {useEffect} from "react"
import {userState} from "./store/atoms/user"
import Addquiz from "./components/Addquiz"
import {Loading} from "./components/Loading"
import Editquiz from './components/Editquiz';
import Givequiz from "./components/Givequiz"
import Startquiz from "./components/Startquiz"
import Resultpage from "./components/Resultpage"
import {
  RecoilRoot,
  useSetRecoilState
} from 'recoil';
import axios from 'axios';
import { BASE_URL } from "./config"

function App() {


  return (
    <RecoilRoot>
      <div style={{
        width:"100vw",
        height:"100vh",
        backgroundColor: "#eeeeee"
      }}>
        <Router>
          <Appbar />
          <InitUser/>
          <Routes>
              <Route path={"/"} element={<Landing/>} />
              <Route path={"/quiz/:quizId"} element={<Givequiz/>} />
              <Route path={"/startquiz/:quizId"} element={<Startquiz/>}/>
              <Route path={"/resultpage/:score"} element={<Resultpage/>}  />
            <Route path={"/addquiz"} element={<Addquiz />}/>
            <Route path={"/signup"} element={<Signup/>}/>
            <Route path={"/signin"} element={<Signin/>}/>
            <Route path={"/editquiz/:quizId"} element={<Editquiz/>}/>
          </Routes>
        </Router>

      </div>
      
    </RecoilRoot>
  )
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      
      
      const response = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
        
      })
    
      if (response.data.username) {
        console.log("adminme")
        setUser({
          isLoading: false,
          userEmail: response.data.username,
          userRole:"admin"
        })
      } else {

        try {
          const response=await axios.get(`${BASE_URL}/user/me`,{
            headers:{
              "Authorization": "Bearer " + localStorage.getItem("token")
            }
          })
          if(response.data.username){
            console.log("userme")
            setUser({
              isLoading: false,
              userEmail: response.data.username,
              userRole: "user"
            })
          }else{
            setUser({
              isLoading: false,
              userEmail: null,
              userRole:null
            })
          }
        } catch (error) {
          console.log("error at userme")
          setUser({
            isLoading: false,
            userEmail: null,
            userRole: null
          })
        }
      }
    } catch (e) {
      console.log("hi");
      setUser({
        isLoading: false,
        userEmail: null,
         userRole: null
      })
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>
}
export default App
