const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const connectDb = require('./config/db');
const {errorHandler} = require('./middlewares/errorcontroller');
const {authenticate} = require('./middlewares/auth');


const app = express();

//Database Connection
connectDb();

//body-parser
app.use(bodyParser.json());

//morgan configuration
app.use(morgan('dev'));

//CORS config
app.use(cors());

//set Static
app.use(express.static(path.join(__dirname,'public')));

//Routing
app.use('/slider', require('./routes/slider'));
app.use('/user', require('./routes/userroutes'));
app.use('/academic', require('./routes/academic'));
app.use('/upload', require('./routes/imageRoute'));

//Error Handling
app.use(errorHandler);


app.listen(3000, () => {
    console.log('Connected to Server');
})
