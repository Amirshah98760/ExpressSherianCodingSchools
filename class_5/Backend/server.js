const app = require('./app');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
require('dotenv').config();

connectDB();  

const PORT = process.env.PORT || 4000;


app.listen(PORT, ()=>{
    console.log("The server is listening on port : " + PORT);

})