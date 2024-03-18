

import { Card, TextField, Checkbox, Button, Typography} from "@mui/material";
import { useState } from "react";
import { BASE_URL } from "../config";
import axios from "axios"


function Addquiz() {
    const [title, settitle] = useState('');
    const [questions, setquestions] = useState([{ questionText: '', options: [{ optionText: '', isCorrect: false }] }]);
    const [imageLink, setimageLink] = useState("");
    const [description, setdescription] = useState("");
       
        const handleaddquestion=()=>{
            setquestions([...questions, { questionText: "", options: [{ optionText: "", isCorrect: false }] }])
        }

        const handleaddoption=(questionIndex)=>{
           const updatedQuestions=[...questions];
            updatedQuestions[questionIndex].options.push({ optionText: "", isCorrect: false });
            setquestions(updatedQuestions);
        }

    const handlesavequiz = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/admin/createquiz`, { title,imageLink,description, questions },
            {
                
                    headers:{
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                
            });
            console.log(response.data); 
            alert("quiz saved successfully");

        } catch (err) {
            console.error('Error saving quiz:', err);
            
        }
    };


    return (

        <div style={{display:"flex",justifyContent:"center", marginTop:20,marginBottom:20}}>
            <Card variant="outlined" style={{width:1000 ,padding:20,borderRadius:10}}>
                <Typography variant="h4" style={{marginBottom:10}}>Make quiz:</Typography>
                <TextField  label="Quiz title" variant="outlined"
                style={{marginBottom:20}}
                 value={title}
                fullWidth={true} onChange={(e)=>{
                    settitle(e.target.value);
                }}
                />
                <TextField label="ImageLink" variant="outlined"
                    style={{ marginBottom: 20 }}
                    value={imageLink}
                    fullWidth={true} onChange={(e) => {
                        setimageLink(e.target.value);
                    }}
                />
                <TextField label="Description" variant="outlined"
                    style={{ marginBottom: 20 }}
                    value={description}
                    fullWidth={true} onChange={(e) => {
                        setdescription(e.target.value);
                    }}
                />
                <Typography  style={{ marginBottom: 10 }}>Edit questions:</Typography>
               <br/>
                {questions.map((question,questionIndex)=>(
                    <div key={questionIndex}>

                        <TextField id="question" label={`Question ${questionIndex+1}`} variant="outlined"
                            style={{ marginBottom: 20,marginTop:20 }}
                        fullWidth={true} value={question.questionText}
                        onChange={(e)=>{
                            const updatedQuestions=[...questions];
                            updatedQuestions[questionIndex].questionText=e.target.value;
                            setquestions(updatedQuestions);
                        }}
                        />
                        <br />
                        {question.options.map((option,optionindex)=>(
                            <div key={optionindex} style={{ display: "flex",marginBottom:20}} >
                            <TextField variant="outlined" label="Option" fullWidth={true}
                            value={option.optionText}
                            onChange={(e)=>{
                                const updatedQuestions=[...questions];
                                updatedQuestions[questionIndex].options[optionindex].optionText=e.target.value;
                                setquestions(updatedQuestions);
                            }}
                             />
                            <Checkbox  value={option.isCorrect} 
                                    onChange={(e) => {
                                        const updatedQuestions = [...questions];
                                        updatedQuestions[questionIndex].options[optionindex].isCorrect = e.target.checked;
                                        setquestions(updatedQuestions);
                                    }}

                             />

                            </div>
                            
                            
                           
                        ))}
                        
                        <Button variant="outlined" 
                        onClick={()=>handleaddoption(questionIndex)}
                        >Add option</Button>
                    </div>
                    

                ))}
                <br />
                <Button variant="outlined"
                    style={{marginRight:10}}
                    onClick={handleaddquestion}
                >Add question</Button>
                <Button variant="contained" 
                onClick={handlesavequiz}
                >Save Quiz</Button>
                
                
            </Card>
        </div>
    )
}

export default Addquiz;
