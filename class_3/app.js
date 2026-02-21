const express = require('express');
const { clearScreenDown } = require('readline');

const app = express();
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Welcome to the Notes API");
});

const notes = [];

// POST /notes - Create a new note
app.post('/notes', (req, res)=>{
    notes.push(req.body);
    // console.log(req.body);
    // const note = req.body.note;
    // notes.push(note);
    res.status(201).json({message: "Note created successfully"});
})

// GET /notes - Retrieve all notes
app.get('/notes', (req, res)=>{
   res.status(200).json({
    message: "Notes retrieved successfully",
    notes: notes
   });
});

// DELETE /notes/:index - Delete a note by index
app.delete('/notes/:index', (req, res)=>{
    const index = req.params.index;
    if(index >= notes.length || index < 0){
        return res.status(404).json({message: "Note not found"});
    }
    delete notes[index];
    res.status(200).json({message: "Note deleted successfully"});
});


// Patch /notes/:index - Update a note by index
app.patch('/notes/:index', (req, res)=>{
    const index = req.params.index;
    const description  = req.body.description;
    notes[index].description = description;

    res.status(200).json({message: "Note updated successfully"});
});


// app.get('/notes', (req, res)=>{
//     res.status(200).json({
//         message:'Notes retrieved successfully',
//         notes:notes
//     });
// });





module.exports = app;