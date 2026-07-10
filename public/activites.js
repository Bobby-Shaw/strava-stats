document.getElementById('getLastRun-btn').addEventListener('click', async function() {
    const response = await fetch('/last_run', {
        method: "POST",
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.error(err))

    document.getElementById("lastRunData-div").innerText = JSON.stringify(response[0], null, 2)
})