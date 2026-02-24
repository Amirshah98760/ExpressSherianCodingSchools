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

// app.delete('/notes/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
// //   console.log("Received ID:", req.params.id);
//         const deletedNote = await noteModel.findByIdAndDelete(id);

//         if (!deletedNote) {
//             return res.status(404).json({
//                 message: "Note not found"
//             });
//         }

//         res.status(200).json({
//             message: "Note deleted successfully",
//             deletedNote
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: "Error deleting note",
//             error: error.message
//         });
//     }
// });

app.delete('/notes/:id', async (req, res)=>{
    try{
        const id = req.params.id;
        const deletedNote = await noteModel.findByIdAndDelete(id);

        if(!deletedNote){
            return res.status(404).json({
                message:"Note not found"
            })
        }       
        res.status(200).json({
            message:"Note deleted successfully",
            deletedNote
        })
    }
    catch(error){
        res.status(500).json({
            message:"Error deleting note",
            error:error.message
        })
        
    }
})



app.patch('/notes/:id', async (req , res)=>{
    try{
        const id = req.params.id;
        const data =  req.body;
        const updatedNote = await noteModel.findByIdAndUpdate(id, data, {new:true});

        if(!updatedNote){
            return res.status(404).json({
                message:"Note not found"
            })
        }
        res.status(200).json({
            message:"Note updated successfully",
            updatedNote
        })
    }
    catch(error){
        res.status(500).json({
            message:"Error updating note",
            error:error.message
        })
    }
})

module.exports = app;