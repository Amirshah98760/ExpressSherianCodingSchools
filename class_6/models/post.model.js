const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false

    }
})


const postModel = mongoose.model('post', postSchema);

module.exports = postModel;
