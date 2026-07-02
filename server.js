const express = require('express')
const app = express()
const port = 3000

app.listen(port, (err) => {
    if (err) {
        console.log("Error: "+ err)
    } else {
        console.log(`Server listening on port ${port}`)
    }
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})