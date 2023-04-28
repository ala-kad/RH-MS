const Member = require('../models/members')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/// clean data
const cleanData = (data) => {
  let member = {...data._doc};
  member.id = member._id;
  delete member.password;
  delete member._id;
  delete member.__v;
  return member;
}
// Create a token 
const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}
// register & signup new member :Add
const registerMember = async(req, res) => {
    try{
         // Validation of req
        if (!req.body.email || !req.body.password){
            throw Error("All fields must be correctly filled !")
        }
        if(!validator.isEmail(req.body.email)){
            throw Error("Invalid email !")
        }
        const exist = await Member.findOne({ email:req.body.email })
        if(exist){
            throw Error ('Email already in use !')
        }
        const salt = bcrypt.genSaltSync(10);
        const member = await bcrypt.hash(req.body.password, salt).then(hash => {
          return Member.create({ 
            username: req.body.username,
            email: req.body.email, 
            password: hash ,
            roles: req.body.roles, 
            telNumber: req.body.telNumber
            });
        })
        const token = createToken(member._id)
        res.status(200).json({email: member.email, token : token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
} 

// login function : login a registred member
const loginMember = async (req, res ) => {
    const userLoggingIn = req.body 
    const email = userLoggingIn.email 
    try {
          // Validation of req
          if (!req.body.email || !req.body.password){
            throw Error("All fields must be correctly filled !")
        }
        if(!validator.isEmail(req.body.email)){
            throw Error("Invalid email !")
        }
        let member = await Member.findOne({ email }) 
        if(!member) {
            res.status(404).send('email or password invalid ')
        }
        else{
            const validPass = await bcrypt.compare(userLoggingIn.password, member.password)
            if(!validPass){
                res.status(401).send('email or password invalid')
            }
            else{
                const payload = {
                    _id: member._id,
                    email: member.email,
                    name: member.name
                }
                jwt.sign(payload, process.env.SECRET,{expiresIn: 86400}, (err, token) => {
                    if(err) return res.json({message: err})
                    return res.json({
                        message: "Success",
                        token: "Bearer " + token
                    })
                })
               
                // token = createToken(member._id)
                // res.status(200).json({email: member.email, token : token})
            }
        }
    }catch(error){
        res.status(500).json({error : error.message})
    }
}

// Function : view and get all memebers 
const getMembers = async(req, res )=> {
    Member.find()
    .then(
        (members)=>{
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
          res.status(200).json({member: member})
        });
    }
    catch(error){
        res.status(404).send(`Member with id: ${id} not found`)
    }
}

// Update Function : update a member using his id 
const updateMember = async (req,res) => {
    let id = req.params.id;
    let newMemberData = req.body;
    delete newMemberData.id;
    delete newMemberData.updatedAt;
    try {
        let memDB = await Member.findByIdAndUpdate(id,newMemberData);
        memDB.id=memDB._id;
        return res.status(203).json({newMember: newMemberData});
       
    } catch (error) {
        res.status(404).send(`Member with id ${id} was not found `);
    }
}

// Delete Function : delete a member by id 
const deleteMember =  async (req,res) => {
    try{
        await Member.findByIdAndDelete(req.params.id)
    }catch(err) {
        res.status(404).send(`Member with id ${id} not found !`)
    }
    
}
module.exports = {getMembers, registerMember, getMember, updateMember, deleteMember, loginMember}