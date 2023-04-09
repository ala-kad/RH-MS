const express = require('express')
const Project = require('../models/projects')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const util = require('util')

/// clean data
const cleanData = (data) => {
let project = {...data._doc};
project.id = project._id;
delete project._id;
delete project.__v;
return project;
}
// Add a project  function 
const addProject = async (res, req) => {
    data = req.body;
    console.log(data)
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

// Function : get a project by id 
const getProject = async (req, res) =>{
    try{
        let id = req.params.id;
        await Project.findOne({ _id : id }).then((data)=>{
          let project = cleanData(data);
          res.status(200).send(project)
        });
    }
    catch(error){
        res.status(400).send(error)
    }
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
module.exports = {addProject,getProjects,getProject,updateProject,deleteProject}