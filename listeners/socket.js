let { Server: HttpServer } = require("http");
let { Server: IOServer } = require("socket.io");
const app = require('../server.js')

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

let notes = [];
let msgs = [];

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  io.sockets.emit("server:loadnotes", notes);
  io.sockets.emit("server:loadmessages", msgs);

  socket.on("client:newnote", (data) => {
    console.log(data);
    const note = {
      title: data.title,
      description: data.price,
      thumbnail: data.thumbnail,
    };
    notes.push(note);
    console.log(notes);
    io.sockets.emit("server:newnote", note);
  });

  socket.on('client:newmessage', (data) => {
      console.log(data);
      const msg = {
          mail: data.mail,
          message: data.message,
          time: data.time
      }
      msgs.push(msg);
      io.sockets.emit("server:newmessage", msg);
  })

});