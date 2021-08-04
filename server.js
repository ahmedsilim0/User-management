const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const url = require('./server/database/connection'); 

//log request
app.use(morgan('tiny'));

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

//set view engine 
app.set('view engine'  , 'ejs');

//load assests
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


//load router
app.use('/'  , require('./server/routes/router'));

//connect to mongoDB
mongoose.connect(url ,{useNewUrlParser:true ,useUnifiedTopology :true , useFindAndModify:false , useCreateIndex:true})
.then(()=>console.log('Connected'))
.catch((error) => {
    console.log('error');
});



//run app
app.listen(3000  , ()=> console.log('server is running on 3000...'));