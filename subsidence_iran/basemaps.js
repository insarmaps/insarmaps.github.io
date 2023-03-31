//// Basemaps
var minZoom = 1
var maxZoom = 20

var osm = L.tileLayer(
	'http://{s}.tile.osm.org/{z}/{x}/{y}.png', 
	{
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', 
		minZoom: minZoom, 
		maxZoom: maxZoom
	});
var cartodb = L.tileLayer(
	'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', 
	{
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
		minZoom: minZoom, 
		maxZoom: maxZoom
	});

var toner = L.tileLayer(
	'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', 
	{
		attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
		minZoom: minZoom, 
		maxZoom: maxZoom
	});
var white = L.tileLayer(
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEX///+nxBvIAAAAH0lEQVQYGe3BAQ0AAADCIPunfg43YAAAAAAAAAAA5wIhAAAB9aK9BAAAAABJRU5ErkJggg==",
 	{
		minZoom: minZoom, 
		maxZoom: maxZoom
 	});

var google_satellite = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
		attribution: 'Imagery © <a href="http://maps.google.com">Google</a>',
		minZoom: minZoom, 
		maxZoom: maxZoom
	});


// var basemaps = {"OpenStreetMap": osm, "CartoDB Positron": cartodb, "Stamen Toner": toner, "Without background": white}
var basemaps = {"OpenStreetMap": osm, 
				"CartoDB Positron": cartodb,
				"Google Satellite": google_satellite
				}




