const express=require('express');
const mongoose=require('mongoose');
const  {User,Admin,Quiz}=require('../db');
const jwt=require('jsonwebtoken');
const {SECRET}=require("../middleware/auth");
const {authenticateJwt}=require("../middleware/auth")


const router=express.Router();


router.get("/me",authenticateJwt,async (req,res)=>{
    
    const user=await User.findOne({username:req.user.username});
    if(!user){
        res.status(403).json({msg:"user does not exist"})
        return 
    }
    res.json({
        username:user.username
    })
})

router.post('/signup',async(req,res)=>{
    const {username,password}=req.body;
    const user=await User.findOne({username});
    if(user){
        res.status(403).json({message:"user already exists"});
    }else{
        const newuser=new User({username,password});
        await newuser.save();
        const token=jwt.sign({username,role:"user"},SECRET,{expiresIn:'1h'});
        res.json({message:"user sign up successful",token});
    }
})

router.post('/login',async(req,res)=>{      
    const {username,password}=req.body;
    const user=await User.findOne({username,password});
    if(user){
        const token =jwt.sign({username,role:"user"},SECRET,{expiresIn:'1h'});
        res.json({msg:"user logged in successfully",token});
    }else{
        res.status(403).json({msg:"Invalid username or password"});
    }
})

router.post('/GivenQuizes/:quizId', authenticateJwt,async (req, res) => {
  // logic to purchase a course
  const quiz=await Quiz.findById(req.params.quizId);
  if(quiz){
    const user=await User.findOne({username:req.user.username});
    if(user){
      user.GivenQuizes.push(quiz);
      await user.save();
      res.json({message:"You have given the quiz successfully"});
    }else{
      res.status(403).json({message:"user not found"});
    }
  }else{
    res.status(403).json({message:"quiz not found"});
  }
});

router.get('/GivenQuizes',authenticateJwt,async(req,res)=>{
    const user=await User.findOne({username:req.user.username}).populate("GivenQuizes");
    if(user){
        res.json({GivenQuizes:user.GivenQuizes ||[]})
    }else{
    res.json({message:"User not found"});
  }
})
//EDIT FROM HERE  
router.get('/allquiz', authenticateJwt,async (req, res) => {
  // logic to list all quizes
  const quizes=await Quiz.find({});
  res.json({quizes});
});

router.get('/quiz/:quizId',authenticateJwt,async(req,res)=>{
    //logic to get a single quiz
    const quizId=req.params.quizId;
    const quiz=await Quiz.findById(quizId);
    res.json({quiz});
})

router.post('/submit/:quizId',authenticateJwt,async(req,res)=>{
  const {selectedOptions,quizId}=req.body;
  const quiz=await Quiz.findById(quizId);
  if(quiz){
    let score=0;
    quiz.questions.forEach((question,index)=>{
      const correctoptionindex=question.options.findIndex(option=>option.isCorrect);
      if(selectedOptions[index]==correctoptionindex){
        score++;
      }
    });

    res.json({score});
  }else{
    res.status(404).json({msg:"Quiz not found"});
  }

})

module.exports = router;