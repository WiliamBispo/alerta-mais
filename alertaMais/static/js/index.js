document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([-12.9310, -38.4095], 12); 

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors © CartoDB',
    }).addTo(map);

    L.marker([-12.9714, -38.5014]) 
        .addTo(map)
        .bindPopup('<b>Salvador - Bahia</b><br>Capital da Bahia.')
        .openPopup();
});


