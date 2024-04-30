var minZoom = 1
var maxZoom = 14
var map = L.map('map', {
    center: [35.2, 50],
    zoom: 8,
    fullscreenControl: true
});

// backgrounds
var whiteLayer = L.tileLayer('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wBQAAuIBt9kAAAAASUVORK5CYII=', {
    maxZoom: maxZoom,
});

var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: maxZoom,
    attribution: "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
});

var mapboxAccessToken = 'pk.eyJ1IjoibWFobXVkMSIsImEiOiJjbG1kbWFkOWcwczI4M3FwNHB5OW0wdzAwIn0.qIZRQcKMatRNlgGfBssXVw'

var MapboxDarkLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: maxZoom,
    id: 'mapbox/dark-v10', // Use the Mapbox dark style
    accessToken: mapboxAccessToken // Replace with your Mapbox access token
})
// MapboxDarkLayer.addTo(map);
osmLayer.addTo(map);

var MapboxSatelliteLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    maxZoom: maxZoom,
    attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> contributors'
})

var baseLayers = {
    "White Background": whiteLayer,
    "OpenStreetMap": osmLayer,
    "Dark": MapboxDarkLayer,
    "Satellite": MapboxSatelliteLayer,
};


// add ovelay layers
var wmsLayerSubsidence = L.tileLayer.wms('https://gis2.mapsdev.com/geoserver/subsidence/wms?service=WMS', {
        VERSION:'1.1.0',
        LAYERS:'subsidence:subsidence_rate_mmpy',
        STYLES:'cm_spectral',
        format: 'image/png',
        transparent: true,
        env:"c1:0;c2:50;c3:100;c4:200;c5:250",
        // env:"c1:0;c5:250",
        tms: true, 
        // opacity: Opacity,
        minZoom: minZoom, 
        maxZoom: maxZoom,
        attribution: "Contains modified Copernicus Sentinel data 2022, processed by ESA.", 
    });


wmsLayerSubsidence.addTo(map);

var wmsLayerSeasonal = L.tileLayer.wms('https://rz-vm192.gfz-potsdam.de:8443/geoserver/subsidence/wms?service=WMS', {
        VERSION:'1.1.0',
        LAYERS:'subsidence:seasonal',
        STYLES:'subsidence:cm_viridis',
        format: 'image/png',
        transparent: true,
        // env:"c1:0;c2:2.5;c3:5;c4:7.5;c5:10",
        env:"c1:0;c2:1;c3:2;c4:3;c5:4",
        tms: true, 
        // opacity: Opacity,
        minZoom: minZoom, 
        maxZoom: maxZoom,
        attribution: "Contains modified Copernicus Sentinel data 2022, processed by ESA.", 
    });



// Define available overlay layers
var overlayLayers = {
    "Subsidence rate": wmsLayerSubsidence,
    "Seasonal amplitude": wmsLayerSeasonal,
};

// Create the layer control
var layerControl = L.control.layers(baseLayers, overlayLayers, { collapsed: false }).addTo(map);

// Add 'overlayremove' event listeners to hide colorbars when the overlay is turned off
map.on('overlayremove', function (eventLayer) {
    if (eventLayer.layer === wmsLayerSubsidence) {
        // Hide the Subsidence colorbar
        document.getElementById('colorBarPanelSubsidence').style.display = 'none';
    } else if (eventLayer.layer === wmsLayerSeasonal) {
        // Hide the Seasonal colorbar
        document.getElementById('colorBarPanelSeasonal').style.display = 'none';
    }
});

// Add 'overlayadd' event listeners to show colorbars when the overlay is turned on
map.on('overlayadd', function (eventLayer) {
    if (eventLayer.layer === wmsLayerSubsidence) {
        // Show the Subsidence colorbar
        document.getElementById('colorBarPanelSubsidence').style.display = 'block';
    } else if (eventLayer.layer === wmsLayerSeasonal) {
        // Show the Seasonal colorbar
        document.getElementById('colorBarPanelSeasonal').style.display = 'block';
    }
});


// show lonlat info
var lonDisplay = document.getElementById('Lon');
var latDisplay = document.getElementById('Lat');
function showLonLat(){
    map.addEventListener('mousemove', (event) => {
        lat = Math.round(event.latlng.lat * 100000) / 100000;
        lng = Math.round(event.latlng.lng * 100000) / 100000;
        // lonLatDisplay.textContent = lng.toPrecision(5)+'/'+lat.toPrecision(5)
        lonDisplay.textContent = lng.toPrecision(5)
        latDisplay.textContent = lat.toPrecision(5)
    });
}
showLonLat()



// Update layer opacity based on slider value
function updateLayerOpacity() {
    var sliderValue = document.getElementById('slider').value;
    var opacity = sliderValue / 100; // Convert slider value to opacity (0-1)

    // Set the opacity for layers
    wmsLayerSubsidence.setOpacity(opacity);
    wmsLayerSeasonal.setOpacity(opacity);

    // Update the display of the opacity value
    document.getElementById('slider-value').textContent = sliderValue + '%';
}

// Add an event listener to the slider to call the update function when it changes
document.getElementById('slider').addEventListener('input', updateLayerOpacity);

// Initialize the opacity and slider value
updateLayerOpacity();



map.attributionControl.addAttribution('©<a href="https://www.ipi.uni-hannover.de/en/haghighi/"> Mahmud Haghighi</a>, 2023');


//popup info panel
// Get references to the open and close popup links
var openPopupLink = document.getElementById('moreInfo');
var closePopupLink = document.getElementById('closeInfo');

// Get a reference to the popup container
var popup = document.getElementById('popup');

// Function to close the popup when clicking outside of it
function closePopupOnClickOutside(event) {
    if (event.target !== popup && !popup.contains(event.target)) {
        closePopup();
        document.removeEventListener('click', closePopupOnClickOutside);
    }
}

// Function to open the popup
function openPopup() {
    popup.style.display = 'block';
}

// Function to close the popup
function closePopup() {
    popup.style.display = 'none';
}

// Add click event listeners to the open and close links
openPopupLink.addEventListener('click', function (e) {
    openPopup();
    // Add a click event listener to the document to detect clicks outside the popup
    document.addEventListener('click', closePopupOnClickOutside);
    e.stopPropagation();
});

closePopupLink.addEventListener('click', function (e) {
    closePopup();
    e.stopPropagation();
});












document.getElementById('increase').addEventListener('click', function(event) {
    event.preventDefault();
    adjustColorBarValues(5);
});

document.getElementById('decrease').addEventListener('click', function(event) {
    event.preventDefault();
    adjustColorBarValues(-5);
});

function adjustColorBarValues(change) {
    const maxLabel = document.getElementById('colorbarRight');
    const centerLabel = document.getElementById('colorbarCenter');
    
    let currentValue = parseInt(maxLabel.innerText);
    let newValue = currentValue + change;

    // Ensure the value stays within allowed limits
    if (newValue < 5) newValue = 5;
    if (newValue > 40) newValue = 40;

    maxLabel.innerText = newValue;
    centerLabel.innerText = newValue/2

    updateEnvironmentVariableAndLayer(newValue*10);
}

function updateEnvironmentVariableAndLayer(maxValue) {
    c1Value = 0
    c2Value = maxValue/4
    c3Value = maxValue/2
    c4Value = maxValue/4*3
    c5Value = maxValue
    const envString = `c1:0;c2:${c2Value};c3:${c3Value};c4:${c4Value};c5:${c5Value}`;
    if (window.wmsLayerSubsidence) {
        console.log(envString)
        wmsLayerSubsidence.setParams({ env:envString});
    }
}






