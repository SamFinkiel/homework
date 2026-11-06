/* global google*/
const searchBtn = document.querySelector('#searchBtn');
const resultHeaderElem = document.querySelector('#header');
const resultsListElem = document.querySelector('#resultsList');
const savedListElem = document.querySelector('#savedList');
const clearSavedPlacesElem = document.querySelector('#clearSavedPlaces');
const markers = [];
const savedMarkers = JSON.parse(localStorage.getItem('savedPlaces')) || [];
const [{ Map, InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
        google.maps.importLibrary('maps'),
        google.maps.importLibrary('marker'),
]);
const infoWindow = new InfoWindow();
const mapElem = new Map(document.querySelector('#map'), {
    center: { lat: 40.09543950426593, lng: -74.2221793333354 },
    zoom: 5,
    renderingType: 'VECTOR',
    mapTypeId: 'satellite',
    mapId: 'DEMO_MAP_ID'
});
const bounds = new google.maps.LatLngBounds();

displaySaved(savedMarkers);

searchBtn.addEventListener('click', async () => {
    
    // Double check that the geoName API is working
    if (!window.APP_CONFIG?.geoNamesUsername) {
        resultHeaderElem.textContent =
            'Search unavailable. Missing GeoNames username.';
        resultsListElem.innerHTML = '';
        return;
    }
    
    // Get the geoName URL with the API key
    const geonamesUrl = `http://api.geonames.org/wikipediaSearch?q=${document.querySelector('#search').value}&maxRows=10&username=${window.APP_CONFIG?.geoNamesUsername}&type=json`;

    try {
        // Clear the old search
        resultsListElem.innerHTML = '';
        markers.forEach(place => {
            place.map = null;
        });
        markers.length = 0;

        // Get the list of geoName places
        const response = await fetch(geonamesUrl);

        // Make sure that we get back a good response
        if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }
        const text = await response.json();
        
        // If no results are found
        if (!text.geonames.length) {
            resultHeaderElem.textContent = 'No results found.';
            return;
        }
        resultHeaderElem.textContent = `You got ${text.geonames.length} results`;

        // Display the list of results
        displayPlaces(text.geonames);

        mapElem.fitBounds(bounds);
    } catch (e) {
        console.error(e);
    }
});

clearSavedPlacesElem.addEventListener('click', () => {
    savedListElem.innerHTML = '';
    savedMarkers.length = 0;
    localStorage.removeItem('savedPlaces');
});


// This function takes an array and displays it
function displayPlaces(places) {
    places.forEach(place => {
        resultsListElem.insertAdjacentHTML('beforeend',
            `<li>
                <h5>${place.title}</h5>
                <p>${place.summary}</p>
                <a href="https://${place.wikipediaUrl}" target="_blank" rel="noopener noreferrer">Click here for more details</a>
            </li>`
        );

        const marker = new AdvancedMarkerElement({
            map: mapElem,
            position: { lat: place.lat, lng: place.lng },
            title: place.title
        });
        
        markers.push(marker);
        
        bounds.extend({
            lat: place.lat,
            lng: place.lng
        });

        marker.addListener('click', () => {
            infoWindow.setContent(place.summary);
            infoWindow.open({
                anchor: marker
            });

            const alreadySaved = savedMarkers.some(saved => saved.title === place.title);

            if (!alreadySaved) {
                savedMarkers.push({
                title: place.title,
                summary: place.summary,
                wikiLink: place.wikipediaUrl
                });
                localStorage.setItem('savedPlaces', JSON.stringify(savedMarkers));
                displaySaved(savedMarkers);
            }
        });
    });
}

function displaySaved(savedItems) {
    savedListElem.innerHTML = '';

    savedItems.forEach(marker => {
        savedListElem.insertAdjacentHTML('beforeend',
            `<li>
                <h5>${marker.title}</h5>
                <p>${marker.summary}</p>
                <a href="https://${marker.wikiLink}" target="_blank" rel="noopener noreferrer">Click here for more details</a>
            </li>`
        );
    });
}