const express = require('express')
const router = express.Router()
const member = require ('../models/members')
// CRUD Operations on members
// POST method : adding a new member 
router.post('/add', (req,res) => {
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
router.get('/getall', (req, res) => {
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
router.get('/getbyid/:id', async (req, res) =>{
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
router.delete('/delete/:id' , (req,res)=>{
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
router.put('/update/:id', (req,res) =>{
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


module.exports = router 