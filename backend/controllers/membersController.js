const express = require('express')
const Member = require('../models/members')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const util = require('util')
const mongoose = require("mongoose");

// cors
const cors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
}

/// clean data
const cleanData = (data) => {
  let member = {...data._doc};
  member.id = member._id;
  delete member.password;
  delete member._id;
  delete member.__v;
  return member;
}

// register & signup new member :Add
const addMember = async(req, res) => {
    try{
        const exist = await Member.findOne({ email:req.body.email })
        if(exist){
            throw Error ('Email already in use !')
        }
        const salt = bcrypt.genSaltSync(10);
        const member = await bcrypt.hash(req.body.password, salt).then(hash => {
          return Member.create({ 
            matricule: req.body.matricule,
            name: req.body.name, 
            surname: req.body.surname, 
            email: req.body.email, 
            password: hash , 
            dateEntree: req.body.dateEntree, 
            telNum: req.body.telNum, 
            adress: req.body.adress});
        })
      
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
            //res.setHeader('Access-Control-Allow-Origin', '*');
            cors(res);
            res.append('X-Total-Count', members.length);
            res.append('Access-Control-Expose-Headers', 'X-Total-Count');
            let data = members.map(item => { 
              return cleanData(item);
            });  
            res.status(200).send(data)
        }
    )
    .catch(
        (err) => {
            res.status(400).send(err)
        }
    )
}

// Function : get a member by id 
const getMember = async (req, res) =>{
    try{
        let id = req.params.id;
        await Member.findOne({ _id : id }).then((data)=>{
          let member = cleanData(data);
          console.log(util.inspect(member));
          cors(res);
          res.status(200).send(member)
        });
    }
    catch(error){
        res.status(400).send(error)
    }
}

// Update Function : update a member using his id 
const updateMember = async (req,res) =>{
    let id = req.params.id;
    let newMemberData = req.body;
    Member.findByIdAndUpdate(id, newMemberData )
     .then(
        (data) => {
            let member = cleanData(data);
            cors(res);
            res.status(200).send(member)
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
module.exports = {getMembers, addMember, getMember, updateMember, deleteMember, loginMember}