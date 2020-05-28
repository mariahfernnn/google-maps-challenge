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
  spots.forEach(function(spot) {
    spotsHTML += `
    <div class="spot-container">
        <div class="spot-info-container">
            <div class="spot-name">
                <span>Riverdale Park East</span>
            </div>
            <div class="spot-address">550 Broadview Ave</div>
        </div>
        <div class="spot-number-container">
            <div class="spot-number">
                1
            </div>
        </div>
    </div>
    `
  });
  document.querySelector('.spots-list').innerHTML = spotsHTML;
}

