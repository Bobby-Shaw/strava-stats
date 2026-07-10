function displayData(response) {
    console.log(JSON.stringify(response, null, 2))

    const kmFormatter = new Intl.NumberFormat('en-US', {
        unit: 'kilometer',
        unitDisplay: 'short',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    });

    let html = `
    <div id="results-card">
        <h1 id="title">${response.name}</h3>    
        <div id="horizontal_stats">
            <p><span class="label">Distance:</span> <br> ${kmFormatter.format(response.distance / 1000 )}km</p>
            <p><span class="label">Time: </span> <br> ${Math.round(Number(response.elapsed_time) / 60)} mins</p>
        </div>
    </div>
    `

    document.getElementById("lastRunData-div").innerHTML = html
}

document.getElementById('getLastRun-btn').addEventListener('click', async function() {
    const response = await fetch('/last_run', {
        method: "GET",
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.error(err))

    displayData(response[0])
})