var map;
var markers = [];
var infoWindow;
function initMap() {
  var losAngeles = {
    lat: 34.063380,
    lng: -118.358080
  }
  map = new google.maps.Map(document.getElementById('map'), {
    center: losAngeles,
    zoom: 8,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ]
  });
  infoWindow = new google.maps.InfoWindow();
  searchStores();
}


function searchStores() {
  var foundStores = [];
  var zipCode = document.getElementById('zip-code-input').value;
  // console.log(zipCode)
  if (zipCode) {
    stores.forEach(function(store) {
        var postal = store.address.postalCode.substring(0,5);
        // console.log(postal)
        if(postal == zipCode) {
          foundStores.push(store);
        }
      })
  } else {
    foundStores = stores;
  }
  clearLocations();
  displayStores(foundStores);
  showStoresMarkers(foundStores);
  setOnClickListener();
}

function clearLocations() {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers.length = 0;
}

function setOnClickListener() {
  var storeElements = document.querySelectorAll('.store-container');
  // console.log(storeElements);
  storeElements.forEach(function(elem, index) {
    elem.addEventListener('click', function() {
      google.maps.event.trigger(markers[index], 'click');
    })
  })
}

function displayStores(stores) {
  var storesHtml = "";
  stores.forEach(function(store, index){
      var address = store.addressLines;
      var phone = store.phoneNumber;
      storesHtml += `
          <div class="store-container">
              <div class="store-container-background">
                  <div class="store-info-container">
                      <div class="store-address">
                          <span>${address[0]}</span>
                          <span>${address[1]}</span>
                      </div>
                      <div class="store-phone-number">${phone}</div>
                  </div>
                  <div class="store-number-container">
                      <div class="store-number">
                          ${index+1}
                      </div>
                  </div>
              </div>
          </div>
      `
  });
  document.querySelector('.stores-list').innerHTML = storesHtml;
}

function showStoresMarkers(stores) {
  var bounds = new google.maps.LatLngBounds();
  stores.forEach(function(store, index){
      var latlng = new google.maps.LatLng(
          store.coordinates.latitude,
          store.coordinates.longitude);
      var name = store.name;
      var address = store.addressLines[0];
      var statusText = store.openStatusText;
      var phone = store.phoneNumber;
      bounds.extend(latlng);
      createMarker(latlng, name, address, statusText, phone, index);
  })
  map.fitBounds(bounds);
}

function createMarker(latlng, name, address, statusText, phone, index) {
  var html = `
      <div class="store-info-window">
          <div class="store-info-name">
              ${name}
          </div>
          <div class="store-info-status">
              ${statusText}
          </div>
          <div class="store-info-address">
              <div class="circle">
                  <i class="fas fa-location-arrow"></i>
              </div>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${address}">${address}</a>
          </div>
          <div class="store-info-phone">
              <div class="circle">
                  <i class="fas fa-phone-alt"></i>
              </div>
              <a href="tel:${phone}">${phone}</a>
          </div>
      </div>
  `;

  // var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  // var iconBase = 'https://img.icons8.com/color/48/000000/';

  var iconBase = {
    url: "https://img.icons8.com/color/48/000000/starbucks.png", // url
    scaledSize: new google.maps.Size(30, 30), // size
  };

  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    label: {
      text: `${index+1}`,
      color: '#282726',
      fontSize: '20px',
      fontWeight: 'bold'
    },
    icon: iconBase 
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}

// function toggleBounce() {
//   if (marker.getAnimation() !== null) {
//     marker.setAnimation(null);
//   } else {
//     marker.setAnimation(google.maps.Animation.BOUNCE);
//   }
// }



