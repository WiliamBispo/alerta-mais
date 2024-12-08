document.addEventListener('DOMContentLoaded', () => {
    const defaultLocation = [-12.9714, -38.5014];

    function initializeMap(center, addLocationCircle = false) {
        const map = L.map('map').setView(center, 15);

        // Adiciona o mapa base
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors © CartoDB',
        }).addTo(map);

        // Adiciona círculos de bairros
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

        // Se for para adicionar o círculo da localização atual
        if (addLocationCircle) {
            L.circle(center, {
                color: 'transparent',
                fillColor: '#fa3a3a',
                fillOpacity: 0.5,
                radius: 500
            }).addTo(map).bindPopup('<b>Localização atual</b>');

            L.circleMarker(center, {
                fillColor: '#015CE1',
                fillOpacity: 0.9,
                radius: 7
            }).addTo(map).bindPopup('<b>Localização atual</b>');
        }
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Inicializa o mapa com a localização atual e adiciona o círculo para a localização
                initializeMap([latitude, longitude], true);
            },
            () => {
                initializeMap(defaultLocation, false);
            }
        );
    } else {
        initializeMap(defaultLocation, false);
    }
});
