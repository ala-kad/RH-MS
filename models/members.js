const mongoose = require('mongoose');
// import mongoose, { Schema } from 'mongoose';
// const membersSchema = new Schema ({
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
//     dateEntree :{ type: Date, default : Date.now , /*required : true*/},
//     telNum : Number,
//     adress : String
// })
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

// const Member = mongoose.model('Member', membersSchema, 'members' );
// const firstMember  = new Member({matricule: 'm1',name: 'ala', surname: 'kaddechi', email: 'kaddechiala@gmail.com'});
// firstMember.save(function(err) {
//     if (err) return handleError(err);
//     else
//     console.log ('Saved ! ');
// })
