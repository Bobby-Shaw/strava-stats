async function retrieveAccessToken(refresh_token, client_id, client_secret) {
    const url = `https://www.strava.com/oauth/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=refresh_token&refresh_token=${refresh_token}`
    const response = await fetch(url, {
        method: "POST"
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.error(err))

    if (!("access_token" in response)) {
        return null
    } else {
        return {
            "access_token": response.access_token,
            "expires_at": response.expires_at
        }
    }

}

module.exports = {retrieveAccessToken}