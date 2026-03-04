require('dotenv').config();
const app = require("./app");
const connectDB = require("./db/db")

const PORT = process.env.PORT || 5000;
connectDB();


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});