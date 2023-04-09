const mongoose = require('mongoose')
// Creating a project model

const Schema = mongoose.Schema;
const projectSchema = new Schema({
    title : String,
    startDate: Date,
    endDate: Date, 
}, {timestamps: true })
// exporting project model as a module
module.exports = mongoose.model("Project", projectSchema);
