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

var source = new EventSource('http://api.chab.us/buses/tail')
source.addEventListener('add', onAdd)
source.addEventListener('change', onChange)
source.addEventListener('remove', onRemove)

var buses = {}
window.buses = buses // so we can use the console

function onAdd(e) {
  var data = parse(e)

  var bus = {
    id: data.id,
    data: data,
    marker: L.marker(longLat(data))
             .bindPopup(data.properties.route)
             .addTo(map)
  }

  buses[data.id] = bus
  console.log(buses)
}

function onChange(e) {
  var data = parse(e)
  var bus = buses[data.id]
  console.log('move', bus)
  bus.marker.setLatLng(longLat(data))
}

function onRemove() {
}

function parse(e) {
  return JSON.parse(e.data)
}

function longLat(geojson) {
  return [
    geojson.geometry.coordinates[1],
    geojson.geometry.coordinates[0]
  ]
}