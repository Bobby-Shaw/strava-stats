async function returnLastRun(access_token) {
    const url = `https://www.strava.com/api/v3/athlete/activities?per_page=1`
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${access_token}`
        }
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.error(err))

    return response
}

module.exports = {returnLastRun}