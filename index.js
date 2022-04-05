const app = require('./server.js')
const cluster = require('cluster');
const args = require('./utils/yargs')
const logger = require('./utils/logger')
const { appConfig } = require('./config/db')
const { cpus } = require ('os');
let { Server: HttpServer } = require("http");
let { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app());
const io = new IOServer(httpServer);
controllersChat = require('./http/controllers.chats')
// const { newChatModel : db } = require('../config/db')


let {mode, portCLI} = args

let port = portCLI ? portCLI : appConfig.port

if (mode ==='cluster' && cluster.isPrimary) {
  
  const numCPUs = cpus().length;
  logger.getLogger('consola').info(`Primary Process ${process.pid} is running on ${port} assigned by CLI`);
 
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  } 

  cluster.on('exit', (worker, code, signal) => {
    logger.getLogger('errorFile').error(`worker ${worker.process.pid} died at ${Date.now().toLocaleString()}`);
  });

} 

else {
  httpServer.listen(port, () => logger.getLogger('consola').info(`New worker server ${process.pid} started by ${mode || "not specified"} mode on port ${port} http://localhost:8080`))
}

io.on("connection", (socket) => {

  console.log("NEW CONNETION TO SOCKET ==>", socket.id);

  let chatUsers = {
    receiver: '',
    sender: ''
  }

  socket.on('client:chatconnection', async (data) => {
    chatUsers = {
      receiver: data.receiver,
      sender: data.sender
    }
    let chatMessages = await controllersChat.read(chatUsers.receiver, chatUsers.sender)
    let chatMessages_reverse = await controllersChat.read(chatUsers.sender, chatUsers.receiver)
    chatMessages = chatMessages.concat(chatMessages_reverse)
    chatMessages.sort((a, b) => {
      return (a.timestamp < b.timestamp) ? -1 : ((a.timestamp > b.timestamp) ? 1 : 0)
    });
    io.sockets.emit("server:loadmessages", chatMessages);
  })

  socket.on('client:newmessage', (data) => {
      console.log(data);
      let time = new Date().toISOString();
      const message = {
        timestamp: time,
        chatID: 11111111, // Traer de la DB
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
      }
      
      controllersChat.write(message)
      // console.log(message, '*** ESTE ES EL MENSAJE ***')
      io.sockets.emit("server:newmessage", message);
  })

  socket.on('client:chatfrontconnection', async (data) => {
    chatUsers = {
      receiver: "manuel",
      sender: data
    }
    let chatMessages = await controllersChat.read(chatUsers.receiver, chatUsers.sender)
    let chatMessages_reverse = await controllersChat.read(chatUsers.sender, chatUsers.receiver)

    chatMessages = chatMessages.concat(chatMessages_reverse)
    chatMessages.sort((a, b) => {
      return (a.timestamp < b.timestamp) ? -1 : ((a.timestamp > b.timestamp) ? 1 : 0)
    });
    io.sockets.emit("server:loadmessages", chatMessages);
  })

  socket.on('client:frontchatnewmessage', (data) => {
    let time = new Date().toISOString();
    const message = {
      timestamp: time,
      chatID: 11111111, // Traer de la DB
      sender: data.sender,
      receiver: 'manuel',
      message: data.message
    }
    controllersChat.write(message)
    console.log(message, '*** ESTE ES EL MENSAJE ***')
    io.sockets.emit("server:chatfrontnewmessage", message);
  })

});
