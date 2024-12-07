// Função para processar os dados e criar os gráficos
async function criarGraficos() {
    // Carregar o JSON
    const response = await fetch('dados_estatisticas.json');
    const dadosOriginais = await response.json();

    // Gráfico de Ocorrências por Gênero
    const ocorrenciasPorGenero = dadosOriginais.reduce((acc, item) => {
        const genero = item.sexo || 'Não Identificado';
        acc[genero] = (acc[genero] || 0) + item.total;
        return acc;
    }, {});

    const labelsGenero = Object.keys(ocorrenciasPorGenero);
    const dadosGenero = Object.values(ocorrenciasPorGenero);

    const ctxGenero = document.getElementById('myChart1').getContext('2d');
    new Chart(ctxGenero, {
        type: 'bar',
        data: {
            labels: labelsGenero,
            datasets: [{
                label: 'Ocorrências por Gênero',
                data: dadosGenero,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribuição de Ocorrências por Gênero'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Número de Ocorrências'
                    }
                }
            }
        }
    });

    // Gráfico de Ocorrências por Mês
    const ocorrenciasPorMes = dadosOriginais.reduce((acc, item) => {
        const mes = item.Mês || 'Não Identificado';
        acc[mes] = (acc[mes] || 0) + item.total;
        return acc;
    }, {});

    // Definir ordem dos meses
    const ordemMeses = [
        'janeiro', 'fevereiro', 'março', 'abril',
        'maio', 'junho', 'julho', 'agosto',
        'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    // Ordenar meses
    const labelsMes = Object.keys(ocorrenciasPorMes)
        .sort((a, b) => ordemMeses.indexOf(a.toLowerCase()) - ordemMeses.indexOf(b.toLowerCase()));

    const dadosMes = labelsMes.map(mes => ocorrenciasPorMes[mes] || 0);

    // Criar gráfico de meses
    const ctxMes = document.getElementById('myChart2').getContext('2d');
    new Chart(ctxMes, {
        type: 'bar',
        data: {
            labels: labelsMes,
            datasets: [{
                label: 'Ocorrências por Mês',
                data: dadosMes,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribuição de Ocorrências por Mês'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Número de Ocorrências'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Meses'
                    }
                }
            }
        }
    });

    // Gráfico de Ocorrências por Bairro
    const ocorrenciasPorBairro = dadosOriginais.reduce((acc, item) => {
        const bairro = item.bairro || 'Não Identificado';
        acc[bairro] = (acc[bairro] || 0) + item.total;
        return acc;
    }, {});

    // Ordenar bairros por número de ocorrências e pegar os 10 primeiros
    const bairrosOrdenados = Object.entries(ocorrenciasPorBairro)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const labelsBairro = bairrosOrdenados.map(item => item[0]);
    const dadosBairro = bairrosOrdenados.map(item => item[1]);

    // Criar gráfico de bairros
    const ctxBairro = document.getElementById('myChart3').getContext('2d');
    new Chart(ctxBairro, {
        type: 'bar',
        data: {
            labels: labelsBairro,
            datasets: [{
                label: 'Ocorrências por Bairro (Top 10)',
                data: dadosBairro,
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Top 10 Bairros por Número de Ocorrências'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Número de Ocorrências'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Bairros'
                    },
                    ticks: {
                        autoSkip: false,
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        }
    });

    // Gráfico de Ocorrências por Tipo de Delito
    const ocorrenciasPorDelito = dadosOriginais.reduce((acc, item) => {
        const delito = item.delito || 'Não Identificado';
        acc[delito] = (acc[delito] || 0) + item.total;
        return acc;
    }, {});

    // Ordenar delitos por número de ocorrências e pegar os 10 primeiros
    const delitosOrdenados = Object.entries(ocorrenciasPorDelito)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const labelsDelito = delitosOrdenados.map(item => item[0]);
    const dadosDelito = delitosOrdenados.map(item => item[1]);

    // Criar gráfico de delitos
    const ctxDelito = document.getElementById('myChart4').getContext('2d');
    new Chart(ctxDelito, {
        type: 'bar',
        data: {
            labels: labelsDelito,
            datasets: [{
                label: 'Ocorrências por Tipo de Delito',
                data: dadosDelito,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Tipos de Delito por Número de Ocorrências'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Número de Ocorrências'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Tipos de Delito'
                    },
                    ticks: {
                        autoSkip: false,
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        }
    });
}

// Chamar a função quando a página carregar
criarGraficos();