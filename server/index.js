const express = require('express')
const mongoose=require('mongoose')
const cors=require('cors');
const adminRouter=require('./routes/admin');
const userRouter=require('./routes/user');
require("dotenv").config(); 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/admin',adminRouter);
app.use('/user',userRouter);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "quizes",
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})