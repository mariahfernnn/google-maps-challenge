var map;
var markers = [];
var infoWindow;
function initMap() {
  var torontoCanada = {
    lat: 43.651070,
    lng: -79.347015
  }
  map = new google.maps.Map(document.getElementById('map'), {
    center: torontoCanada,
    zoom: 8
  });
  infoWindow = new google.maps.InfoWindow();
  displaySpots()
  showSpotsMarkers()
}

function displaySpots() {
  var spotsHTML = "";
  spots.forEach(function(spot, index) {
    var name = spot.Name;
    var district = spot.District;
    var address = spot.Address;
    spotsHTML += `
    <div class="spot-container">
        <div class="spot-info-container">
            <div class="spot-name">
                <span>${name}</span>
            </div>
            <div class="spot-address">${address}</div>
            <div class="spot-district">${district}</div>
        </div>
        <div class="spot-number-container">
            <div class="spot-number">
                ${index+1}
            </div>
        </div>
    </div>
    `
  });
  document.querySelector('.spots-list').innerHTML = spotsHTML;
}

function showSpotsMarkers() {
  // var bounds = new google.maps.LatLngBounds();
  spots.forEach(function(spot, index) {
    var latlng = new google.maps.LatLng(
      spot.Y,
      spot.X);
    console.log(latlng);
    var name = spot.Name;
    var address = spot.Address;
    var district = spot.District;
    // bounds.extend(latlng);
    createMarker(latlng, name, address, district);
  })
  // map.fitBounds(bounds);
}

function createMarker(latlng, name, address) {
  var html = "<b>" + name + 
             "</b> <br/>" + `
             <i class="fas fa-paper-plane"></i>
             <a href="http://maps.google.com/maps?q=${address}" target="_blank">
                   ${address}
             </a>
             `;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}




