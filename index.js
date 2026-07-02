const CLIENT_ID = 208780
const CLIENT_SECRET = 'c694420fe9b758104c4c07bd20a13c019bc98395'
let refresh_token = ''

async function getRefreshToken() {
    const code = 'cb75401ba497c2e56d9dfc63f561c5de4c24b493'
    const url = `https://www.strava.com/oauth/token?client_id${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=`
    const response = fetch()
}


async function getStats() {
    const ACCESS_TOKEN = "b5ae7f111f9d1bbd8f85dabf259f1cdc90a317f8"
    const url = `https://www.strava.com/api/v3/activities`
    const apiResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const activities = await apiResponse.json()

    console.log(activities)
}

getStats()