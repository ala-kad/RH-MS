const express = require('express')
const router = express.Router()
const Member = require ('../models/members')
// controller functions
const {getMembers, addMember, getMember, updateMember, deleteMember, loginMember} = require('../controllers/membersController')
// inporting bcrypt library
const bcrypt = require('bcrypt')
// importing jwt
const jwt = require('jsonwebtoken')

router.get('/',getMembers) 

router.post('/add', addMember)

// GET method : find a member by id
router.get('/:id', getMember)

// PUT method : update a member by id 
router.patch('/:id', updateMember)

// DELETE method : delete a member by id
router.delete('/:id' , deleteMember)

router.post('/login',loginMember)

module.exports = router 
// exporting router