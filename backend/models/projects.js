const mongoose = require('mongoose')
// Creating a project model
const project = mongoose.model("Project" , {
    title : String,
    startDate: Date,
    endDate: Date, 
})
module.exports = project
// exporting project model as a module