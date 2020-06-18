const ChartData = async(id, data, type) => {
    const ctx = document.getElementById(`${id}-${type}`);
    var myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: data.options,
            datasets: [{
                label: data.label,
                data: type === 'bar' ? [...data.counts, Math.max(...data.counts) + 0.25] : [...data.counts],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(57, 242, 0, 0.2)',
                    'rgb(197, 201, 195, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgb(197, 201, 195, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
            yAxes: [{
                ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
};