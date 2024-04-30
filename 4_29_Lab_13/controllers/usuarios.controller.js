const model = require('../models/usuarios.model')

module.exports.index = async(req,res) =>{
    const usuarios = model.ObtenerUsuarios()
    console.log(usuarios.length)
    // res.status(200).send({status:"success",message:"Get all users"})
    res.render("./obtener_usuarios", {
        usuarios: usuarios
    })
}