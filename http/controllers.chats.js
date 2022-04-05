const { newChatModel : db } = require('../config/db')

const read = async (receiver, sender) => {
    try {
        let filter = { receiver : receiver, sender: sender} 
        let messages = await db.find(filter)
        return messages
    } 
    catch (err) {
        console.log(err)
    }
}

const write = async (message) => {
    try {
        let filter = { receiver : message.receiver, sender: message.sender}  // creates filter to user
        let userchat = await db.find({filter}) // find user chat by filter and saves it
        let object = { 
            timestamp: message.timestamp, 
            chatID: message.chatID, 
            sender: message.sender, 
            receiver: message.receiver, 
            message: message.message 
        } 
        await db.create(object)
    } 
    catch (err) {
        console.log(err)
    }
}

const writeFromClient = async (req, res) => {
    console.log('DESDE WRITEFROMCLIENT', req.body, req.user[0].username)
    let time = new Date().toISOString();
    let object = { 
        timestamp: time, 
        chatID: 2222222, 
        sender: req.user[0].username, 
        receiver: 'manuel', 
        message: req.body.msg
    } 
    await db.create(object)
    res.send('Mensaje enviado con exito')
}

const deleted = async (req, res) => {
    try {
        let { id } = req.params
        await db.deleteOne(id)
        res.send(`carrito con el id ${id} eliminado`)
    } 
    catch (error) {
        logger.getLogger('outerror').error('error eliminando producto' + error)
    }
}

module.exports = {
    read,
    write,
    deleted,
    writeFromClient
}