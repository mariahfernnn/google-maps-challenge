var map;
function initMap() {
  var torontoCanada = {
    lat: 43.651070,
    lng: -79.347015
  }
  map = new google.maps.Map(document.getElementById('map'), {
    center: torontoCanada,
    zoom: 11
  });
  displaySpots();
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

