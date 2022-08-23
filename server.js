const express = require('express');
const app = express();
const mongoose = require('mongoose');

// import "reflect-metadata";
// Sending welcome message to the client 
app.get('/', (req,res) => {
    res.send('Welcome to our app ! ');
})
// Creating a local server on port 3000
app.listen(3000, ()=> {
    console.log('Server is listing on port : 3000');
})

// Connection to data base 
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}
const kittySchema = new mongoose.Schema({
    name: String
});
const kitten = new mongoose.model('Kitten', kittySchema);
const silence = new kitten({name : 'Silence'});
console.log(silence.name);