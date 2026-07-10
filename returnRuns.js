async function returnRuns(access_token, numberOfRuns) {
    const url = `https://www.strava.com/api/v3/athlete/activities?per_page=${numberOfRuns}`
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${access_token}`
        }
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.error(err))

    console.log(typeof response + response)

    return response
}

module.exports = {returnRuns}
