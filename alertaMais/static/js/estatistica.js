const ctx = document.getElementById('myChart1');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [
            {
                label: 'Roubos',
                data: [150, 120, 180, 200, 170, 190],
                borderColor: '#003366',
                backgroundColor: '#003366',
                borderWidth: 2
            },
            {
                label: 'Furtos',
                data: [100, 80, 90, 110, 95, 105],
                borderColor: '#4CAF50',
                backgroundColor: '#4CAF50',
                borderWidth: 2
            }
        ]
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Ocorrências de Roubos e Furtos'
            }
        }
    }
});

const ctxs = document.getElementById('myChart2');
const myCharts = new Chart(ctxs, {
    type: 'bar',
    data: {
        labels: ['1ª Semana', '2ª Semana', '3ª Semana', '4ª Semana'],
        datasets: [
            {
            label: 'Roubos',
            data: [120, 150, 100, 130],
            backgroundColor: '#003366',
            borderColor: '#003366',
            borderWidth: 1
        },
        {
            label: 'Furtos',
            data: [80, 70, 90, 85],
            backgroundColor: '#4CAF50',
            borderColor: '#4CAF50',
            borderWidth: 1
        }
        ]
},
    options: {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        y: {
            // beginAtZero: true
        }
    }
}
});
