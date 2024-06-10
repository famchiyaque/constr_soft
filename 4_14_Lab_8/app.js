import express from 'express'
import { server } from './index.js'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render("home.ejs")
    // res.json("Opciones: Agregar un string de numeros al url para regresar su promedio" )
})

// app.get('/:arreglo', (req, res) => {
//     const arreglo = req.params.arreglo
//     console.log(arreglo)

// })

app.get("/tec", (req, res) => {
    res.render("tec.ejs")
})


app.post('/promedio', (req, res) => {
    const { arreglo } = req.body

    let arr = []
    for (let i = 0; i < arreglo.length; i++) {
        arr.push(arreglo[i])
    }

    const arrMapped = arr.map(num => parseInt(num))

    const sum = arrMapped.reduce((prev, curr) => prev + curr, 0)

    const promedio = sum/arreglo.length
    console.log("Promedio: ", promedio)
    const respuesta = promedio

    res.render("respuesta.ejs", {
        respuesta
    })
})

app.post('/string', (req, res) => {
    const { string } = req.body
    console.log(string)
    const respuesta = string
    res.render("respuesta.ejs", {
        respuesta
    })
})

app.post('/coulomb', (req, res) => {
    const { firstCarga, firstX, firstY, secondCarga, secondX, secondY } = req.body
    const carga1 = firstCarga * Math.pow(10, -6)
    const carga2 = secondCarga * Math.pow(10, -6)
    const e0 = 8.85418 * Math.pow(10, -12)
    const k = (1/(4*Math.PI*e0))
    
    const vec_x = secondX - firstX
    const vec_y = secondY - firstY
    const r = Math.sqrt(Math.pow(vec_x, 2) + Math.pow(vec_y, 2))
    const mag = (carga1 * carga2) / Math.pow(r, 3)
    const final_vec_x = mag*vec_x
    const final_vec_y = mag*vec_y
    const Fx = k*final_vec_x
    const Fy = k*final_vec_y
    // const respuesta = join(Fx, Fy)
    const respuesta = `Fx: ${Fx}, Fy: ${Fy}`
    res.render("respuesta.ejs", {
        respuesta
    })
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke')
})

app.listen(8080, () => {
    console.log("Server started on port 8080")
})