const mongoose=require('mongoose');

const optionSchema=new mongoose.Schema({
    optionText:String,
    isCorrect:Boolean
})

const questionSchema=new mongoose.Schema({
    questionText:String,
    options:[optionSchema]
})

const quizSchema=new mongoose.Schema({
    title: String,
    description:String,
    imageLink:String,
    Given:Boolean,
    questions:[questionSchema]
})

const adminSchema=new mongoose.Schema({
    username:String,
    password:String
});

const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    GivenQuizes:[{type: mongoose.Schema.Types.ObjectId, ref:'Quiz'}]
})


const User=mongoose.model('User',userSchema);
const Admin=mongoose.model('Admin',adminSchema);
const Quiz=mongoose.model('Quiz',quizSchema);

module.exports={
    User,
    Admin,
    Quiz
}