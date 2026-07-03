function returnCode(url) {
    const parsedURL = new URL(url)
    const parameters = parsedURL.searchParams

    if (parameters.has('code')) {
        return  parameters.get('code')
    } else {
        return null
    }
}

module.exports = { returnCode }