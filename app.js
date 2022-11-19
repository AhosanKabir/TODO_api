// basic needs...
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/Routes/api');
const app = new express();


// security middleware :

const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');
const mongoSanitize =  require('express-mongo-sanitize');
const rateLimit =  require('express-rate-limit');
const xss = require('xss-clean');


// mongoose connect :
const mongoose = require('mongoose');


//implement :
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(mongoSanitize());
app.use(rateLimit());
app.use(xss());

//body-parser implement :
app.use(bodyParser.json());

//request rate limit implement

const limiter = rateLimit(
    {
        windowMs: 15*60*1000,
        max: 15
    }
)

app.use(limiter);



// mongoose connection:

let URI = "mongodb://localhost:27017/TODO";
let OPTION = {user:'', pass:'', autoIndex:true};
mongoose.connect(URI , OPTION, (err)=>{
    console.log("connection success mongodb with mongoose");
    console.log(err);
})

//routing Implement:
app.use('/api/v1', router);

//undefined route implement:
app.use('*', (req,res)=>{
    res.status(404).json({status:"Route is not defined", data : "Not Found"})
})


//export app:
module.exports = app;