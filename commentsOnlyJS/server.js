// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express();
/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser')
app.use(bodyParser.json());
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('../website'));
// Spin up the server
const port = 3000;

// Callback to debug

// Initialize all route with a callback function
const server = app.listen(port, listener)
function listener(){
    console.log(`Server is running on localhost: ${port}`);
}
// Callback function to complete GET '/all'
app.get('/all', function (req, res) {
    console.log(req)
    res.send(projectData)
  })

// Post Route
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