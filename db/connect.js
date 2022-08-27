const mongoose = require('mongoose');
// Connection to data base 
// const uri = 'mongodb+srv://alakad:admin@mycluster.8ygtgeo.mongodb.net/?retryWrites=true&w=majority' ;
// async function dbConnect() {
//     mongoose.createConnection(process.env.mongo_uri)
//     // Handling initial DB Connection Errors
//         try{
//             await mongoose.connect(process.env);
//             console.log('Connected to DB')
//         }
//         catch (error) {
//             handleError(error);
//         }
//     // Listening to error events after initial DB connection 
//     mongoose.connection.on('error', err => {
//         logError(err);
//         console.log('Connected to DB no errors ')

//     })
// }
// // Call dbConnect() function 
// dbConnect();
// url ='mongodb+srv://alakad:admin@mycluster.8ygtgeo.mongodb.net/?retryWrites=true&w=majorit'
// const coneectDB = ('mongodb+srv://alakad:admin@mycluster.8ygtgeo.mongodb.net/?retryWrites=true&w=majorit') => {
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