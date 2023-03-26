
/// set wms_env based on min and max text boxes
function WMScolormap(){
  var CBMin = parseFloat(document.getElementById("colorBarMin").value);
  var CBMax = parseFloat(document.getElementById("colorBarMax").value);
  // cm to mm
  var CBMin = CBMin*10; 
  var CBMax = CBMax*10;
  var CBRange = CBMax-CBMin
  var CBInt = CBRange/4

  var CBVals = [CBMin,CBMin+CBInt,CBMin+CBInt*2,CBMin+CBInt*3,CBMax]
  var CBInt = (CBMax-CBMin)/8
  var env = "c1:"+CBVals[0]+";c2:"+CBVals[1]+";c3:"+CBVals[2]+";c4:"+CBVals[3]+";c5:"+CBVals[4]

  /// set colorbar range
  document.getElementById("colorBarLeft").textContent = CBMin/10
  document.getElementById("colorBarCenter").textContent = (CBMin+(CBMax-CBMin)/2)/10
  document.getElementById("colorBarRight").textContent = CBMax/10
  return env
}



/// add data layer to the map
function addDataLayer() {    
    var subs_env = WMScolormap()
    Opacity = parseInt(document.getElementById("slider").value, 10) / 100
    lyr_subs_wms = L.tileLayer.wms(
        'https://serve.mapsdev.com:8443/geoserver/subsidence/wms?service=WMS',
        {
            VERSION:'1.1.0',
            LAYERS:'subsidence:subsidecne_v0301',
            STYLES:'cm_spectral',
            format: 'image/png',
            transparent: true,
            env:subs_env,
            tms: true, 
            opacity: Opacity,
            minZoom: 1, 
            maxZoom: 13,
            attribution: "Iran Subsidence map. Mahmud Haghighi, 2022, contains modified Copernicus Sentinel data 202, processed by ESA.", 
        })
    var overlaymaps = {"Subsidence Iran":lyr_subs_wms}
    lyr_subs_wms.addTo(map)
}



function showLonLat(){
    map.addEventListener('mousemove', (event) => {
        lat = Math.round(event.latlng.lat * 100000) / 100000;
        lng = Math.round(event.latlng.lng * 100000) / 100000;
        // lonLatDisplay.textContent = lng.toPrecision(5)+'/'+lat.toPrecision(5)
        lonDisplay.textContent = lng.toPrecision(5)
        latDisplay.textContent = lat.toPrecision(5)
    });
}

function setOpacity(lyr){
    slider.addEventListener('input', function (e) {
        Opacity  = parseInt(e.target.value, 10) / 100
        sliderValue.textContent = e.target.value + '%';
        lyr.setOpacity(Opacity)
    })
}

function updateWMS(lyr){
    var env = WMScolormap()
    lyr.setParams(
        {
            env:env
        })
}




var lonDisplay = document.getElementById('Lon');
var latDisplay = document.getElementById('Lat');
var sliderValue = document.getElementById('slider-value');
var center = [30,55]
var zoom = 6


var map = L.map('map', {
    container: 'map',
    center: center,
    zoom: zoom,
    minZoom: 1,
    maxZoom: 13,
    layers: [osm]
});

addDataLayer()

var overlaymaps = {"Subsidence Iran":lyr_subs_wms}
L.control.layers(
    basemaps, 
    overlaymaps, 
    {
        collapsed: false
    }).addTo(map);

var lyr = lyr_subs_wms
showLonLat()
setOpacity(lyr)
