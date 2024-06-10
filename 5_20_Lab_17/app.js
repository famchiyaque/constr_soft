const mysql = require('mysql2')
const express = require('express')
const http = require('http')
const path = require('path')
const db = require('./utils/db')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'utils')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'utils', 'respuesta1.html'));
})

app.get('/test_db', async (request, response, next) => {
    // let conn = await db()

    try{
        const connection = await db()
        const rows = await connection.execute("SELECT * FROM products")
        connection.release()
        const result = rows[0]
        const jsonS = JSON.stringify(result)
        response.writeHead(200, {'Content-type':'text/html'})
        response.end(jsonS)
    }catch(e){
        throw e
    }
})


app.listen(4999, () => {
    console.log("Listening on port 4999")
})