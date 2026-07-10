const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000
app.use(express.static("public"));
app.use(express.json());

const dotenv = require('dotenv')
dotenv.config()

const CLIENT_ID = Number(process.env.CLIENT_ID)
const CLIENT_SECRET = process.env.CLIENT_SECRET


app.listen(port, (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log(`Server listening on port ${port}\n`)
    }
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/error", (req, res) => {
    res.sendFile(__dirname + "/public/error.html")
})

app.get("/activites", (req, res) => {
    res.sendFile(__dirname + "/public/activites.html")
})

app.get("/last_run", async (req, res) => {
    const { returnLastRun } = require("./returnLastRun")
    const { returnAccessToken } = require("./authorize_functions/returnAccessToken")
    const access_token = await returnAccessToken()
    const last_run_object = await returnLastRun(access_token)
    res.json(last_run_object)
})
app.get("/exchange_token", async (req, res) => {
    // gets code from url
    const { returnCode } = require('./authorize_functions/returnCode')
    let url = req.protocol + '://' + req.get('host') + req.originalUrl;
    
    const code = returnCode(url)
    if (code === null) {
        console.error("Error - Could not find code")
        res.redirect("/error")
    }

    // exchanges code for refresh token
    url = `https://www.strava.com/oauth/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&grant_type=authorization_code`
    const response = await fetch(url, {
        method: "POST"
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.error(err))

    let refresh_token = ''
    if (!('refresh_token' in response)) {
        console.error("Error - Could not read refresh token")
        res.redirect("/error")
    } else {
        refresh_token = response.refresh_token
    }

    // exchanges refresh token for access token
    const {retrieveAccessToken} = require("./authorize_functions/retrieveAccessToken")
    const object = await retrieveAccessToken(refresh_token, CLIENT_ID, CLIENT_SECRET)

    if (object.access_token !== null) {
        const { saveAccessToken } = require("./authorize_functions/saveAccessToken")
        saveAccessToken(object.access_token, object.expires_at)
        res.redirect("/activites")
    } else {
        console.error("Error - Access token could not be retrieved")
        res.redirect("/error")
    }

})