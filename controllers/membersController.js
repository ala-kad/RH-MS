const express = require('express')
const Member = require('../models/members')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const util = require('util')
// register & signup new member
const signUpMember = async(req, res) => {
    try{

        const member = await Member.signup(req.body.email ,req.body.password)
        res.status(200).json(member.email)
    }catch(error){
        res.status(400).json({error: error.message})
    }
    // res.json({mssg: 'signedup and added new member !'})
} 
// login function 
const loginMember = async (req, res ) => {
    // data = req.body 
    member = await Member.findOne({ email }) 
    if(!member) {
        res.status(404).send('email or password invalid ')
    }else{
        validPass = bcrypt.compareSync(data.password, member.password)
        if(!validPass){
            res.status(401).send('email or password invalid')
        }else{
            payload = {
                _id: member._id,
                email: member.email,
                name: member.name
            }
            token = jwt.sign(payload, '123')
            res.status(200).send({ mytoken: token })
            // res.json({msg: 'logged in member !'})
        }
    }
}
module.exports = {signUpMember, loginMember}