const mongoose = require('mongoose');
// Creating a a member model
const member = mongoose.model('member', {
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
    dateEntree :{ type: Date, default : Date.now , /*required : true*/},
    telNum : Number,
    adress : String
})
module.exports = member;
// exporting member as a module 
