var _map;
var _group;
var _userLocation;

$(document).ready(function(){

	var url = location.pathname.substring(location.pathname.lastIndexOf('/')+1);
	if (url == 'map') {
		LoadMapPage();
	}

});

	function LoadMapPage(){
		InitLocation();
	}

	function searchfoursquare(){

		_group.clearLayers();

		var query = $('#maptext').val();

		var url = 'https://api.foursquare.com/v2/venues/search?';
		url += 'll=' + _userLocation[0] + ',' + _userLocation[1];
		url += '&radius=10000';
		url += '&intent=browse';
		url += '&query=' + query;
		url += '&client_id=5H3DCCHXFK2FXO5EVDA4RH4APOOKAOR5IP4JLDG4VAZNIDOM';
		url += '&client_secret=GB1VDJYA0TB2QTPBK4RWIV0LTRSW1N5KIKFX2ZSYWEZY2ZAG';
		url += '&v=20130815';

		$.getJSON(url, {}, function (data) {
		// notice that the data can be accessed like a multi-dimensional array
		list = data['response']['venues'];
		for (var i = 0; i < list.length; i++) {
			var venue = list[i];

			// create the icon for the map
			var id = venue['id'];
			var lat = venue['location']['lat'];
			var lng = venue['location']['lng'];

			if (venue['categories'].length === 0)
				continue;

			var category = venue['categories'][0];
			var path = category['icon'].prefix + "32" + category['icon'].suffix;
			var newIcon = CreateIcon(path, '');

			var marker = AddMapMarker(id, lat, lng, path, newIcon);

			// create a popup with some basic info about the venue
			var name = venue['name'];
			var html = '<h2>' + name + '</h2>';

			if (typeof venue['contact']['phone'] != "undefined") {
				html += '<div class="item"><a href="tel:' + venue['contact']['phone'] + '">' + venue['contact']['formattedPhone'] + '</a></div>';
			}

			html += '<div class="item">Type: ' + category['shortName'] + '</div>';
			// who wants to help add a link to the menu?

			// html += SetupTwilioText(id, name);

			// marker.bindPopup(html);

			_group.addLayer(marker);
		}

		// SetupTwilioEvents();

		});
	}

	function InitLocation(){
		_map = L.map('map');
		_group = new L.LayerGroup();
		_map.addLayer(_group);

		L.tileLayer('http://{s}.tiles.mapbox.com/v3/dacur.i9gb8ifk/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18
		}).addTo(_map);

		var gl = navigator.geolocation;

		gl.getCurrentPosition(geoSuccess, geoError);

		$('#maptext').keypress(function(e){
			if (e.keyCode == 13){
				searchfoursquare();
			}
		});

	}

	function geoSuccess(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;

		_userLocation = [latitude, longitude];
		_map.setView(_userLocation, 16);

		L.marker(_userLocation).addTo(_map); //changed from .addTo(_group)

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

	//*******NEW CODE BELOW*******

	function AddMapMarker(id, lat, lng, path, icon) {
	var latLng = new L.LatLng(lat, lng);
	var marker = new L.Marker(latLng, { icon: icon });

	_group.addLayer(marker);

	return marker;
	}

	function CreateIcon(iconPath, className) {
		var icon = L.icon({
			iconUrl: iconPath,
			shadowUrl: null,
			iconSize: new L.Point(44, 55),
			//iconAnchor: new L.Point(16, 41),
			popupAnchor: new L.Point(0, -31),
			className: className
		});

		return icon;
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


