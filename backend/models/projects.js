const mongoose = require('mongoose')
// Creating a project model
const Project = mongoose.model("Project" , {
    title : String,
    startDate: Date,
    endDate: Date, 
}, {timestamps: true })
// exporting project model as a module
module.exports = Project
