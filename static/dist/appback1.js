var map, featureList, plantSearch = [], countySearch = [], transmissionsubstationSearch = [], secondarysubstationSearch = [], primarysubstationSearch =[];
$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});

if ( !("ontouchstart" in window) ) {
  $(document).on("mouseover", ".feature-row", function(e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
  });
}

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function() {
  map.fitBounds(markerClusters.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});


// $("#full-extent-btn").click(function() {
//   map.fitBounds(markerClusters1.getBounds());
//   $(".navbar-collapse.in").collapse("hide");
//   return false;
// });

// $("#full-extent-btn").click(function() {
//   map.fitBounds(markerClusters2.getBounds());
//   $(".navbar-collapse.in").collapse("hide");
//   return false;
// });

// $("#full-extent-btn").click(function() {
//   map.fitBounds(markerClusters3.getBounds());
//   $(".navbar-collapse.in").collapse("hide");
//   return false;
// });



$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  animateSidebar();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  animateSidebar();
  return false;
});

function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function() {
    map.invalidateSize();
  });
}

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}


/* Basemap Layers */
var cartoLight = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			 maxZoom: 19,
			 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			});
var OpenTopoMap = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
		maxZoom: 17,
		attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
		});
var WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');

/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10
};

var county = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "black",
      fill: false,
      opacity: 1,
      clickable: false
    };
  },
  onEachFeature: function (feature, layer) {
    countySearch.push({
      name: layer.feature.properties.name,
      source: "county",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
  }
});
$.getJSON("http://127.0.0.1:8000/county_data", function (data) {
  county.addData(data);
});


var elevenkvmvline = L.geoJson(null, {
  style: function (feature) {
      return {
        color: "red",
        weight: 3,
        opacity: 1
      };
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Primary Feeder</th><td>" + feature.properties.primaryfee + "</td></tr>" + "<tr><th>Primay Substation</th><td>" + feature.properties.primarysub + "</td></tr>" +"<tr><th>Line Voltage</th><td>" + feature.properties.linevoltag + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.primaryfee);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        elevenkvmvline.resetStyle(e.target);
      }
    });
  }
});
$.getJSON("http://127.0.0.1:8000/elevenkvmvlines_data", function (data) {
  elevenkvmvline.addData(data);
});

var thirtythreekvmvline = L.geoJson(null, {
  style: function (feature) {
      return {
        color: "blue",
        weight: 3,
        opacity: 1
      };
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Primary Feeder</th><td>" + feature.properties.primaryfee + "</td></tr>" + "<tr><th>Primay Substation</th><td>" + feature.properties.primarysub + "</td></tr>"+"<tr><th>Line Voltage</th><td>" + feature.properties.linevoltag + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.primaryfee);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        thirtythreekvmvline.resetStyle(e.target);
      }
    });
  }
});
$.getJSON("http://127.0.0.1:8000/thirtythreekvmvlines_data", function (data) {
 thirtythreekvmvline.addData(data);
});

var transmissionline = L.geoJson(null, {
  style: function (feature) {
      return {
        color: "orange",
        weight: 4,
        opacity: 1
      };
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Transmission Feeder</th><td>" + feature.properties.transfeede + "</td></tr>" + "<tr><th>Transmission Substation</th><td>" + feature.properties.transsubta + "</td></tr>"+"<tr><th>Line Voltage</th><td>" + feature.properties.linevoltag + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.transfee);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        transmissionline.resetStyle(e.target);
      }
    });
  }
});
$.getJSON("http://127.0.0.1:8000/transmissionlines_data", function (data) {
transmissionline.addData(data);
});



var markerClusters = new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 20
  });


var onEachFeature = function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.name + "</td></tr>" + "<tr><th>Capacity</th><td>" + feature.properties.capacity + "</td></tr>" +  "<table>";
      layer.on({
        click: function (e) {
          layer.bindPopup(content).openPopup(e.latlng);
          if (!L.Browser.ie && !L.Browser.opera) {
            map.fitBounds(layer.getLatLng());
          }
          // highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      // $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      plantSearch.push({
        name: layer.feature.properties.name,
        address: layer.feature.properties.capacity,
        source: "Plants",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
//var metersLayer = L.geoJson(null);
var dataUrl = '/generationplants_data/';
var plantLayer = L.geoJson(null);
var plantes = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "static/img/plants.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.name,
      riseOnHover: true
    });
  },
  onEachFeature: onEachFeature
});
$.getJSON(dataUrl, function (data) {
  plantes.addData(data);
  map.addLayer(plantLayer);
});


