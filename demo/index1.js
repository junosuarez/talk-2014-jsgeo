var L = require('leaflet')
var leafletMap = require('leaflet-map')

var map = leafletMap()
// create the tile layer with correct attribution
  var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
  var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib})
  map.addLayer(osm)

var chattanooga = [35.0456297,-85.3096801]
map.setView(chattanooga, 12)


L.marker(chattanooga)
  .bindPopup('Chattanooga!')
  .addTo(map)

