async function returnAccessToken() {
    const fs = require('fs/promises')
    const filePath = "./info.json"

    try {
        const rawData = await fs.readFile(filePath, 'utf8')
        const jsonData = JSON.parse(rawData)
        return jsonData.access_token

    } catch(err) {
        console.error(err)
    }
}

module.exports = {returnAccessToken}