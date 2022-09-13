const express = require('express')
const router = express.Router()
// requiring projects model
const project = require('../models/projects');
const {addProject,getProjects,updateProject,deleteProject} = require('../controllers/projectsController')
// PROJECTS CRUD
// Add a new project
router.post('/add', addProject)
// View all projects
router.get('/', (req, res) => {
// Get a project by id
router.get('/:id', async (req, res) =>{
//     try{
//         id = req.params.id;
//         proj = await project.findOne({ _id : id })
//         res.status(200).send(proj)
//     }
//     catch(error){
//         res.status(400).send(error)
//     }
// })
// DELETE a project by id
router.delete('/:id' , (req,res)=>{
// PUT method : update a project by id 
router.put('/:id', (req,res) =>{
// exporting projetcs router as a module
module.exports = router;
