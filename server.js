const express = require('express');
const app = express();
// requiring connection to Db file
const connectDB = require('./db/connect');
// requiring member model
const member = require('./models/members');
// requiring projects model
const project = require('./models/projects');

// requiring and accessing .env variables 
require('dotenv').config();
// share public folder and make it accessible 
// app.use(express.static('./public'))
app.use(express.json()) // if we don't use this then we win't have that data in req.body
// Sending welcome message to the client 
app.get('/', (req,res) => {
    res.send('Welcome to our app ! ');
})

// CRUD Operations on members
// POST method : adding a new member 
app.post('/add', (req,res) => {
    data = req.body;
    console.log(data)
    const Member = new member(data)
    Member.save()
    .then(
        (savedMember) => {
            res.status(200).send(savedMember)
            console.log('just added a new member!')
        }
    )
    .catch (
    (err) => {
        res.status(400).send(err)  
    })
    /* res.send(__dirname + './public/index.html');*/
})
// GET method: view all members 
app.get('/getall', (req, res) => {
    member.find()
    .then(
        (members)=>{
            res.status(200).send(members)
        }
    )
    .catch(
        (err) => {
            res.status(400).send(err)
        }
    )
})
// GET method : find a member by id
app.get('/getbyid/:id', async (req, res) =>{
    try{
        myid = req.params.id;
        membre = await member.findOne({ _id : myid })
        res.status(200).send(membre)
    }
    catch(error){
        res.status(400).send(error)
    }
})
// DELETE method : delete a member by id
app.delete('/delete/:id' , (req,res)=>{
    id = req.params.id
    member.findOneAndDelete({ _id:id })
    .then (
        (deletedMember) =>{
            res.status(200).send(deletedMember)
            console.log('member deleted !')
        }
    )
    .catch (
        (err) => {
            res.status(400).send(err)
        }
    )
})
// PUT method : update a member by id 
app.put('/update/:id', (req,res) =>{
    id = req.params.id
    newMember = req.body
    member.findByIdAndUpdate({ _id:id}, newMember )
     .then(
        (updatedMember) => {
            res.status(200).send(updatedMember)
        }
     )
     .catch(
        (err) => {
            res.status(400).send(err)
        }
     )
})

// PROJECTS
// Add a new project
app.post('/addProject', (req,res) => {
    data = req.body;
    console.log(data)
    const Project = new project(data)
    Project.save()
    .then(
        (savedProject) => {
            res.status(200).send(savedProject)
            console.log('just added a new project!')
        }
    )
    .catch (
    (err) => {
        res.status(400).send(err)  
    })
    /* res.send(__dirname + './public/index.html');*/
})
// View all projects
app.get('/getAllProjects', (req, res) => {
    project.find()
    .then(
        (projects)=>{
            res.status(200).send(projects)
        }
    )
    .catch(
        (err) => {
            res.status(400).send(err)
        }
    )
})
// Get a project by id
app.get('/getProjectbyid/:id', async (req, res) =>{
    try{
        id = req.params.id;
        proj = await project.findOne({ _id : id })
        res.status(200).send(proj)
    }
    catch(error){
        res.status(400).send(error)
    }
})
// DELETE a project by id
app.delete('/deleteProject/:id' , (req,res)=>{
    id = req.params.id
    project.findOneAndDelete({ _id:id })
    .then (
        (deletedProject) =>{
            res.status(200).send(deletedProject)
            console.log('Project deleted !')
        }
    )
    .catch (
        (err) => {
            res.status(400).send(err)
        }
    )
})
// PUT method : update a project by id 
app.put('/updateProject/:id', (req,res) =>{
    id = req.params.id
    newProject = req.body
    project.findByIdAndUpdate({ _id:id }, newProject )
     .then(
        (updatedProject) => {
            res.status(200).send(updatedProject)
        }
     )
     .catch(
        (err) => {
            res.status(400).send(err)
        }
     )
})


// Creating a local server on port 3000
async function start() {
    try {
        await connectDB(process.env.mongo_uri);
        app.listen(3000, () => {
            console.log('Server is listing on port : ', process.env.port);
        });
    } catch (error) {
        console.log(error);
    }
}
start();
// main().catch(err => console.log(err));
// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/test');
// }
// const kittySchema = new mongoose.Schema({
//     name: String
// });
// const kitten = new mongoose.model('Kitten', kittySchema);
// const silence = new kitten({name : 'Silence'});
// console.log(silence.name);
