// Initialize the map
const map = L.map('map').setView([20.0, 83.0], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

// Load pins from local storage
const pins = JSON.parse(localStorage.getItem('pins')) || [];
pins.forEach(addPinToList);

map.on('click', function (e) {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;
  const remark = prompt("Enter your remark:");

  if (remark) {
    const pin = { lat, lng, remark };
    pins.push(pin);
    localStorage.setItem('pins', JSON.stringify(pins));
    addPinToList(pin);
  }
});

function addPinToList(pin) {
  L.marker([pin.lat, pin.lng]).addTo(map).bindPopup(pin.remark);
  const li = document.createElement('li');
  li.textContent = pin.remark;
  li.addEventListener('click', () => {
    map.setView([pin.lat, pin.lng], 15);
  });
  document.getElementById('pin-list').appendChild(li);
}
function fetchAddress(lat, lng) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      .then(response => response.json())
      .then(data => {
        const address = data.display_name;
        pin.remark += ` - ${address}`;
        localStorage.setItem('pins', JSON.stringify(pins));
        addPinToList(pin);
      });
  }
  
