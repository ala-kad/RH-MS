const express = require('express')
const router = express.Router()
// const Member = require ('../models/members')
// controller functions
const {signUpMember, loginMember} = require('../controllers/membersController')
// inporting bcrypt library
const bcrypt = require('bcrypt')
// importing jwt
const jwt = require('jsonwebtoken')
// CRUD Operations on members
// POST method : adding a new member 
// router.post('/add', (req,res) => {
//     data = req.body;
//     console.log(data)
//     const member = new Member(data)
//     Member.save()
//     .then(
//         (savedMember) => {
//             res.status(200).send(savedMember)
//             console.log('just added a new member!')
//         }
//     )
//     .catch (
//     (err) => {
//         res.status(400).send(err)  
//     })
//     /* res.send(__dirname + './public/index.html');*/
// })

// POST method : login
router.post('/register', signUpMember)
//     data = req.body
//     member = new Member(data)
//     salt = bcrypt.genSaltSync(10);
//     cryptedPass = await bcrypt.hashSync(data.password, salt)
//     member.password = cryptedPass
//     member.save()
//     .then(
//         (saved) => {
//             res.status(200).send(saved)
//         }
//     )
//     .catch(
//         (err) => {
//             res.status(400).send(err)
//         }
//     )
// })
// login function 
router.post('/login',loginMember)
//     data = req.body 
//     member = await Member.findOne({ email : data.email}) 
//     if(!member) {
//         res.status(404).send('email or password invalid ')
//     }else{
//         validPass = bcrypt.compareSync(data.password, member.password)
//         if(!validPass){
//             res.status(401).send('email or password invalid')
//         }else{
//             payload = {
//                 _id: member._id,
//                 email: member.email,
//                 name: member.name
//             }
//             token = jwt.sign(payload, '123')
//             res.status(200).send({ mytoken: token })
//         }
//     }
// })

// GET method: view all members 
router.get('/getall', (req, res) => {
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
})
// GET method : find a member by id
router.get('/getbyid/:id', async (req, res) =>{
    try{
        myid = req.params.id;
        Membre = await Member.findOne({ _id : myid })
        res.status(200).send(membre)
    }
    catch(error){
        res.status(400).send(error)
    }
})
// DELETE method : delete a member by id
router.delete('/delete/:id' , (req,res)=>{
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
})
// PUT method : update a member by id 
router.put('/update/:id', (req,res) =>{
    id = req.params.id
    newMember = req.body
    Member.findByIdAndUpdate({ _id:id}, newMember )
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
// exporting router