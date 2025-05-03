//mapboxgl.accessToken = 'MAPBOX TOKEN HERE';

const map = new mapboxgl.Map({
  container: 'map-container',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-74.006, 40.7128], // NYC
  zoom: 10
});

// MapBox Map Marker
new mapboxgl.Marker()
  .setLngLat([-73.8407, 40.7498]) 
  .setPopup(new mapboxgl.Popup().setText("Central Park - Defunded Area")) //example area
  .addTo(map);