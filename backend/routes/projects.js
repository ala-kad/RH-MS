const express = require('express')
const router = express.Router()
// requiring projects model
const project = require('../models/projects');
const {addProject,getProjects,updateProject,deleteProject} = require('../controllers/projectsController')
// PROJECTS CRUD
// Add a new project
router.post('/add', addProject)
// View all projects
router.get('/getAll', getProjects)
// Get a project by id
// router.get('/getbyid/:id', async (req, res) =>{
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
router.delete('/delete/:id' , deleteProject)
// PUT method : update a project by id 
router.put('/update/:id', updateProject)
// exporting projetcs router as a module
module.exports = router;
