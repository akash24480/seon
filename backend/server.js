import 'dotenv/config'
import http from 'http'
import app from './app.js'
import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import { query } from 'express'
import mongoose from 'mongoose'
import ProjectModel from './models/project.model.js'

const port = process.env.PORT || 4000


const server = http.createServer(app)
const io =new Server(server, {
    cors : {
        origin : '*'
    }
});


io.use (async(socket, next) => {

    try {

        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1]

        const projectId = socket.handshake.query.projectId

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return next(new Error("Invalid project ID"));
        }

        socket.projectId = await ProjectModel.findById(projectId);



        if(!token){
            return next(new Error("Authentication error"))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return next(new Error("Authentication error"))
        }

        socket.user = decoded;

        next();
        
    } catch (error) {
        next(error)
    }
})

io.on('connection', socket => {

    socket.roomId = socket.projectId._id.toString()

    console.log('a user is connected')

    socket.join(socket.roomId)

    socket.on('project-message', data => {
        console.log(data)
        socket.broadcast.to(socket.roomId).emit('project-message', data)
    })
  socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => {
    console.log('User disconnected');
    socket.leave(socket.roomId)
  });
});



server.listen(port, ()=> {
    console.log(`Server is running on the port ${port}`)
})