const express = require('express')
const Member = require('../models/members')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const util = require('util')
// register & signup new member :Add
const signUpMember = async(req, res) => {
    try{
        const member = await Member.signup(req.body.matricule,req.body.name,req.body.surname,req.body.email ,req.body.password,req.body.dateEntree,req.body.telNum,req.body.adress)
        res.status(200).json(member)
    }catch(error){
        res.status(400).json({error: error.message})
    }
    // res.json({mssg: 'signedup and added new member !'})
} 
// login function : login a registred member
const loginMember = async (req, res ) => {
    data = req.body 
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
// Function : view and get all memebers 
const getMembers = async(req, res )=> {
    Member.find()
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
}
// Function : get a member by id 
// const getMember = async (req, res) =>{
//     try{
//         myid = req.params.id;
//         Membre = await Member.findOne({ _id : myid })
//         res.status(200).send(membre)
//     }
//     catch(error){
//         res.status(400).send(error)
//     }
// }
// Update Function : update a member using his id 
const updateMember = async (req,res) =>{
    id = req.params.id
    newMember = req.body
    Member.findByIdAndUpdate({ _id:id}, newMember )
     .then(
        (Member) => {
            res.status(200).send(Member)
            console.log("Member updated successfully !")
        }
     )
     .catch(
        (err) => {
            res.status(400).send(err)
        }
     )
}
// Delete Function : delete a member by id 
const deleteMember = (req,res)=>{
    id = req.params.id
    Member.findOneAndDelete({ _id:id })
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
}
module.exports = {signUpMember, loginMember, getMembers,updateMember, deleteMember}