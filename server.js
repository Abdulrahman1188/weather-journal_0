const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { request, response } = require('express');

//Listen port
const port = 8000;

//setup empty JS to act as endpoint for all routes
projectData = {};

//start up an instance of app
const app = express();


/*MiddleWare*/
//here we are configuring express to use bodyParser as middleWare
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//cors for cross origin allowance
app.use(cors());

//initialize the main project folder
app.use(express.static('website'));

//setup server node server.js
app.listen(port, () => {
    console.log(`Server Running On: http://localhost:${port}`);
});

//require express run server & routes
//get all data by http://localhost:8000/getAll

app.get('/getAll', (request, response)=> {
    console.log('here to get all');
    response.send(projectData).status(200).end();
});

//post all data by http://localhost:8000/getAll
app.post('/postData', (request, response) => {
    console.log('here to post data'.request.body);
    //post data 
    projectData={
        temp:request.body.temp,
        Date:request.body.Date,
        content:request.body.content
    };
    response.send(projectData).status(200).end();
});