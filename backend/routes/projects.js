const express = require('express')
const router = express.Router()
// requiring projects model
const project = require('../models/projects');

// PROJECTS CRUD
// Add a new project
router.post('/add', (req,res) => {
    data = req.body;
    console.log(data)
    const Project = new project(data)
    Project.save()
    .then(
        (savedProject) => {
            res.status(200).send(savedProject)
            console.log('just added a new project!')
        }
    )
    .catch (
    (err) => {
        res.status(400).send(err)  
    })
    /* res.send(__dirname + './public/index.html');*/
})
// View all projects
router.get('/', (req, res) => {
    project.find()
    .then(
        (projects)=>{
            res.status(200).send(projects)
        }
    )
    .catch(
        (err) => {
            res.status(400).send(err)
        }
    )
})
// Get a project by id
router.get('/:id', async (req, res) =>{
    try{
        id = req.params.id;
        proj = await project.findOne({ _id : id })
        res.status(200).send(proj)
    }
    catch(error){
        res.status(400).send(error)
    }
})
// DELETE a project by id
router.delete('/:id' , (req,res)=>{
    id = req.params.id
    project.findOneAndDelete({ _id:id })
    .then (
        (deletedProject) =>{
            res.status(200).send(deletedProject)
            console.log('Project deleted !')
        }
    )
    .catch (
        (err) => {
            res.status(400).send(err)
        }
    )
})
// PUT method : update a project by id 
router.put('/:id', (req,res) =>{
    id = req.params.id
    newProject = req.body
    project.findByIdAndUpdate({ _id:id }, newProject )
     .then(
        (updatedProject) => {
            res.status(200).send(updatedProject)
        }
     )
     .catch(
        (err) => {
            res.status(400).send(err)
        }
     )
})
module.exports = router;
// exporting router as a module