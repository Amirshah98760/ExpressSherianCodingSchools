const express = require('express');
const postModel = require('./models/post.model');
const app = express();


// app.get('/', (req, res) => {
//     res.send('Hello World');
// });


app.use(express.json());

app.post('/post', async (req , res)=>{
//    image
    const {title , description} = req.body;

    //validation for title and description
    if(!title.trim() || !description.trim()){
        return res.status(400).json({
            success:false,
            message:"Please provide title and description"
        })
    }
    try {
        const post = await postModel.create({
            title, 
            description,
            // image
        })

        res.status(201).json({
            success:true,
            post
        })        
    } catch (error) {
        
        res.status(500).json({
            success:false,
            message:error.message
        })    }

})


module.exports = app;