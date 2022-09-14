const express = require('express')
const Project = require('../models/projects')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const util = require('util')

// Add a project  function 
const addProject = async (res, req) => {
    data = req.body;
    const project = new Project(data)
    project.save()
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
}
// Get all projects function 
const getProjects = async (req, res) => {
    Project.find()
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
}
// Update a project 
const updateProject = async (req,res) =>{
    id = req.params.id
    newProject = req.body
    await Project.findByIdAndUpdate({ _id:id }, newProject )
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
}
// Delete a project 
const deleteProject = async (req,res)=>{
    id = req.params.id
    await Project.findOneAndDelete({ _id:id })
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
}
// exporting as a module 
module.exports = {addProject,getProjects,updateProject,deleteProject}