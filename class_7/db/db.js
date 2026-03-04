const mongoose = require('mongoose');


const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI, );
        console.log("MongoDb is successfully connected ");
        
    } catch (error) {
        console.log("MongoDb connection failed ", error);
    }
}

module.exports = connectDB;