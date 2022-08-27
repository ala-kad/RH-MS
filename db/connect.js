const mongoose = require('mongoose');
// mongoose connect method
const connectDB = (url) =>{
    return mongoose.connect(url , {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
}
mongoose.connection.on("error",err =>{
    console.log("err",err)
})
mongoose.connection.on("connected" , (err,res) => {
    console.log ("Connected to DataBase ! ")
})
module.exports = connectDB
// exporting mongodb connection as a module