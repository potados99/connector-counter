'use strict';

window.onload = () => {
    loadCurrentCount();
    loadDiff();
    loadPastSamplesAndDrawChart();
}

function loadCurrentCount() {
    fetch("/current").then(response => {
        response.json().then(body => {
            document.getElementById("count").innerText = body.count;
            document.getElementById("updated").innerText = new Date(Number.parseInt(body.timestamp)).toLocaleString();
        })
    });
}

function loadDiff() {
    fetch("/diff").then(response => {
        response.json().then(body => {
            if (body.diff) {
                document.getElementById("diff").innerText = ((body.diff > 0) ? "+" : "") + body.diff;
            }
        })
    })
}

function loadPastSamplesAndDrawChart() {
    fetch("/past").then(response => {
        response.json().then(body => {

            const data = body.map(sample => {
                return {
                    x: Number.parseInt(sample.timestamp),
                    y: Number.parseInt(sample.count),
                };
            })

            console.log(data);

            const cfg = {
                type: 'line',
                data: {
                    datasets: [{
                        backgroundColor: "#2ac1bc",
                        borderColor: "#2ac1bc",
                        fill: false,
                        data: data,
                    }]
                },
                options: {
                    legend: {
                        display: false,
                    },
                    responsive: true,
                    title: {
                        display: true,
                        text: '배민커넥터 수'
                    },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            display: true,
                            scaleLabel: {
                                display: true,
                            },
                            ticks: {
                                major: {
                                    fontStyle: 'bold',
                                    fontColor: '#FF0000'
                                }
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                            }
                        }]
                    }
                }
            };

            const ctx = document.getElementById('chart').getContext('2d');

            const chart = new Chart(ctx, cfg);
        })
    });
}
