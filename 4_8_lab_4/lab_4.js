// first part
let age = prompt('Ingresa un numero', 10)
for (let i = 1; i < (parseInt(age) + 1); i++) {
    document.write(`<table><tr>${i}</tr></table>`)
}
alert('La tabla aparecera hasta el final del documento')

// second part
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const startTime = new Date().getTime()

const num1 = getRandomInt(0, 100)
const num2 = getRandomInt(0, 100)
let randomPrompt = prompt(`Cual es la suma de ${num1} y ${num2}?`)

const endTime = new Date().getTime()

const elapseMilli = endTime - startTime
const elapse = elapseMilli/1000

if (randomPrompt == num1+num2) {alert(`Correcto! Te tomo ${elapse} segundos`)} 
else {alert(`Incorrecto, te tomo ${elapse} segundos`)}

//third part
function contador() {
    const arreglo = document.getElementById("inputArreglo").value
    let arr = []
    for (let i=0; i<arreglo.length; i++) {
        arr.push(arreglo[i])
    }
    const arrParsed = arr.map((num) => parseInt(num))
    let numCeros = 0
    let numNegs = 0
    let numPos = 0
    for (let i=0; i<arrParsed.length; i++) {
        if (arrParsed[i] === 0) {
            numCeros++
        } else if (arrParsed[i] < 0) {
            numNegs++
        } else {
            numPos++
        }
    }
    respuestaPar = document.getElementById('resp-par')
    respuestaPar.innerHTML = `Num ceros: ${numCeros}, Num negativos: ${numNegs}, Num positivos: ${numPos}`
}

//fourth part
function average(arr) {
    const sum = arr.reduce((prev, curr) => prev + curr, 0)
    const promed = sum/arr.length
    return promed
}

function promedios() {
    let arr1 = Array.from(document.getElementById('4-1').value, Number);
    let arr2 = Array.from(document.getElementById('4-2').value, Number);
    let arr3 = Array.from(document.getElementById('4-3').value, Number);

    let arrPromeds = [average(arr1), average(arr2), average(arr3)];

    const respuestaPar = document.getElementById('resp-promed');
    respuestaPar.textContent = `Arreglo de promedios de cada arreglo: ${arrPromeds}`;
}

//fifth part
let number = prompt("Ingresa un numero de varios digitos", 12345)
if (number !== null) {
    let numberAsArray = Array.from(number, Number)
    let inverse = []
    for (let i=1; i<numberAsArray.length+1; i++) {
        inverse.push(numberAsArray[numberAsArray.length-i])
    }
    alert(`Tu numero inverso: ${inverse.join('')}`)
}

//sixth part
function xbox() {
    let numCajas = document.getElementById('num-cajas').value
    let stringPuntos = document.getElementById('puntos').value.split(' ')
    console.log(stringPuntos)

    let arrPuntos = []
    for (let i=0; i<numCajas; i++)  {
        arrPuntos.push(parseInt(stringPuntos[i]))
    }
    console.log(arrPuntos)

    let max = 0
    for (let i=0; i<numCajas; i++) {
        let currentSum = 0
        for (let j=i; j<numCajas; j++) {
            currentSum += arrPuntos[j]
            if (currentSum > max) {
                max = currentSum
            }
        }
    }
    console.log(max)

    const respuestaPar = document.querySelector("#resp-xbox")
    respuestaPar.innerHTML = `La maxima cantidad de puntos es: ${max}`
    alert(`La maxima cantidad de puntos es: ${max}`)
}