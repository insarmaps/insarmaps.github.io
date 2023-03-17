//// Basemaps

var osm = L.tileLayer(
	'http://{s}.tile.osm.org/{z}/{x}/{y}.png', 
	{
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', 
		minZoom: 1, 
		maxZoom: 13
	});
var cartodb = L.tileLayer(
	'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', 
	{
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
		minZoom: 1,
		maxZoom: 13
	});

var toner = L.tileLayer(
	'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', 
	{
		attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
		minZoom: 1,
		maxZoom: 13
	});
var white = L.tileLayer(
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEX///+nxBvIAAAAH0lEQVQYGe3BAQ0AAADCIPunfg43YAAAAAAAAAAA5wIhAAAB9aK9BAAAAABJRU5ErkJggg==",
 	{
	 	minZoom: 1, 
	 	maxZoom: 13
 	});

var google_satellite = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
	    attribution: 'Imagery © <a href="http://maps.google.com">Google</a>',
	    maxZoom: 21,
	    id: 'map' 
	});


// var basemaps = {"OpenStreetMap": osm, "CartoDB Positron": cartodb, "Stamen Toner": toner, "Without background": white}
var basemaps = {"OpenStreetMap": osm, 
				"CartoDB Positron": cartodb,
				"Google Satellite": google_satellite
				}




