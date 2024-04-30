const http    = require('http')
const express = require('express')
const path    = require('path')
const fs      = require('fs')
const app     = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({extended: false}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const rutasUsuarios = require('./routes/usuarios.routes')
app.use('/usuarios', rutasUsuarios)

app.get('/', (request, response, next) => {
    response.setHeader('Content-Type', 'text/plain')
    response.send("Hola Mundo")
    response.end() 
})

const server = http.createServer( (request, response) => {    
    console.log(request.url)
})
app.listen(3999)