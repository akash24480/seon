import projectModel from '../models/project.model.js'
import mongoose from 'mongoose'



export const createProject = async ({
    name, userId
}) => {
    if(!name){
        throw new Error('Name is required')
    }

    if(!userId){
        throw new Error('User is required')
    }

    const project = await projectModel.create({
        name,
        users:[userId]
    })

    return project
}


export const getAllProjectByUserId = async ({userId}) => {
    if(!userId){
        throw new Error('UserId required')
    }

    const allUserProjects = await projectModel.find({
        users : userId
    })

    return allUserProjects
}


export const addUsersToProject = async ({projectId, users, userId}) => {

    if(!projectId){
        throw new Error('Project Id is required')
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error('Project id is invalid')
    }


    if(!users){
        throw new Error('users are required')
    }

    if(!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))){
        throw new Error("Invalid userId(s), in user Array")
    }

    console.log(userId)

    if(!userId){
        throw new Error("User id is required")
    }

    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new Error('User id is invalid')
    }

    const project = await projectModel.findOne({
        _id: projectId,
        users : userId
    })

    console.log(project)

    if(!project){
        console.log(`No project found for Project ID: ${projectId} with User ID: ${userId}`);
        throw new Error('User not belong to this project')
    }

     const updatedProject = await projectModel.findOneAndUpdate(
        {
        _id:projectId
     },
     {
        $addToSet:{
            users:{
                $each:users
            }
        }
     },
     {
        new:true
     }
    )
    return updatedProject

}


export const getProjectById = async ({projectId}) => {
    if(!projectId){
        throw new Error('Project ID is required')
    }
    
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error('Invalid Project Id')
    }

    const project = await projectModel.findOne({
        _id:projectId
    }).populate('users')

    return project
}

