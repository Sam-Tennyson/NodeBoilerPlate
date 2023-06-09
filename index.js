const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const routerr = require("./server/routes/cause_routes");
const auth_router = require("./server/routes/register_route");
const multer = require("multer");
require('dotenv').config()

// set up dependencies
const app = express();
const PORT = process.env.PORT || "7000"
app.use(cors(), (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "application/json");
    next()
  })
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())


// set up mongoose
mongoose.connect('mongodb://127.0.0.1:27017/supportPeople', { useNewUrlParser: true, useUnifiedTopology: true })

// mongoose.connect(process.env.MONGODB)
.then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database', error);
  }
);

mongoose.Promise = global.Promise

// set up route
app.use('/api/', routerr);
app.use('/auth/', auth_router);


app.listen(PORT, (req, res) => {
    console.log("Server started", PORT);
})