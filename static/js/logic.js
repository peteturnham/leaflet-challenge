


//initial map 
var map = L.map("mapid", {
    center: [37.09, -95.71],
    zoom: 5
  });

// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});


// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);



// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  var limits = ['-10-10', '10-10', '30-50', '50-70', '70-90', '90+'];
  var colors = ["green", 'yellowgreen', 'gold', 'orange', 'salmon', 'red'];
  var labels = [];

  var legendInfo = "<h1>Earthquake Legend Key</h1>" +
  "<div> color scale = depth of earthquake";
    div.innerHTML = legendInfo;
    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });
    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  return div;
};
// Add the info legend to the map
info.addTo(map);

//------------------------------------------------------------------------------------------------------
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

d3.json(url).then(function(data) {

  
  for (var i = 0; i < data.features.length; i++) {
      // array of objects
      var feature = data.features[i];
      var mag = [feature.properties.mag]
      var depth = [feature.geometry.coordinates[2]]
      console.log(mag);

              // conditional for depth 
              var color = "";
              if (depth > -10 && depth < 10) {
                  color =  "green"; 
              } 
              else if (depth >= 10 && depth < 30) {
                  color =  "yellowgreen";
              } 
              else if (depth >= 30 && depth < 50) {
                  color = "gold";
              } 
              else if (depth >= 50 && depth < 70) {
                  color = "orange";
              }
              else if (depth >= 70 && depth < 90) {
                  color = "salmon";
              }
              else {
                  color = "red";
              }
              L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
                Opacity: 0.5,
                fillOpacity: 0.75,
                radius: mag * 2500,
                color: color,
                fillColor: color
            }).bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>").addTo(map);
          }})



