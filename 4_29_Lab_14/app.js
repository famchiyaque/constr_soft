const http    = require('http')
const express = require('express')
const path    = require('path')
const fs      = require('fs')
const cookieParser = require('cookie-parser')
// import { answer2 } from './answers.js'
const { question1, endpoint1, answer1, question2, endpoint2, answer2 } = require("./answers")

const app = express()

const session = require('express-session')
app.use(session({
  secret: 'ferdabeatgetjiggywitit', 
  resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
  saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}))

app.set('view engine', 'ejs')
app.set('views', 'views')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

const pageTitle = "<h1>Laboratorio 14</h1>" + "<br>"
const message1 = question1 + "<br>" + endpoint1 + "<br>"
const message2 = question2 + "<br>" + endpoint2

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Set-Cookie', `mi_cookie=${answer1}; HttpOnly`)
    const message = pageTitle + "Sigue instrucciones para ver respuesta 1 y respuesta 2: <br>" + message1 + message2
    res.send(message)
    res.end() 
})

app.get('/answer1', (req, res) => {
    res.setHeader("Content-Type", "text/plain")
    res.send(req.cookies.mi_cookie)
    res.end()    
})

app.get('/answer2', (request, response, next) => {
    request.session.mi_variable = answer2
    response.setHeader('Content-Type', 'text/plain')
    response.send(request.session.mi_variable)
    response.end() 
})

app.get('/test_session_variable', (request, response, next) => {
    response.setHeader('Content-Type', 'text/plain')
    response.send(request.session.mi_variable)
    response.end() 
})

app.get('/logout', (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/') //Este código se ejecuta cuando la sesión se elimina.
    })
})

const server = http.createServer( (req, res) => {    
    console.log(req.url)
})
app.listen(3999)