var markerClusters1 = new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 20
  });



var transmissionsubstations;
$.getJSON("http://127.0.0.1:8000/transmissionsubstations_data", function(data) {
   transmissionsubstations = L.geoJson(data, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "static/img/transub.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.name,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
     var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.name + "</td></tr>" + "<tr><th>Incomingfeeder</th><td>" + feature.properties.incomingfe + "</td></tr>" + "<tr><th>Outgoingfeeder</th><td>" + feature.properties.outgoingfe + "</td></tr>"+ "<tr><th>ownership</th><td>" + feature.properties.ownership + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          layer.bindPopup(content).openPopup(e.latlng);
          if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
          }
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      //$("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="static/img/transub.png"></td><td class="feature-name">' + layer.feature.properties.name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      transmissionsubstationSearch.push({
        name: layer.feature.properties.name,
        Incomingfeeder: layer.feature.properties.incomingfe,
        source: "transmissionsubstations",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[0.1],
        lng: layer.feature.geometry.coordinates[0.0]
      });
      layer.addTo(markerClusters1);
  }
  });
  // map.addLayer(markerClusters1);
});



var markerClusters2 = new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 20
  });



var primarysubstations;
$.getJSON("http://127.0.0.1:8000/primarysubstations_data", function(data) {
  primarysubstations = L.geoJson(data, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "static/img/prisub.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.primarysub,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
     var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>name</th><td>" + feature.properties.primarysub + "</td></tr>" + "<tr><th>incomingvo</th><td>" + feature.properties.incomingvo + "</td></tr>" + "<tr><th>outgoingvo</th><td>" + feature.properties.outgoingvo + "</td></tr>"+ "<tr><th>ownership</th><td>" + feature.properties.ownership + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          layer.bindPopup(content).openPopup(e.latlng);
          if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
          }
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      //$("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="static/img/transub.png"></td><td class="feature-name">' + layer.feature.properties.name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      primarysubstationSearch.push({
        name: layer.feature.properties.primarysub,
        incomingvo: layer.feature.properties.incomingvo,
        source: "primarysubstations",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[0.1],
        lng: layer.feature.geometry.coordinates[0.0]
      });
      layer.addTo(markerClusters2);
  }
  });
  // map.addLayer(markerClusters2);
});




var markerClusters3 = new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 20
  });

var secondarysubstations;
$.getJSON("http://127.0.0.1:8000/secondarysubstations_data", function(data) {
  secondarysubstations = L.geoJson(data, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "static/img/secsub.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.substation,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>name</th><td>" + feature.properties.substation + "</td></tr>" + "<tr><th>Primary Feeder</th><td>" + feature.properties.primaryfee + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          layer.bindPopup(content).openPopup(e.latlng);
          if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
          }
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
     secondarysubstationSearch.push({
        name: layer.feature.properties.substation,
        primaryfee: layer.feature.properties.primaryfee,
        source: "secondarysubstations",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[0.1],
        lng: layer.feature.geometry.coordinates[0.0]
      });
     layer.addTo(markerClusters3);
  }
  });
  // map.addLayer(markerClusters3);
});





map = L.map("map", {
  zoom: 9,
  center: [-0.4172,36.3614],
  layers: [osm, markerClusters],
  zoomControl: false,
  attributionControl: false
});



/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
 if (e.layer === plantLayer) {
    markerClusters.addLayer(plantes);
  } 

 if (e.layer === transmissionsubstations) {
    markerClusters1.addLayer(transmissionsubstations);
 }
 if (e.layer === primarysubstations) {
    markerClusters2.addLayer(primarysubstations);
 } 
 if (e.layer === secondarysubstations) {
    markerClusters3.addLayer(secondarysubstations);
  }

});

map.on("overlayremove", function(e) {
 if (e.layer === plantLayer) {
    markerClusters.removeLayer(plantes);
 }
 if (e.layer === transmissionsubstations) {
    markerClusters1.removeLayer(transmissionsubstations);
 }
 if (e.layer === primarysubstations) {
    markerClusters2.removeLayer(primarysubstations);
 }
 if (e.layer === secondarysubstations) {
    markerClusters3.removeLayer(secondarysubstations);
 } 

});

