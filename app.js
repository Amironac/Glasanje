const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const mongoose = require("mongoose");

const db = require("./config/db").MongoURI;

mongoose.Promise = global.Promise;

mongoose.connect(db,{useUnifiedTopology:true})
.then(() => console.log("MongoDB Connected ..."))
.catch(err => console.log(err));


app.use(express.static(path.join(__dirname,"public")))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());


app.use("/", require("./routes/router"));



app.listen(4000, console.log("Server started...4000"));