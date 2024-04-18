document.querySelector('#pass').addEventListener('click', () => {
    let popup = document.querySelector('.popup')
    popup.classList.remove('hidden')

})

document.querySelector('.button-10').addEventListener('click', () => {
    // user = document.getElementById('user').value
    password = document.getElementById('pass').value
    console.log(password)

    if (password == 'bigdog999') {
        window.location.href = "./shop.html"
    } else {
        document.write('Wrong password, try again ', 
    'Click refresh to try again')
    }
})
