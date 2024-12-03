document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([-12.9310, -38.4095], 12);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors © CartoDB',
    }).addTo(map);

    L.circleMarker([-12.9714, -38.5014], {
        color: '#004CBF',
        fillColor: '#015CE1', 
        fillOpacity: 0.9,
        radius: 6 
    }).addTo(map).bindPopup('<b>Salvador - Bahia</b>');
});
