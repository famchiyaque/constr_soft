let cartArray = []
let itemsArray = []

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => {
        const name = item.querySelector('.name').textContent
        const price = item.querySelector('.price').textContent
        const priceParsed = parseFloat(price.replace('$', ''))
        const cart = document.querySelector('.cart')

        itemsArray.push(`${name}, ------>  $${priceParsed}`)
        cart.classList.remove('hidden')
        cartArray.push(priceParsed)
        let total = cartArray.reduce((prev, curr) => prev + curr, 0)
        cart.innerHTML = `Tu Carrito: ${itemsArray.map((item) => `<br>${item}`)}
                          <br>Total ------->                                ${total}
                          <button class='pay'>Pagar (no hace nada)</button>`
    })
})

function changeColor(value) {
    let body = document.querySelector('body')
    if (value === '0') {
        body.style.backgroundColor = "#fff"
    } else if (value === '1') {
        body.style.backgroundColor = "purple"
    } else if (value === '2') {
        body.style.backgroundColor = "green"
    } else if (value === '3') {
        body.style.backgroundColor = "red"
    } else if (value === '4') {
        body.style.backgroundColor = "blue"
    } else if (value === '5') {
        body.style.backgroundColor = "yellow"
    }
}