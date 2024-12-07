document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Cria o mapa centrado na localização atual
            const map = L.map('map').setView([latitude, longitude], 15);

            // Adiciona o mapa base
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors © CartoDB',
            }).addTo(map);

            // Adiciona o círculo para a localização atual
            L.circle([latitude, longitude], {
                color: 'transparent',
                fillColor: '#fa3a3a',
                fillOpacity: 0.5,
                radius: 500
            }).addTo(map).bindPopup('<b>Localização atual</b>');

            L.circleMarker([latitude, longitude], {
                fillColor: '#015CE1',
                fillOpacity: 0.9,
                radius: 7
            }).addTo(map).bindPopup('<b>Localização atual</b>');

            // Função para adicionar círculos de bairros
            function addCircles(bairrosData) {
                bairrosData.forEach(function (bairro) {
                    var circle = L.circle([bairro.latitude, bairro.longitude], {
                        color: 'transparent',
                        fillColor: '#fa3a3a',
                        fillOpacity: 0.3,
                        radius: 500
                    }).addTo(map);
                    circle.bindPopup(`<p>${bairro.bairro}</p>`);
                });
            }

            // Carregar os dados dos bairros do arquivo JSON
            fetch('bairros_data.json')
                .then(response => response.json())
                .then(data => addCircles(data))
                .catch(error => console.error('Erro ao carregar dados dos bairros:', error));
        }, (error) => {
            alert('Não foi possível obter sua localização. Erro: ' + error.message);
        });
    } else {
        alert('Geolocalização não é suportada no seu navegador.');
    }
});



