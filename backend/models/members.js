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

// exporting member as a module
module.exports = mongoose.model("Member", memberSchema);
