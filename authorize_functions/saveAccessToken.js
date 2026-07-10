async function saveAccessToken(access_token, expiryTimeInEpoch) {
    const fs = require('fs/promises')
    const filePath = "./info.json"
    
    try {
        const rawData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(rawData);
        jsonData.access_token = access_token;
        jsonData.access_token_expires_at = expiryTimeInEpoch;

        await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');

    } catch (error) {
        console.error('Error updating the file:', error);
  }
}

module.exports = {saveAccessToken}