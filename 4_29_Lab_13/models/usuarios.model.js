exports.ObtenerUsuarios = function(correo, contrasena) {
    console.log("Obtener Usuarios")
    let usuarios = []

    usuarios.push({
        nombre: "Samuel",
        id: 1,
        activo: true
    })
    usuarios.push({
        nombre: "Lisa",
        id: 1,
        activo: true
    })
    usuarios.push({
        nombre: "Bob",
        id: 1,
        activo: true
    })
    usuarios.push({
        nombre: "Alicia",
        id: 1,
        activo: true
    })
    return usuarios
}