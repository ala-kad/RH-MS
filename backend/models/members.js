const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const util = require("util")

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
  telNum: String,
  adress: String,
},{timestamps: true });

  //     return this.create({ matricule: matricule,name: name, surname: surname, email: email, password: hash , dateEntree: dateEntree, telNum: telNum, adress :adress});
  //     return this.create({ matricule: matricule,name: name, surname: surname, email: email, password: hash , dateEntree: dateEntree, telNum: telNum, adress :adress});
  //   })
  // });
  const salt = bcrypt.genSalt(10)
  const hash = bcrypt.hash(password, salt)
  console.log(password)
  console.log(salt)
  console.log(hash)


  // .then(hash => {
  //   })
  // });
  const salt = bcrypt.genSalt(10)
  const hash = bcrypt.hash(password, salt)
  console.log(password)
  console.log(salt)
  console.log(hash)


  // .then(hash => {
};
// exporting member as a module
module.exports = mongoose.model("Member", memberSchema);
