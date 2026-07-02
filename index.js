const CLIENT_ID = 208780
const CLIENT_SECRET = 'c694420fe9b758104c4c07bd20a13c019bc98395'

async function retrieveRefreshToken() {
  try {
    const response = await fetch('./info.json')
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.error('Error fetching JSON:', error));
    
    if (typeof response.refresh_token === "string" && response.refresh_token.length === 0) {
      console.log("You are not authorised")
    }
  } catch(err) {
    console.log("Something wrong has occured: " + err)
  }
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

document.getElementById('getActivity-btn').addEventListener('click', function() {

})

retrieveRefreshToken()