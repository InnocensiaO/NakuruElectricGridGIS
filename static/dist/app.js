var map, featureList, countySearch = [], generationplantSearch = [], transmissionsubstationSearch = [],  primarysubstationSearch =[], secondarysubstationSearch = [], thirtythreekvmvlineSearch =[], elevenkvmvlineSearch = [], transmissionlineSearch = [];

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
  map.fitBounds(county.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

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

$('.foobar').click(function(){
    window.print();
});

/* Basemap Layers */
var cartoLight = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});
var usgsImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');

var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       maxZoom: 19,
       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
var OpenTopoMap = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });


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

//Lines

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

   elevenkvmvlineSearch.push({
      name: layer.feature.properties.primaryfee,
      source: "Elevenkvmvlines",
      id: L.stamp(layer),
      bounds: layer.getBounds()
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
      thirtythreekvmvlineSearch.push({
      name: layer.feature.properties.primaryfee,
      source: "Thirtythreekvmvlines",
      id: L.stamp(layer),
      bounds: layer.getBounds()
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
    transmissionlineSearch.push({
      name: layer.feature.properties.transfeede,
      source: "Transmissionlines",
      id: L.stamp(layer),
      bounds: layer.getBounds()
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

/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});

/* Empty layer placeholder to add to layer control for listening when to add/remove generationplants to markerClusters layer */
var generationplantLayer = L.geoJson(null);
var generationplants = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "static/img/genplant2.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.name,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.name + "</td></tr>" + "<tr><th>Capacity</th><td>" + feature.properties.capacity + "</td></tr>" +  "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.name);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="static/img/genplant2.png"></td><td class="feature-name">' + layer.feature.properties.name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      generationplantSearch.push({
        name: layer.feature.properties.name,
        capacity: layer.feature.properties.capacity,
        source: "Generationplants",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("http://127.0.0.1:8000/generationplants_data", function (data) {
  generationplants.addData(data);
  map.addLayer(generationplantLayer);
});

/* Empty layer placeholder to add to layer control for listening when to add/remove transmissionsubstations to markerClusters layer */
var transmissionsubstationLayer = L.geoJson(null);
var transmissionsubstations = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "static/img/transub2.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.name,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.name + "</td></tr>" + "<tr><th>Incomingfeeder</th><td>" + feature.properties.incomingfe + "</td></tr>" + "<tr><th>Outgoingfeeder</th><td>" + feature.properties.outgoingfe + "</td></tr>"+ "<tr><th>ownership</th><td>" + feature.properties.ownership + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.name);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="static/img/transub2.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      transmissionsubstationSearch.push({
        name: layer.feature.properties.name,
        incomingfeeder: layer.feature.properties.incomingfe,
        source: "Transmissionsubstations",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("http://127.0.0.1:8000/transmissionsubstations_data", function (data) {
  transmissionsubstations.addData(data);
});

var primarysubstationLayer = L.geoJson(null);
var primarysubstations = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "static/img/prisub2.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.primarysub,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
     var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>name</th><td>" + feature.properties.primarysub + "</td></tr>" + "<tr><th>incomingvo</th><td>" + feature.properties.incomingvo + "</td></tr>" + "<tr><th>outgoingvo</th><td>" + feature.properties.outgoingvo + "</td></tr>"+ "<tr><th>ownership</th><td>" + feature.properties.ownership + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.primarysub);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="static/img/prisub2.png"></td><td class="feature-name">' + layer.feature.properties.primarysub + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      primarysubstationSearch.push({
        name: layer.feature.properties.primarysub,
        incomingvo: layer.feature.properties.incomingvo,
        source: "Primarysubstations",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("http://127.0.0.1:8000/primarysubstations_data", function (data) {
  primarysubstations.addData(data);
  map.addLayer(primarysubstationLayer);
});

var secondarysubstationLayer = L.geoJson(null);
var secondarysubstations = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "static/img/secsub2.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.substation,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>name</th><td>" + feature.properties.substation + "</td></tr>" + "<tr><th>Primary Feeder</th><td>" + feature.properties.primaryfee + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.substation);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="static/img/genplant2.png"></td><td class="feature-name">' + layer.feature.properties.name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      secondarysubstationSearch.push({
        name: layer.feature.properties.substation,
        primaryfee: layer.feature.properties.primaryfee,
        source: "Secondarysubstations",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("http://127.0.0.1:8000/secondarysubstations_data", function (data) {
  secondarysubstations.addData(data);
  map.addLayer(secondarysubstationLayer);
});


map = L.map("map", {
  zoom: 9,
  center: [-0.4172,36.3614],
  layers: [osm, county, markerClusters, highlight],
  zoomControl: false,
  attributionControl: false
});

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
  if (e.layer === generationplantLayer) {
    markerClusters.addLayer(generationplants);
    
  }
  if (e.layer === transmissionsubstationLayer) {
    markerClusters.addLayer(transmissionsubstations);
  
  }

  if (e.layer === primarysubstationLayer) {
    markerClusters.addLayer(primarysubstations);
    
  } 

  if (e.layer === secondarysubstationLayer) {
    markerClusters.addLayer(secondarysubstations);
    
  } 
});

map.on("overlayremove", function(e) {
  if (e.layer === generationplantLayer) {
    markerClusters.removeLayer(generationplants);
  
  }
  if (e.layer === transmissionsubstationLayer) {
    markerClusters.removeLayer(transmissionsubstations);
  
  }
  if (e.layer === primarysubstationLayer) {
    markerClusters.removeLayer(primarysubstations);
    
  } 

  if (e.layer === secondarysubstationLayer) {
    markerClusters.removeLayer(secondarysubstations);
    
  } 

});


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
  position: "bottomleft"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomleft",
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


//geocoder
var osmGeocoder = new L.Control.OSMGeocoder();
map.addControl(osmGeocoder);

//mouseposition
var mousePosition = new L.control.mousePosition();
map.addControl(mousePosition);

//navbar
var navbar = new L.control.navbar({position: 'topleft'});
map.addControl(navbar);

//scale

var scale = new L.control.scale({position: 'bottomleft'});
map.addControl(scale);

//measure

var measureControl = new L.Control.Measure({
            primaryLengthUnit: 'meters',
            secondaryLengthUnit: 'kilometers',
            primaryAreaUnit: 'sqmeters',
            secondaryAreaUnit: 'hectares'
        });
measureControl.addTo(map);

///// Add the draw feature to the map
    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    ///// config draw feature
    var drawControl = new L.Control.Draw({
      position: 'topleft',
      draw: {
        polygon: {
          shapeOptions: {color: 'purple'},
          allowIntersection: false,
          drawError: {color: 'orange',timeout: 1000},
          showArea: true,
          metric: false,
          repeatMode: true
        },
        polyline: {
          shapeOptions: {color: 'green'},
        },
        rect: {
          shapeOptions: {color: 'green'},
        },
        circle: {
          shapeOptions: {color: 'steelblue'},
        },
        marker: true
        },
            edit: {
              featureGroup: drawnItems,
              remove: true
          }
        });
    map.addControl(drawControl);
    map.on('draw:created', function (e) {
      var type = e.layerType,
        layer = e.layer;
      drawnItems.addLayer(layer);
    });

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "OpenStreetMap":osm,
  "CartoDB maps": cartoLight,
  "Aerial Imagery": usgsImagery,
  "OpenTopoMap": OpenTopoMap

};

var groupedOverlays = {
   "Generation Points": {
    "<img src='static/img/genplant2.png' width='24' height='28'>&nbsp;Generation Plants": generationplantLayer
  },
"Transmission Network": {
  "<img src='static/img/transub2.png' width='24' height='28'>&nbsp;Transmission Substations":transmissionsubstationLayer,
  "Transmission Line": transmissionline
   },
   
  "Distribution Network": {
    "<img src='static/img/prisub2.png' width='24' height='28'>&nbsp;Primary Substations" :primarysubstationLayer,
    "<img src='static/img/secsub2.png' width='24' height='28'>&nbsp;Secondary Substations" :secondarysubstationLayer,
    "11 Kilovolts Medium Voltage Line": elevenkvmvline,
    "33 Kilovolts Medium Voltage Line":thirtythreekvmvline  
  },
  "Administrative Boundary": {
     "County Boundary": county
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
  

  var countyBH = new Bloodhound({
    name: "county",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: countySearch,
    limit: 10
  });

  var elevenkvmvlineBH = new Bloodhound({
    name: "Elevenkvmvlines",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: elevenkvmvlineSearch,
    limit: 10
  });


  var thirtythreekvmvlineBH = new Bloodhound({
    name: "Thirtythreekvmvlines",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: thirtythreekvmvlineSearch,
    limit: 10
  });

  var transmissionlineBH = new Bloodhound({
    name: "Transmissionlines",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: transmissionlineSearch,
    limit: 10
  });
  

  var generationplantsBH = new Bloodhound({
    name: "Generationplants",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: generationplantSearch,
    limit: 10
  });

  var transmissionsubstationsBH = new Bloodhound({
    name: "Transmissionsubstations",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: transmissionsubstationSearch,
    limit: 10
  });
  
  var primarysubstationsBH = new Bloodhound({
    name: "Primarysubstations",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: primarysubstationSearch,
    limit: 10
  });


  var secondarysubstationsBH = new Bloodhound({
    name: "Secondarysubstations",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: secondarysubstationSearch,
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
  elevenkvmvlineBH.initialize();
  thirtythreekvmvlineBH.initialize();
  transmissionlineBH.initialize();
  generationplantsBH.initialize();
  transmissionsubstationsBH.initialize();
  primarysubstationsBH.initialize();
  secondarysubstationsBH.initialize();
   geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "county",
    displayKey: "name",
    source: countyBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>county</h4>"
    }
  }, {
 
   name: "Elevenkvmvlines",
    displayKey: "name",
    source: elevenkvmvlineBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Elevenkvmvlines</h4>"
    }
  }, {
    name: "Thirtythreekvmvlines",
    displayKey: "name",
    source: thirtythreekvmvlineBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Thirtythreekvmvlines</h4>"
    }
  }, {

    name: "Transmissionlines",
    displayKey: "name",
    source: transmissionlineBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Transmissionlines</h4>"
    }
  }, {

    name: "Generationplants",
    displayKey: "name",
    source: generationplantsBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='static/img/genplant2.png' width='24' height='28'>&nbsp;Generationplants</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{capacity}}</small>"].join(""))
    }
  }, {
    name: "Transmissionsubstations",
    displayKey: "name",
    source: transmissionsubstationsBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='static/img/transub2.png' width='24' height='28'>&nbsp;Transmissionsubstations</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{incomingfe}}</small>"].join(""))
    }
  }, {

    name: "Primarysubstations",
    displayKey: "name",
    source: primarysubstationsBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='static/img/prisub2.png' width='24' height='28'>&nbsp;Primarysubstations</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{incomingvo}}</small>"].join(""))
    }
  }, {

    name: "Secondarysubstations",
    displayKey: "name",
    source: secondarysubstationsBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='static/img/secsub2.png' width='24' height='28'>&nbsp;Secondarysubstations</h4>",
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
    if (datum.source === "Elevenkvmvlines") {
      map.fitBounds(datum.bounds);
    }
   if (datum.source === "Thirtythreekvmvlines") {
      map.fitBounds(datum.bounds);
    }

    if (datum.source === "Transmissionlines") {
      map.fitBounds(datum.bounds);
    }
    if (datum.source === "Generationplants") {
      if (!map.hasLayer(generationplantLayer)) {
        map.addLayer(generationplantLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Transmissionsubstations") {
      if (!map.hasLayer(transmissionsubstationLayer)) {
        map.addLayer(transmissionsubstationLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Primarysubstations") {
      if (!map.hasLayer(primarysubstationLayer)) {
        map.addLayer(primarysubstationLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Secondarysubstations") {
      if (!map.hasLayer(secondarysubstationLayer)) {
        map.addLayer(secondarysubstationLayer);
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
    $(".navbar-collapse.in").cscos("max-height", $(document).height() - $(".navbar-header").height());
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
