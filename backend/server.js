// requiring and creating express app 
const express = require('express');
const app = express();
// importing route module from routes folder 
const routeProjects = require('./routes/projects')
// requiring member model
const routeMembers = require('./routes/members');
// share public folder and make it accessible 
// app.use(express.static('./public'))
app.use(express.json()) // if we don't use this then we won't have that data in req.body
// Sending welcome message to the client 
app.get('/', (req,res) => {
    res.send('Welcome to our app ! ');
})

// Using Projects route 
// http//127.0.0.1:3000/projects/
app.use('/projects', routeProjects);
// Using Members route
// http//127.0.0.1:3000/members/
app.use('/members', routeMembers);

// requiring and accessing .env variables 
require('dotenv').config();
// requiring connection to DB connect.js file
const connectDB = require('./db/connect');
// Creating a local server on port process.env.port
async function start() {
    try {
        await connectDB(process.env.mongo_uri);
        app.listen(process.env.port, () => {
            console.log('Server is listing on port : ', process.env.port);
        });
    } catch (error) {
        console.log(error);
    }
}
// Calling start(main) function 
start();
