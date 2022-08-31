const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
// Creating a member schema
const memberSchema = new Schema({
  matricule: {
    type: String,
  },
  name: {
    type: String,
    // requierd : [true, 'must provide a name'],
  },
  surname: {
    type: String,
    // required : [true , 'must provide a surname'],
  },
  email: {
    type: String,
  },
  password: { type: String },
  dateEntree: { type: Date, default: Date.now /*required : true*/ },
  telNum: Number,
  adress: String,
});
// static signup method
memberSchema.statics.signup = async function (matricule,name,surname,email, password,dateEntree,telNum,adress) {
//   const data = req.body
  const exist = await this.findOne({ email })
  if(exist){
      throw Error ('Email already in use !')
  }
  const salt = bcrypt.genSaltSync(10);
  const member = bcrypt.hash(password, salt).then(hash => {
    return this.create({ matricule: matricule,name: name, surname: surname, email: email, password: hash , dateEntree: dateEntree, telNum: telNum, adress :adress});
  })
  return member;
};
// Creating a a member model
// const Member = mongoose.model('Member', {
//     matricule : String,
//     name : {
//         type : String,
//         // requierd : [true, 'must provide a name'],
//     },
//     surname : {
//         type : String ,
//         // required : [true , 'must provide a surname'],
//     },
//     email : {
//         type : String ,
//         required :true,
//     },
//     password : String,
//     dateEntree :{ type: Date, default : Date.now , /*required : true*/},
//     telNum : Number,
//     adress : String
// })
module.exports = mongoose.model("Member", memberSchema);
// exporting member as a module
