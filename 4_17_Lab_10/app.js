import express from 'express'
import { server } from './index.js'

const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    server
})

app.post('/:arreglo', (req, res) => {
    const inputString = req.params.arreglo;
    const numbersArray = inputString.split(',').map(numStr => parseInt(numStr.trim(), 10));

    const sum = numbersArray.reduce((prev, curr) => prev + curr, 0);

    console.log(sum)
    res.json({ sum });
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke')
})

app.listen(6000, () => {
    console.log("Server started on port 5000")
})