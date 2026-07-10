document.getElementById('getLastRun-btn').addEventListener('click', async function() {
    const response = await fetch('/last_run', {
        method: "POST",
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.error(err))

    console.log(response)
})