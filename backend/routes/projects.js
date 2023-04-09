const express = require('express')
const router = express.Router()
// requiring projects model
const project = require('../models/projects');
const {addProject,getProjects,getProject,updateProject,deleteProject} = require('../controllers/projectsController')
// PROJECTS CRUD
// Add a new project
router.post('/', addProject)
// View all projects
router.get('/', getProjects)
// Get a project by id
router.get('/:id', getProject)
// DELETE a project by id
router.delete('/:id' , deleteProject)
// PUT method : update a project by id 
router.patch('/:id', updateProject)
// exporting projetcs router as a module
module.exports = router;
