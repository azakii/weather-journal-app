// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');



// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));
const port = 8080;


// Setup Server

const server = app.listen(port, listening);

function listening(){
    console.log('server running');
    console.log(`localhost: ${port}`);
};

// GET route

app.get('/allData', sendData);

function sendData (req, res) {
    res.send(projectData);
    projectData=[]
}

// POST route
app.post('/weatherData', addData);
console.log(projectData)
function addData(req, res) {
    dataEntry = {
        date:req.body.date,
        temp:req.body.temp,
        usrFeeling:req.body.usrFeeling
    }
    projectData.push(dataEntry);
    console.log(projectData)
}
