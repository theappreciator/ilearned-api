console.log("Starting ilearned-api...");

const express= require('express');
const mongoose= require('mongoose');

const cool = require('cool-ascii-faces');

const app=express();

const dbHost = "theappreciator.k8b8h.mongodb.net";
const url= "mongodb+srv://ilearned:2WZB7pYhN1c6Skq2@" + dbHost + "/myFirstDatabase?retryWrites=true&w=majority";
//const url= "mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]";
// mongodb+srv://ilearned:<password>@theappreciator.k8b8h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// User ilearned
// Pass 2WZB7pYhN1c6Skq2
mongoose.connect(url,{useNewUrlParser: true});
const con= mongoose.connection;
app.use(express.json());
try{
    con.on('open',() => {
        console.log('connected to mongodb: ' + dbHost);
    })
}catch(error)
{
    console.log("Error connecting to mongodb: " + error);
}

const apiBase = "/api";

const studentrouter= require("./routes/students");
app.use(apiBase + '/students',studentrouter);

app.get('/cool', (req, res) => res.send(cool()))


const PORT = process.env.PORT || 9000;
app.listen(PORT, () =>{
    console.log('Server starting on port ' + PORT);
})