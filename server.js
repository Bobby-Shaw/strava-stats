const express = require('express')
const app = express()
const port = 3000
app.use(express.static("public"));
app.use(express.json());

app.listen(port, (err) => {
    if (err) {
        console.log("Error: "+ err)
    } else {
        console.log(`Server listening on port ${port}`)
    }
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/exchange_token", (req, res) => {
    // gets code from url
    const { returnCode } = require('./returnCode')
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    
    const code = returnCode(url)
    if (code === null) {
        console.log("Error - Could not find code")
    } else {
        console.log(code)
    }

    // exchanges code for refresh token
    

})