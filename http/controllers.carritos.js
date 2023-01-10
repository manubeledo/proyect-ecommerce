const { carritosModel : db } = require('../config/db')
const { newPurchase } = require('../services/sendEmail')
const logger = require('../utils/logger')

const write = async (req, res) => {
    newPurchase(req.body)
    let carrito  = req.body
    console.log('Este es el carrito', carrito)
    let object = {
        id : carrito[0].id_carrito,
        productos_carrito: carrito
        }
    try {
        await db.create(object)
        res.send("Carrito creado con exito!")     
    } 
    catch (err) {
        logger.getLogger('outerror').error('error al guardar el item ', err) 
    }
}

const read = async (req, res) => {
    try {
        let carritos = await db.find()
        res.json(carritos) 
    } 
    catch (err) {
        logger.getLogger('outerror').error('error al leer los carritos', err)
    }
}

const deleted = async (req, res) => {
    console.log(req.params.id)
    try {
        let object = {
            id : req.params.id
        }
        await db.deleteOne(object)
        res.send(`carrito con el id ${object} eliminado`)
    } 
    catch (error) {
        logger.getLogger('outerror').error('error eliminando producto' + error)
    }
}

module.exports = {
    write,
    read,
    deleted
}