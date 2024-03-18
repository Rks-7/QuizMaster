const express=require('express');
const mongoose=require('mongoose');
const  {User,Admin,Quiz}=require('../db');
const jwt=require('jsonwebtoken');
const {SECRET}=require("../middleware/auth");
const {authenticateJwt}=require("../middleware/auth")

const router=express.Router();


router.get("/me",authenticateJwt,async (req,res)=>{
    
    const admin=await Admin.findOne({username:req.user.username});
    if(!admin){
        res.status(403).json({msg:"admin does not exist"})
        return 
    }
    res.json({
        username:admin.username
    })
})



router.post('/signup',async(req,res)=>{
    const {username,password}=req.body;
    const admin=await Admin.findOne({username});
    if(admin){
        res.status(403).json({message:"Admin already exists"});
    }else{
        const newAdmin=new Admin({username,password});
        await newAdmin.save();
        const token=jwt.sign({username,role:"admin"},SECRET,{expiresIn:'1h'});
        res.json({message:"Admin created successfully",token});
    }
})

router.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    const admin=await Admin.findOne({username,password});
    if(admin){
        const token=jwt.sign({username,role:"admin"},SECRET,{expiresIn:'1h'});
        res.json({message:"Admin logged in successfully",token});
    }else{
        res.status(403).json({message:"userid or password is invald"});
    }
})

// router.post('/createquiz',authenticateJwt,async(req,res)=>{
//     //create a new quiz
//     const quiz=new Quiz(req.body);
//     await quiz.save();
//     res.json({message:"Quiz created Successfully",quizId: quiz.id});
// })

router.post('/createquiz', authenticateJwt, async (req, res) => {
    const {title}=req.body;
    
  try {
    // Validate req.body here
    const existingquiz= await Quiz.findOne({title});
    if(existingquiz){
        res.status(403).json({message:"quiz of this title already exists",title});
    }else{
        const quiz = new Quiz(req.body);
    await quiz.save();
    res.json({message:"quiz saved successfully",quizId: quiz.id });
    }
    
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.put('/editquiz/:quizId',authenticateJwt,async(req,res)=>{
    //update a specific quiz
  const quiz=await Quiz.findByIdAndUpdate(req.params.quizId,req.body,{new:true});
  if(quiz){
      res.json({message:"Quiz updated successfully"});
  }else{
      res.status(403).json({message:"Quiz not found"});
  }
})

router.get('/allquiz',async(req,res)=>{
    //logic to get all the quizes
    const quizes=await Quiz.find({});
    res.json({quizes});
})


router.get('/quiz/:quizId',authenticateJwt,async(req,res)=>{
    //logic to get a single quiz
    const quizId=req.params.quizId;
    const quiz=await Quiz.findById(quizId);
    res.json({quiz});
})

module.exports=router;