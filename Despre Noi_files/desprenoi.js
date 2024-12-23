var map = L.map('map').setView([44.534532, 26.074735], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contribuabili',
    maxZoom: 19
}).addTo(map);

L.marker([44.534532, 26.074735]).addTo(map)
    .bindPopup('<b>Apple Shop</b><br>Aleea Teisani nr. 78, București, Sector 1')
    .openPopup();
