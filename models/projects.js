const mongoose = require('mongoose')

const project = mongoose.model("Project" , {
    title : String,
    startDate: Date,
    endDate: Date, 
})

module.exports = project