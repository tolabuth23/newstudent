const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 500
const app = express();
const studentRoute = require("./routes/student")


//all api route student here
app.use(cors());
app.use(express.json());
app.use("/api/student", studentRoute);


app.listen(PORT, function () {
    console.log('CORS-enabled web server listening on port '+PORT)
  })