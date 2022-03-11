import express from 'express'
import cors, {CorsOptions} from 'cors'
import {Server} from 'socket.io'
import http from 'http'

import routes from './routes'
import "./config/database/connection"

const app = express()

app.use(express.json({limit: 16000000 }))

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200    
} as CorsOptions))


app.use(routes)


const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})

class UserSocket {
    userId: number
    socketId: string
    groupId: number

    constructor(userId, socketId) {
        this.userId = userId
        this.socketId = socketId
    }
}

let userList: UserSocket[] = []


io.on("connection", (socket) => {
    console.log("We have a new connection")  

    socket.on("new user", (userId) => {
        userList.push(new UserSocket(userId, socket.id))
    })

    socket.on("join group", (userId: number, groupId: number) => {
        for (let i = 0;i < userList.length; i++) {
            if (socket.id === userList[i].socketId)
                userList[i].groupId = groupId
        }        
    })

    // socket.on('create group', (uid, title) => {
    //     io.emit('fetch group');
    //   });
    
    socket.on("message", (userId: number, groupId: number) => {
        for (let user of userList) {
            if(groupId === user.groupId) {                
                io.to(user.socketId).emit("fetch messages", groupId)
            }
        }
    })

    socket.on("disconnect", () =>{
        for (let i = 0; i < userList.length;i++) {
            if (socket.id === userList[i].socketId)
                userList.splice(i, 1)
        }
    })

    // socket.on("chatMessage", (msg: string, group: Group) => {           
    //     io.to(String(group.id))
    //       .emit('message', msg)
    // })

    // socket.on('disconnect', () => {
    //     //const group = await GroupRepository.findOne({id})
    //    io.emit('message', 'A user had left the chat')
    // })
})

server.listen(3333, () => 
    console.log("Backend server started at http://localhost:3333")
)