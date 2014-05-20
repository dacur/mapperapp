var _map;
var _group;
var _userLocation;
$(document).ready(function(){

	InitLocation();

});

	function InitLocation(){
		_map = L.map('map')
		_group = new L.LayerGroup();
		_map.addLayer(_group);

		L.tileLayer('http://{s}.tiles.mapbox.com/v3/dacur.i9gb8ifk/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18
		}).addTo(_map);

		var gl = navigator.geolocation;

		gl.getCurrentPosition(geoSuccess, geoError);

		// $('#txtSearch').keypress(function(e))

	}

	function geoSuccess(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;

		_userLocation = [latitude, longitude];
		_map.setView(_userLocation, 16);

		L.marker(_userLocation).addTo(_group);

	}

	function geoError(err) {
		if (err.code===0)
			alert('Sorry, something went wrong while getting your location');
		else if (err.code===1)
			alert('Mapper can\'t work if you don\'t allow us to locate you.');
		else if (err.code===2)
			alert('Sorry, we are having issues locating you.<br/>Please refresh and try again.')
		else if (err.code===3)
			alert('Sorry, we timed out looking for your location');
	}

	// var map = L.map('map').setView([51.505, -0.09], 13);

		// map.on('click', onMapClick);

	// L.tileLayer('http://{s}.tiles.mapbox.com/v3/dacur.i9gb8ifk/{z}/{x}/{y}.png', {
	//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	//     maxZoom: 18
	// }).addTo(map);

	// var marker = L.marker([51.5, -0.09]).addTo(map);

	// var circle = L.circle([51.508, -0.11], 500, {
 //    color: 'red',
 //    fillColor: '#f03',
 //    fillOpacity: 0.5
	// }).addTo(map);

	// var polygon = L.polygon([
 //    [51.509, -0.08],
 //    [51.503, -0.06],
 //    [51.51, -0.047]
	// ]).addTo(map);

	// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
	// circle.bindPopup("I am a circle.");
	// polygon.bindPopup("I am a polygon.");

	// var popup = L.popup()
 //    .setLatLng([51.5, -0.09])
 //    .setContent("I am a standalone popup.")
 //    .openOn(map);

 //    function onMapClick(e) {
 //    alert("You clicked the map at " + e.latlng);
	// }

	// map.on('click', onMapClick);

	// var popup = L.popup();

	// function onMapClick(e) {
	//     popup
	//         .setLatLng(e.latlng)
	//         .setContent("You clicked the map at " + e.latlng.toString())
	//         .openOn(map);
	// }


