import {Card, Checkbox, Typography,Button } from "@mui/material";
import axios from "axios";
import {useState,useEffect} from "react";
import { useParams } from "react-router";
import { BASE_URL } from "../config";
import {Loading} from "./Loading";
import { useNavigate } from "react-router";

function Givequiz(){
    const navigate = useNavigate();
    const {quizId}=useParams();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
    const [selectedOptions,setselectedOptions]=useState([]);
    const [score, setscore] = useState(0);
   const [timer, settimer] = useState(180);

     
    useEffect(() => {
        axios.get(`${BASE_URL}/user/quiz/${quizId}`,{
            method:"GET",
            headers:{
                
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res=>{
            setQuiz(res.data.quiz)
        })
    }, []);


   

     
    useEffect(() => {
        const timerInterval = setInterval(() => {
            settimer((prevTimer) => {
                if (prevTimer <= 0) {
                    clearInterval(timerInterval);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    // Use useEffect to handle submission when timer reaches 0
    useEffect(() => {
        if (timer === 0) {
            handleSubmit();
        }
    }, [timer]);


    const handleOptionChange = (optionIndex) => {
        setselectedOptions((prevSelectedOptions) => {
            const updatedSelectedOptions = [...prevSelectedOptions];
            updatedSelectedOptions[currentQuestionIndex] = optionIndex;
            return updatedSelectedOptions;
        });
        
    };

    const  handleQuestion=()=>{
            if(selectedOptions[currentQuestionIndex]!==undefined){
                setcurrentQuestionIndex((prevIndex)=>prevIndex+1);
            }else{
                alert("Please select an option ")
            }
    }

    const handleSubmit=async ()=>{
        
        try {
            
            console.log("Submitting quiz with selected options:", selectedOptions);
            const response = await axios.post(`${BASE_URL}/user/submit/${quizId}`, { selectedOptions: selectedOptions,quizId},
            
            {headers:{
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
            });
            setscore(response.data.score);
            navigate('/resultpage/'+response.data.score);
            
        } catch (error) {
                console.error("error submitting the code: ",error);
        }
    }
    if (!quiz) {
        return <Loading />
    }
  
    const currentQuestion=quiz.questions[currentQuestionIndex];

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          variant="outlined"
          style={{ width: 700, padding: 10, borderRadius: 20 }}
        >
          <div style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" style={{ fontWeight: 600 }}>
                Question {currentQuestionIndex + 1}/{quiz.questions.length}:
              </Typography>
              <Card
                variant="outlined"
                style={{ backgroundColor: "black", borderRadius: 20 }}
              >
                <Typography
                  variant="body1"
                  style={{ padding: 10, color: "white" }}
                >
                  Time Remaining: {Math.floor(timer / 60)}:{timer % 60}
                </Typography>
              </Card>
            </div>
            <br></br>
            <Typography variant="h6" style={{ fontWeight: 500 }}>
              <b>{currentQuestionIndex + 1}. </b>
              {currentQuestion.questionText}
            </Typography>
            <br />
            {currentQuestion.options.map((option, optionIndex) => (
              <div key={optionIndex} style={{ display: "flex" }}>
                <Typography>
                  <Checkbox
                    checked={
                      selectedOptions[currentQuestionIndex] == optionIndex
                    }
                    onChange={() => handleOptionChange(optionIndex)}
                  />
                  {option.optionText}
                </Typography>
                <br />
              </div>
            ))}
            <br />
            {currentQuestionIndex < quiz.questions.length - 1 ? (
              <Button variant="outlined" onClick={handleQuestion}>
                Next Question
              </Button>
            ) : (
              <Button variant="contained" onClick={handleSubmit}>
                Submit Quiz
              </Button>
            )}
          </div>
        </Card>
      </div>
    );

}
export default Givequiz;