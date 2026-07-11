document.getElementById('authorize-btn').addEventListener('click', function() {
    const redirect_uri = window.location.href + "exchange_token"
    window.location.href = `https://www.strava.com/oauth/authorize?client_id=208780&response_type=code&redirect_uri=${redirect_uri}&approval_prompt=force&scope=read,activity:read_all`
})
