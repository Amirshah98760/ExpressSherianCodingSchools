const express = require('express');
const app = express();


app.use(express.json());


const notes = [];

app.get('/', (req , res )=>{
    res.send('Hello From home page of Express');
});


// app.get('/about', (req , res )=>{
//     res.send('Hello From about page of Express');   
// });


app.post('/notes', (req , res )=>{
 const {title , description} = req.body;
    const note = {
        title,
        description
    }
    notes.push(note);
    // console.log(notes)
    res.status(201).json({
        message: 'Note created successfully',
        note
    });
})



app.get('/notes', (req , res) =>{
    res.json({
        notes: notes
    })
})
// async function mongoConnect(){
//     try {
//         moongoose.connect('mongodb://localhost:27017/notes-app');
// console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('Error connecting to MongoDB', error);
//     }
// }

// mongoConnect();

module.exports = app;
