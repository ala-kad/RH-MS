const express = require('express')
const router = express.Router()
const Member = require ('../models/members')
// controller functions
const {signUpMember, loginMember, getMembers, updateMember, deleteMember} = require('../controllers/membersController')
// inporting bcrypt library
const bcrypt = require('bcrypt')
// importing jwt
const jwt = require('jsonwebtoken')
const util = require('util')
// POST method : register add a new member
router.post('/register', signUpMember)
// login function 
router.post('/login',loginMember)
// GET method: view all members 
router.get('/getall',getMembers) 
// GET method : find a member by id
router.get('/getbyid/:id', async (req, res) =>{
    try{
        myid = req.params.id;
        Member = await Member.findOne({ _id : myid })
        console.log(util.inspect(Member));

        res.status(200).send(Member)
    }
    catch(error){
        res.status(400).send(error)
    }
})
// PUT method : update a member by id 
router.put('/update/:id', updateMember)
// DELETE method : delete a member by id
router.delete('/delete/:id' , deleteMember)
// exporting router
module.exports = router 
