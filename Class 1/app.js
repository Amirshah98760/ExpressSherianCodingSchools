const express = require('express');
const app = express();
const notes = []

app.post('/notes', (req, res) => {
    // const {title , description} = req.body;
    notes.push(req.body);
    res.status(201).json({
     message:'note created successfully'
    });
})


module.exports = app;