/* Filter sidebar feature list to only show features in current map bounds */
// map.on("moveend", function (e) {
//   syncSidebar();
// });

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});

/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Developed by <a href='#'>Innocensia Owuor</a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "topleft"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "topleft",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Street Map": cartoLight,
  "OSM": osm,
  "OpenTopoMap":OpenTopoMap,
  "WorldImagery": WorldImagery

};

var groupedOverlays = {
  "Generation Points": {
    "<img src='static/img/genplant2.png' width='24' height='28'>&nbsp;Generation Plant":plantLayer
     },
"Transmission Network": {
  "<img src='static/img/transub.png' width='24' height='28'>&nbsp;Transmission Substations":markerClusters1,
  "Transmission Line": transmissionline
   },

  "Distribution Network": {
  	"<img src='static/img/prisub.png' width='24' height='28'>&nbsp;Primary Substations" :markerClusters2,  
    "<img src='static/img/secsub.png' width='24' height='28'>&nbsp;Secondary Substations" :markerClusters3,  
    "11 Kilovolts Medium Voltage Line": elevenkvmvline,
    "33 Kilovolts Medium Voltage Line":thirtythreekvmvline   
  },
  "Administrative Boundary": {
    "Nakuru County Boundary": county
     },
};


var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Prevent hitting enter from refreshing the page */
$("#searchbox").keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
  }
});

$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  sizeLayerControl();
  /* Fit map to county bounds */
  map.fitBounds(county.getBounds());
  // featureList = new List("features", {valueNames: ["feature-name"]});
  // featureList.sort("feature-name", {order:"asc"});
  
  var countyBH = new Bloodhound({
    name: "county",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: countySearch,
    limit: 10
  });

    var plantesBH = new Bloodhound({
    name: "Plants",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: plantSearch,
    limit: 10
  });

 var transmissionsubstationsBH = new Bloodhound({
    name: "transmissionsubstations",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: transmissionsubstationSearch,
    limit: 10
  });

 var secondarysubstationsBH = new Bloodhound({
    name: "secondarysubstations",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: secondarysubstationSearch,
    limit: 10
  });

var primarysubstationsBH = new Bloodhound({
    name: "primarysubstations",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: primarysubstationSearch,
    limit: 10
  });

  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });
 
  countyBH.initialize(); 
  plantesBH.initialize(); 
  transmissionsubstationsBH.initialize();
  primarysubstationsBH.initialize();
  secondarysubstationsBH.initialize(); 
  geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 2,
    highlight: true,
    hint: true
  }, {
    name: "county",
    displayKey: "name",
    source: countyBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>county</h4>"
    }
  }, {  
  name: "Plants",
    displayKey: "name",
    source: plantesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='static/img/genplant2.png' width='24' height='28'>&nbsp;generationplants</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{capacity}}</small>"].join(""))
    }
  }, {
    name: "transmissionsubstations",
    displayKey: "name",
    source: transmissionsubstationsBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='static/img/transub.png' width='24' height='28'>&nbsp;transmissionsubstations</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{ownership}}</small>"].join(""))
    } 
  }, {
    name: "primarysubstations",
    displayKey: "name",
    source: primarysubstationsBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='static/img/prisub.png' width='24' height='28'>&nbsp;primarysubstations</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{incomingvo}}</small>"].join(""))
    }
  }, {
  	name: "secondarysubstations",
    displayKey: "name",
    source: secondarysubstationsBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='static/img/secsub.png' width='24' height='28'>&nbsp;secondarysubstations</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{primaryfee}}</small>"].join(""))
    }
  }, {

    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='static/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "county") {
      map.fitBounds(datum.bounds);
    }
    
    if (datum.source === "Plants") {
      if (!map.hasLayer(plantLayer)) {
        map.addLayer(plantLayer);
      }
      // map.setView(datum.getLatLng(), 17);
      map.setView([datum.lat, datum.lng], 17);
      onEachFeature(datum);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "transmissionsubstations") {
      if (!map.hasLayer(transmissionsubstations)) {
        map.addLayer(transmissionsubstations);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    } 
    if (datum.source === "secondarysubstations") {
      if (!map.hasLayer(secondarysubstations)) {
        map.addLayer(secondarysubstations);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "primarysubstations") {
      if (!map.hasLayer(primarysubstations)) {
        map.addLayer(primarysubstations);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});

// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}
