'use strict';

window.odometerOptions = {
    duration: 120,
};

window.onload = () => {
    loadCurrentCount();
    loadDiff();
    loadPastSamplesAndDrawChart();
}

function loadCurrentCount() {
    fetch("/current").then(response => {
        response.json().then(body => {
            document.getElementById("count").innerText = _numberWithCommas(body.count);
            document.getElementById("updated").innerText = new Date(Number.parseInt(body.timestamp)).toLocaleString();
        })
    });
}

function _numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function loadDiff() {
    fetch("/diff").then(response => {
        response.json().then(body => {
            if (body.diff) {
                document.getElementById("sign").innerText = ((body.diff >= 0) ? "+" : "-")
                document.getElementById("diff").innerText = _numberWithCommas(Math.abs(body.diff));
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
                        pointRadius: 0,
                    }]
                },
                options: {
                    legend: {
                        display: false,
                    },
                    responsive: true,
                    aspectRatio: 1.5,
                    title: {
                        display: false,
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
                                    enabled: true,
                                    fontStyle: 'bold',
                                },
                                autoSkip: true,
                                autoSkipPadding: 75,
                                maxRotation: 0,
                            }
                        }],
                        yAxes: [{
                            display: true,
                        }]
                    },
                    tooltips: {
                        intersect: false,
                        mode: 'index',
                        callbacks: {
                            label: (tooltipItem, myData) => {
                                return _numberWithCommas(tooltipItem.value) + '명';
                            }
                        }
                    },
                }
            };

            const ctx = document.getElementById('chart').getContext('2d');

            const chart = new Chart(ctx, cfg);
        })
    });
}

