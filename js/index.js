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
  }