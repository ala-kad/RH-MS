// requiring and creating express app 
const express = require('express');
const app = express();
const path = require('path')
// morgan logger
const logger = require('morgan')

// fs
const fs = require('fs')

const stream = fs.createWriteStream(path.join(__dirname, 'logger.log'), {flags: 'a'})
app.use(logger('dev', {stream: process.env.NODE_ENV === 'production' ? stream : ""}))
// cors
const cors = require('cors')
app.use(cors())
// importing route module from routes folder 
const routeProjects = require('./routes/projects')
// requiring member model
const routeMembers = require('./routes/members');
// share public folder and make it accessible 
// app.use(express.static('./public'))
app.use(express.json()) // if we don't use this then we won't have that data in req.body
// requiring and accessing .env variables 
require('dotenv').config();
// requiring connection to DB connect.js file
const connectDB = require('./db/connect');
// Sending welcome message to the client 
app.get('/', (req,res) => {
    res.send('Welcome to our app ! ');
})
// Using Projects route 
// http//127.0.0.1:4000/projects/
app.use('/projects', routeProjects);
// Using Members route
// http//127.0.0.1:4000/members/
app.use('/members', routeMembers);

// Creating a local server on port process.env.port
async function start(req,res) {
    try {
        await connectDB(process.env.mongo_uri);
        app.listen(process.env.port, () => {
            console.log('Server is listing on port : ', process.env.port);
        });
    } catch (error) {
        res.json({error: error})
    }
}
// Calling start(main) function 
start();
