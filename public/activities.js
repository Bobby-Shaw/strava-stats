function displayRuns(runs) {

    let totalDistance = 0
    let totalHeartRate = 0
    let totalTime = 0
    let numberOfRuns = 0
    let heartRateCount = 0

    const numberFormatter = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    })

    const wholeNumberFormatter = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0
    })

    function formatDistance(meters) {
        return `${numberFormatter.format(Number(meters) / 1000)} km`
    }

    function formatTime(seconds) {
        return `${wholeNumberFormatter.format(Number(seconds) / 60)} mins`
    }

    function formatHeartRate(heartRate) {
        if (!Number.isFinite(Number(heartRate))) {
            return 'N/A'
        }

        return `${wholeNumberFormatter.format(Number(heartRate))} bpm`
    }

    let html = ``
    for (let i = 0; i < runs.length; i++) {

        if (runs[i].type == "Run") {
            numberOfRuns += 1
            html += `
                <div class="run-card">
                    <h1 class="run-title">${runs[i].name}</h1>
                    <div class="run-stats">
                        <p><span class="label">Distance:</span> <br> ${formatDistance(runs[i].distance)}</p>
                        <p><span class="label">Time: </span> <br> ${formatTime(runs[i].elapsed_time)}</p>
                        <p><span class="label">Avg Heart Rate: </span> <br> ${formatHeartRate(runs[i].average_heartrate)}</p> 
                    </div>
                </div>
            `

            totalDistance += Number(runs[i].distance)
            totalTime += Number(runs[i].elapsed_time)

            if (Number.isFinite(Number(runs[i].average_heartrate))) {
                totalHeartRate += Number(runs[i].average_heartrate)
                heartRateCount += 1
            }
        }
    }


    document.getElementById("runsData-div").innerHTML = html

    if (numberOfRuns == 0) {
        document.getElementById('runsOverview').innerHTML = `
            <div class="run-card" id="overview-div">
                <p>No runs found.</p>
            </div>
        `
        return
    }

    let averageDistance = totalDistance / numberOfRuns
    let averageHeartRate = heartRateCount > 0 ? totalHeartRate / heartRateCount : null
    let averageTime = totalTime / numberOfRuns

    document.getElementById('runsOverview').innerHTML = `
        <div class="run-card" id="overview-div">
        <h1 class="run-title">Overview</h1>
            <div class="run-stats">
                <p><span class="label">Avg Distance:</span> <br> ${formatDistance(averageDistance)}</p>
                <p><span class="label">Avg Time:</span> <br> ${formatTime(averageTime)}</p>
                <p><span class="label">Avg Heart Rate:</span> <br> ${formatHeartRate(averageHeartRate)}</p>
            </div>
        </div>
    `
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
