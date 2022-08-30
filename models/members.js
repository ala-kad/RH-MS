const mongoose = require('mongoose');
// Creating a a member model
const Member = mongoose.model('Member', {
    matricule : String,
    name : {
        type : String,
        // requierd : [true, 'must provide a name'], 
    },
    surname : {
        type : String ,
        // required : [true , 'must provide a surname'],
    },
    email : {
        type : String ,
        required :true,
    },
    password : String,
    dateEntree :{ type: Date, default : Date.now , /*required : true*/},
    telNum : Number,
    adress : String
})
module.exports = Member;
// exporting member as a module 
