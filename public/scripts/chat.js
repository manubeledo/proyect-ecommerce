const sender = document.getElementById('username').innerHTML
const chatMessage = document.getElementById('chat-message')
const btnSend = document.getElementById('btn-send')
const chat = document.getElementById('ul-chat')
const chatWindow = document.getElementById('chat-history')


console.log('CHATJS FOR INDEX VIEW')

const socket = io();

function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("open-button").style.display = "none";
  }

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("open-button").style.display = "block";
}

btnSend.addEventListener('click', (e) => {
  e.preventDefault()
  console.log('DESDE EL BOTON SEND')
  let message = chatMessage.value
  saveMessage(message, sender)
  chatMessage.value = ''
})

// Take enter from textarea and save message

chatMessage.addEventListener('keyup', (e) => {
  e.preventDefault()
  console.log(chatMessage.value)
  if (e.key === 'Enter') {
  let message = chatMessage.value
  saveMessage(message, sender)
  chatMessage.value = ''
  } else {
      return
  }
})

const saveMessage = (message, sender) => {
  console.log('*** DESDE SAVEMESSAGE ***', message, sender)
  socket.emit('client:frontchatnewmessage', {
    message,
    sender
  })
};


const loadMessage = (chatMessages) => {
  chatMessages.forEach((msg) => {
      if(msg.sender == sender) {
          addMessage(msg)
      } else {
          addMessagesFromUser(msg)
      }
  })
}

const addMessage = message => {
  chat.innerHTML += ` <li class="clearfix">
                          <div class="message-data text-right">
                              <span class="message-data-time">${message.sender}, ${message.timestamp}</span>
                          </div>
                          <div class="message other-message float-right"> ${message.message} </div>
                      </li>
                    `
  chatWindow.scrollTo(0, 100000);

}

const addMessagesFromUser = message => {
  chat.innerHTML += ` 
                      <li class="clearfix">
                          <div class="message-data">
                              <span class="message-data-time">${message.sender}, ${message.timestamp}</span>
                          </div>
                          <div class="message my-message">${message.message}</div>
                      </li>
                  `
  chatWindow.scrollTo(0, 100000);
}

const getUsers = (sender) => {
  console.log('desde getUsers', sender)
  socket.emit('client:chatfrontconnection', sender)
};

getUsers(sender)

socket.on("server:newmessage", addMessagesFromUser);
socket.on('server:chatfrontnewmessage', addMessage);
socket.on('server:loadmessages', loadMessage);
