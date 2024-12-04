document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([-12.9714, -38.4814], 15);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors © CartoDB',
    }).addTo(map);

    L.circle([-12.9714, -38.4814], {
        color: 'trnsparent',
        fillColor: '#fa3a3a',
        fillOpacity: 0.5, 
        radius: 500 
    }).addTo(map).bindPopup('<b>Salvador - Bahia</b>');

    L.circleMarker([-12.9714, -38.4814], {
        fillColor: '#015CE1',
        fillOpacity: 0.9,
        radius: 7
    }).addTo(map).bindPopup('<b>Salvador - Bahia</b>');
});
