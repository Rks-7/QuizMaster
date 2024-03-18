const express = require('express')
const mongoose=require('mongoose')
const cors=require('cors');
const adminRouter=require('./routes/admin');
const userRouter=require('./routes/user');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/admin',adminRouter);
app.use('/user',userRouter);

mongoose.connect('mongodb+srv://shinderugved3:cpFe3fy2dys5jpTH@cluster0.7ikhnix.mongodb.net//quizes', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "quizes" });

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})