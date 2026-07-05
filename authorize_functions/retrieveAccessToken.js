const CLIENT_ID = 208780
const CLIENT_SECRET = 'c694420fe9b758104c4c07bd20a13c019bc98395'

async function retrieveAccessToken(refresh_token) {
    const url = `https://www.strava.com/oauth/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${refresh_token}`
    const response = await fetch(url, {
        method: "POST"
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err))


    if (!("access_token" in response)) {
        return null
    } else {
        return response.access_token
    }

}

module.exports = {retrieveAccessToken}