const mongoose = require('mongoose');


const connectDB = async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/mydatabase');
        console.log('Connected to db');
    } catch (error) {
        console.error('Database connection error:', error.message);
    }
}


module.exports = connectDB;