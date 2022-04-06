let socketIO = (io) => { 
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
}

module.exports = { socketIO }