const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./db/db');

connectDB();
const PORT = process.env.PORT || 5000;



// app.use(express.json());




app.listen(PORT, () => {
    console.log(`The server is running on port : ${PORT}`);
});