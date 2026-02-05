const express = require('express');

const app = express();
const PORT = 3000; 

app.get('/', (req,res )=>{
    res.status(200).send('Hello, world!');
});

app.get('/about', (req,res)=>{
    res.status(200).send('This is the about page.');
});


app.listen(PORT, ()=>{
    console.log(`The Server is listening on Port http://localhost:${PORT}`);
})