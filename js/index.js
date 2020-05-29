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
  showSpotsMarkers()
  setOnClickListener()
}

function searchSpots() {
  var foundSpots = [];
  var findAddress = document.getElementById('address-input').value.toUpperCase();
  // console.log(findAddress)
  spots.forEach(function(spot) {
      var address = spot.Address;
      // console.log(address)
      if(address == findAddress) {
        foundSpots.push(spot);
      }
  })
  // console.log(foundSpots);
  displaySpots(foundSpots);
}

function clearLocations() {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers.length = 0;
}

function setOnClickListener() {
  var spotElements = document.querySelectorAll('.spot-container');
  // console.log(spotElements);
  spotElements.forEach(function(elem, index) {
    elem.addEventListener('click', function() {
      google.maps.event.trigger(markers[index], 'click');
    })
  })

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
  var bounds = new google.maps.LatLngBounds();
  spots.forEach(function(spot, index){
      var latlng = new google.maps.LatLng(
          spot.Y,
          spot.X);
      // console.log(latlng);
      var name = spot.Name;
      var address = spot.Address;
      var district = spot.District;
      bounds.extend(latlng);
      createMarker(latlng, name, address, district, index);
  })
  map.fitBounds(bounds);
}

function createMarker(latlng, name, address, index) {
  var html = `
      <div class="spot-info-window">
          <div class="spot-info-name">
            ${name}
          </div>
          <div class="spot-info-address">
            <div class="circle">
              <i class="fas fa-location-arrow"></i>
            </div>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${address}">
            ${address}
          </div>
      </div>
  `;

  // Add index label to marker later 
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




