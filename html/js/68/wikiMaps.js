/* global google*/
const searchBtn = document.querySelector('#searchBtn');
const resultHeaderElem = document.querySelector('#header');
const resultsListElem = document.querySelector('#resultsList');
const [{Map, InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
        google.maps.importLibrary('maps'),
        google.maps.importLibrary('marker'),
    ]);

const mapElem = new Map(document.querySelector('#map'), {
    center: { lat: 40.09543950426593, lng: -74.2221793333354 },
    zoom: 5,
    renderingType: 'VECTOR',
    mapTypeId: 'satellite',
    mapId: 'DEMO_MAP_ID'
});
const infoWindow = new InfoWindow();
const markers = [];

searchBtn.addEventListener('click', async () => {
    const searchResult = document.querySelector('#search');
    if (!window.APP_CONFIG?.geoNamesUsername) {
        resultHeaderElem.textContent =
            'Search unavailable. Missing GeoNames username.';
        resultsListElem.innerHTML = '';
        return;
    }
    const geonamesUrl = `http://api.geonames.org/wikipediaSearch?q=${searchResult.value}&maxRows=10&username=${window.APP_CONFIG?.geoNamesUsername}&type=json`;
    try {
        const response = await fetch(geonamesUrl);
        if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }
        const text = await response.json();
        if (markers) {
            markers.forEach(marker => {
                marker.map = null;
            });
            markers.length = 0;
        }
        if (!text.geonames.length) {
            resultsListElem.innerHTML = '';
            resultHeaderElem.textContent = 'No results found.';
            return;
            }
        const bounds = new google.maps.LatLngBounds();

        resultsListElem.innerHTML = '';
        resultHeaderElem.textContent = `You got ${text.geonames.length} results`;
        text.geonames.forEach(result => {
            resultsListElem.insertAdjacentHTML('beforeend', `<li>
                <h5>${result.title}</h5>
                <p>${result.summary}</p>
                <a href="https://${result.wikipediaUrl}" target="_blank" rel="noopener noreferrer">Click here for more details</a>
                </li>`
            );
            const marker = new AdvancedMarkerElement({
                map: mapElem,
                position: {lat: result.lat, lng: result.lng},
                title: result.title
            });
            markers.push(marker);
            bounds.extend({
                lat: result.lat,
                lng: result.lng
            });

            marker.addListener('click', () => {
                infoWindow.setContent(result.summary);
                infoWindow.open({
                    anchor: marker
                });
            });
        });

        mapElem.fitBounds(bounds);

} catch (e) {
        console.error(e);
    }
});
