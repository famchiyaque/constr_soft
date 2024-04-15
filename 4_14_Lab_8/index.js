import http from 'http'

export const server = http.createServer((req, res) => {
    console.log(request.url)
    response.setHeader('Content-Type', 'text/html')
    response.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Intro Backend</title>
    </head>
    <body>
        <h1>Hola mundo desde node</h1>
    </body>
    </html>    
    `)
    response.end()
})