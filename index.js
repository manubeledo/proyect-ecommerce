const app = require('./server.js')
const cluster = require('cluster');
const args = require('./utils/yargs')
const logger = require('./utils/logger')
const { cpus } = require ('os');
let { Server: HttpServer } = require("http");
let { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app());
const io = new IOServer(httpServer);
let { socketIO : socketConnect } = require('./listeners/socket')
controllersChat = require('./http/controllers.chats')
// const { newChatModel : db } = require('../config/db')
const PORT = process.env.PORT || 3000;

let {mode, portCLI} = args

// FOR CLUSTER USE
let port = portCLI ? portCLI : PORT

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
  httpServer.listen(PORT, () => 
  logger.getLogger('consola').info(`New worker server ${process.pid} started by ${mode || "not specified"} mode on port ${port} http://localhost:${port}`)
  )
}

socketConnect(io)