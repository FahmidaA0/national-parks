mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWFtZCIsImEiOiJjbWE3Z2R6bWoxMTRqMmpvb2w1bWFoc3JyIn0.MXbj8s15iXVTL05K61apyw';
const map = new mapboxgl.Map({
  container: 'map-container',
  style: 'mapbox://styles/mariamd/cma985b4g008101qrbrm6a4pm?fresh=true',
  center: [-73.974187, 40.715148], // Start map view at NY
  zoom: 9.0
});

// Create a Geocoder
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  placeholder: 'Enter an address to find nearby parks'
});

const geocoderContainer = document.getElementById('geocoder-container');
geocoderContainer.appendChild(geocoder.onAdd(map));

// Add click handler to close volunteer panel when search bar is clicked
geocoderContainer.addEventListener('click', (e) => {
  // Check if click is on the search input or its children
  if (e.target.closest('.mapboxgl-ctrl-geocoder--input')) {
    const panel = document.getElementById('volunteer-panel');
    panel.classList.remove('visible');
    panel.classList.add('hidden');
  }
});

  // 2. When the map loads, fetch and render your GeoJSON markers
map.on('load', () => {
  fetch('data/nyc_parks.geojson')
    .then(res => res.json())
    .then(data => {
      data.features.forEach(feature => {
        // 2a. Create a popup with basic info
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          '<strong>' + feature.properties.park + '</strong><br>' +
          'Borough: ' + feature.properties.borough + '<br>' +
          'Maintenance: ' + feature.properties.maintenance_funding.toLocaleString() + '<br>' +
          'Volunteer Opportunities: ' + (feature.properties.volunteers ? 'Available' : 'Unavailable')
        );

        // 2b. Create and add the marker
        const marker = new mapboxgl.Marker({ color: 'green' })
          .setLngLat(feature.geometry.coordinates)
          .setPopup(popup)
          .addTo(map);

        // 2c. When this marker is clicked, populate & show the volunteer panel
        marker.getElement().addEventListener('click', () => {
          // Park name
          document.getElementById('volunteer-park-name').textContent =
            feature.properties.park;

          // Funding info
          document.getElementById('volunteer-park-funding').innerHTML =
            'Maintenance: ' + feature.properties.maintenance_funding.toLocaleString() +
            '<br> Private: ' + feature.properties.private_funding.toLocaleString();

          // Volunteer link
          if (feature.properties.volunteers) {
            const url = 'https://cityparksfoundation.org/volunteer/';
            document.getElementById('volunteer-park-link').innerHTML =
              '<a href="' + url + '" target="_blank">View volunteer opportunities</a>';
          } else {
            document.getElementById('volunteer-park-link').textContent =
              'Volunteer opportunities are not available at the moment.';
          }

          // Show the panel
          const panel = document.getElementById('volunteer-panel');
          panel.classList.remove('hidden');
          panel.classList.add('visible');
        });
      });
    })
    .catch(err => console.error('Failed to load GeoJSON:', err));

  // 3. Hide the volunteer panel when clicking anywhere else on the map
  map.on('click', e => {
    // If the click was not on a marker element, hide the panel
    if (!e.originalEvent.target.closest('.mapboxgl-marker')) {
      const panel = document.getElementById('volunteer-panel');
      panel.classList.remove('visible');
      panel.classList.add('hidden');
    }
  });
});