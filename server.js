const dotenv=require('dotenv');
dotenv.config();
const port=process.env.PORT;
const db_url=process.env.DATABASE_URL;
//route
const postRoute=require('./routes/post');
const authRoute=require('./routes/user');
//cors
const cors=require('cors')
//bodyparser
const bodyParser=require('body-parser');
//express
const express=require('express');
const app=express();
//mongodb connect
const mongoose=require('mongoose');

mongoose.connect(db_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Database Connected Successfully');
})

app.use(cors());
// using cors
// app.use(cors({
//     origin:['http://domain.com'],
//     methods:["GET","POST","PUT","PATCH","DELETE"]
// }));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api',postRoute);
app.use('/api',authRoute);

//creating server
app.listen(port||8000, ()=>{
    console.log(`Server is running on port${port}`);
})

