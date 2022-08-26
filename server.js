const express = require('express');
const app = express();
// const mongoose = require('mongoose');
const connectDB = require('./db/connect');
const member = require('./models/members');

// requiring and accessing .env variables 
require('dotenv').config();

// share public folder and make it accessible 
// app.use(express.static('./public'))
app.use(express.json()) // if we don't use this then we win't have that data in req.body
// Sending welcome message to the client 
app.get('/', (req,res) => {
    res.send('Welcome to our app ! ');
})
// POST method : adding a new member 
app.post('/add', (req,res) => {
    console.log('Post is working')
    data = req.body;
    console.log(data)
    const Member = new member(data)
    Member.save()
    .then(
        (savedMember) => {
            console.log(savedMember)
        }
    )
    .catch (
        (err) => {
            console.logg (err)
    })
    /* res.send(__dirname + './public/index.html');*/
})

// GET method: view all members 
app.get('/getall', (req, res) => {
    member.find()
    .then(
        (members)=>{
            res.send(members)
        }
    )
    .catch(
        (err) => {
            res.send(err)
        }
    )
})
// GET method : find a member by id
app.get('/getbyid/:id', async (req, res) =>{
    try{
        myid = req.params.id;
        membre = await member.findOne({ _id : myid })
        res.send(membre)
    }
    catch(error){
        res.send(error)
    }
})
// DELETE method : delete a member by id
app.delete('/delete/:id' , (req,res)=>{
    id = req.params.id
    member.findOneAndDelete({ _id:id })
    .then (
        (deletedMember) =>{
            res.send(deletedMember)
            console.log('member deleted !')
        }
    )
    .catch (
        (err) => {
            res.send(err)
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
// PUT method : update a member by id 
app.put('/update/:id', (req,res) =>{
    id = req.params.id
    newMember = req.body
    member.findByIdAndUpdate({ _id:id}, newMember )
     .then(
        (updatedMember) => {
            res.send(updatedMember)
        }
     )
     .catch(
        (err) => {
            res.send(err)
        }
     )
})
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
