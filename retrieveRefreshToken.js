const CLIENT_ID = 208780
const CLIENT_SECRET = 'c694420fe9b758104c4c07bd20a13c019bc98395'

async function retrieveRefreshToken() {
  try {
    const response = await fetch('./info.json')
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.error('Error fetching JSON:', error));

    const refresh_token = response.refresh_token
    
    if (typeof refresh_token === "string" && refresh_token.length === 0) {
      return null
    } else {
      return refresh_token
    }

  } catch(err) {
    console.log("Something wrong has occured: " + err)
  }
}

module.exports(retrieveRefreshToken)