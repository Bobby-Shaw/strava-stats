function displayRuns(runs) {

    const kmFormatter = new Intl.NumberFormat('en-US', {
        unit: 'kilometer',
        unitDisplay: 'short',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    });

    let html = ``
    for (let i = 0; i < runs.length; i++) {
        html += `
            <div class="run-card">
                <h1 class="run-title">${runs[i].name}</h1>
                <div class="run-stats">
                    <p><span class="label">Distance:</span> <br> ${kmFormatter.format(runs[i].distance / 1000 )} km</p>
                    <p><span class="label">Time: </span> <br> ${Math.round(Number(runs[i].elapsed_time) / 60)} mins</p>
                    <p><span class="label">Avg Heart Rate: </span> <br> ${runs[i].average_heartrate} bpm</p> 
                </div>
            </div>
        `
    }


    document.getElementById("runsData-div").innerHTML = html
}

document.getElementById('getRuns-btn').addEventListener('click', async function() {
    const runs = await fetch('/runs', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            numberOfRuns: Number(document.getElementById('run-range').value)
        })
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.error(err))

    displayRuns(runs)
})

function updateSliderValue() {
    document.getElementById('sliderValue').innerText = document.getElementById('run-range').value
}
