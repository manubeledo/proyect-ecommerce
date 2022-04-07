console.log('desde sockets.js')

const socket = io();

const getUsers = (receiver, sender) => {
  console.log('desde getUsers', receiver, sender)
  socket.emit('client:chatconnection', {
  receiver,
  sender
  })
};

const saveMessage = (message, receiver, sender) => {
    console.log('*** DESDE SAVEMESSAGE ***', message, receiver, sender)
    socket.emit('client:newmessage', {
      message,
      receiver,
      sender
    })
};

getUsers(receiver, sender)

socket.on('server:newmessage', addMessage);
socket.on('server:loadmessages', loadMessage);
socket.on("server:chatfrontnewmessage", addMessage);
