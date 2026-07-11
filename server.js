const fs = require('fs')
const dotenv = require('dotenv')
const express = require('express')
dotenv.config()

const app = express()
const session = require('express-session')
const port = 3000

if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET must be set in .env")
}

app.use(express.static("public"));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    }
}))

function requireAuth(req, res, next) {
    if (!req.session || !req.session.authorized) {
        return res.redirect("/error");
    }
    next();
}

const CLIENT_ID = Number(process.env.CLIENT_ID)
const CLIENT_SECRET = String(process.env.CLIENT_SECRET)

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

app.get("/activities", requireAuth, (req, res) => {
    res.sendFile(__dirname + "/public/activities.html")
})

app.post("/runs", requireAuth, async (req, res) => {
    console.log(req.body)
    const numberOfRuns = req.body.numberOfRuns
    const { returnRuns } = require("./returnRuns")
    const { returnAccessToken } = require("./authorize_functions/returnAccessToken")
    const access_token = await returnAccessToken()
    const runs = await returnRuns(access_token, numberOfRuns)
    res.json(runs)
})
app.get("/exchange_token", async (req, res) => {
    // gets code from url
    const { returnCode } = require('./authorize_functions/returnCode')
    let url = req.protocol + '://' + req.get('host') + req.originalUrl;
    
    const code = returnCode(url)
    if (code === null) {
        console.error("Error - Could not find code")
        return res.redirect("/error")
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
    if (!response || !('refresh_token' in response)) {
        console.error("Error - Could not read refresh token")
        return res.redirect("/error")
    } else {
        refresh_token = response.refresh_token
    }

    // exchanges refresh token for access token
    const {retrieveAccessToken} = require("./authorize_functions/retrieveAccessToken")
    const object = await retrieveAccessToken(refresh_token, CLIENT_ID, CLIENT_SECRET)

    if (object.access_token !== null) {
        const { saveAccessToken } = require("./authorize_functions/saveAccessToken")
        await saveAccessToken(object.access_token, object.expires_at)
        req.session.authorized = true
        res.redirect("/activities")
    } else {
        console.error("Error - Access token could not be retrieved")
        return res.redirect("/error")
    }

})
