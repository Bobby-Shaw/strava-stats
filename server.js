const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000
app.use(express.static("public"));
app.use(express.json());

const CLIENT_ID = 208780
const CLIENT_SECRET = 'c694420fe9b758104c4c07bd20a13c019bc98395'

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

app.get("/exchange_token", async(req, res) => {
    // gets code from url
    const { returnCode } = require('./authorize_functions/returnCode')
    let url = req.protocol + '://' + req.get('host') + req.originalUrl;
    
    const code = returnCode(url)
    if (code === null) {
        console.log("Error - Could not find code")
    } else {
        console.log("Code: " + code)
    }

    // exchanges code for refresh token
    url = `https://www.strava.com/oauth/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&grant_type=authorization_code`
    const response = await fetch(url, {
        method: "POST"
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err))

    let refresh_token = ''
    if (!('refresh_token' in response)) {
        console.log("Error - Could not read refresh token")
    } else {
        refresh_token = response.refresh_token
        console.log("Refresh Token: " + refresh_token)
    }

    // exchanges refresh token for access token
    const {retrieveAccessToken} = require("./authorize_functions/retrieveAccessToken")
    const access_token = await retrieveAccessToken(refresh_token)

    if (access_token !== null) {
        console.log("Access Token: " + access_token)
    } else {
        console.log("Error - Access token could not be retrieved")
    }

})