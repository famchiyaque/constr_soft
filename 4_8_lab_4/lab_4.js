function firstFunction() {
    console.log("got here")
    const number = document.getElementById("input-number").value

    document.write(`<table><tr><td>${number}</td><td>${number*number}</td></tr></table>`)
}