const express = require('express');
const noteModel = require('./models/note.model');


const app = express();
// const port = 3000;
app.use(express.json());



app.get('/', (req, res)=>{
    res.send('Hello World');
});


app.post('/notes', async(req, res)=>{
    const data = req.body;
   await noteModel.create({
        title:data.title,
        description: data.description
    });

    res.status(201).json({
        message:"note created successfully"
    })
})


app.get('/notes', async(req, res)=>{
    const notes = await noteModel.find();

    res.status(200).json({
        message:"notes retrieved successfully",
        notes:notes
    })
})

app.delete('notes/:id', async(req,res)=>{
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message:"note deleted successfully"
    })
})



module.exports = app;