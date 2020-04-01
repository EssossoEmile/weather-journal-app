// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const bodyParser = require('body-parser')
const express = require('express')

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listener);

function listener(){
    console.log(`Server is running on localhost: ${port}`);
}

app.get('/all', function (req, res) {
    console.log(req)
    res.send(projectData)
  })

app.post('/addInfo', addInfo);
function addInfo(req, res){
    console.log(req.body)
    let data = req.body;
    projectData = {
        temp: data.temp,
        date: data.date,
        content: data.content 
    };
}