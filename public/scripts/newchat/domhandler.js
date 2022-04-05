console.log('desde domhandler.js')

const chatMessage = document.getElementById('chat-message')
const btnSend = document.getElementById('btn-send')
const user = document.getElementsByClassName('chat-about')
const chat = document.getElementById('ul-chat')
const chatHistory = document.getElementsByClassName('chat-history')
const chatWindow = document.getElementById('chat-history')
const sender = document.getElementById('username').innerHTML
const divUsers = document.getElementById('people-list')

console.log('username login:', sender)

// Take click from textarea and save message

let receiver = user[0].childNodes[1].innerHTML

btnSend.addEventListener('click', (e) => {
    let message = chatMessage.value
    let receiver = user[0].childNodes[1].innerHTML
    let time = new Date().toUTCString();
    time = time.split(' ').slice(0, 5).join(' ');
    saveMessage(message, receiver, sender)
    chatMessage.value = ''
})

// Take enter from textarea and save message

chatMessage.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
    let message = chatMessage.value
    let receiver = user[0].childNodes[1].innerHTML
    let time = new Date().toUTCString();
    time = time.split(' ').slice(0, 5).join(' ');
    saveMessage(message, receiver, sender)
    chatMessage.value = ''
    } else {
        return
    }
})

const addMessage = message => {
    chat.innerHTML += ` <li class="clearfix">
                            <div class="message-data text-right">
                                <span class="message-data-time">${message.sender}, ${message.timestamp}</span>
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
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
  
const loadMessage = (chatMessages) => {
    chatMessages.forEach((msg) => {
        if(msg.sender == sender) {
            addMessage(msg)
        } else {
            addMessagesFromUser(msg)
        }
    })
}