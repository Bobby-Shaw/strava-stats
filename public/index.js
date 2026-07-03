document.getElementById('authorize-btn').addEventListener('click', function() {
    window.location.href = "https://www.strava.com/oauth/authorize?client_id=208780&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read,activity:read_all"
})