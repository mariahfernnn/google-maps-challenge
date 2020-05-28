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
    var address = spot.Address;
    spotsHTML += `
    <div class="spot-container">
        <div class="spot-info-container">
            <div class="spot-name">
                <span>${name}</span>
            </div>
            <div class="spot-address">${address}</div>
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
    // bounds.extend(latlng);
    createMarker(latlng, name, address);
  })
  // map.fitBounds(bounds);
}

function createMarker(latlng, name, address) {
  var html = "<b>" + name + "</b> <br/>" + address;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}

