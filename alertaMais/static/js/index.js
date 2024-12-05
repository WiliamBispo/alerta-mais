document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Verifica se o mapa já foi inicializado
            const mapContainer = document.getElementById('map');
            if (mapContainer._leaflet_id) {
                console.warn('Mapa já inicializado. Abortando inicialização.');
                return;
            }

            // Inicializa o mapa
            const map = L.map('map').setView([latitude, longitude], 15);

            // Adiciona camada de tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Adiciona marcador para localização atual
            L.circleMarker([latitude, longitude], {
                color: '#015CE1',
                fillColor: '#015CE1',
                fillOpacity: 0.8,
                radius: 7
            }).addTo(map).bindPopup('<b>Localização atual</b>');

            // Define a função para adicionar círculos
            function addCircles(bairrosData) {
                bairrosData.forEach(bairro => {
                    L.circle([bairro.latitude, bairro.longitude], {
                        color: 'red',
                        fillColor: 'red',
                        fillOpacity: 0.3,
                        radius: 500,
                        weight: 0
                    }).addTo(map).bindPopup(`<b>${bairro.bairro}</b>`);
                });
            }

            // Carrega o arquivo JSON
            fetch("static/bairros_data.json")
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao carregar o arquivo JSON.');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Dados carregados:', data); // Para verificar no console
                    addCircles(data);
                })
                .catch(error => console.error('Erro ao carregar dados dos bairros:', error));
        }, (error) => {
            alert('Não foi possível obter sua localização. Erro: ' + error.message);
        });
    } else {
        alert('Geolocalização não é suportada no seu navegador.');
    }
});