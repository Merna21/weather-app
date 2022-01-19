// Setup empty JS object to act as endpoint for all routes
let projectData = {}

// Require Express to run server and routes
const express= require('express');
const app=express();
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;

const server = app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
};

app.get('/getData', getRoute);

function getRoute(req,res){
    res.send(projectData);
  }

app.post('/postData', postRoute);

function postRoute (req,res){
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    userResponse: req.body.userResponse
    }
    res.send(projectData);
};

