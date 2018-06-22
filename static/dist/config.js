var config = {
	"title": "Bootleaf template map",
	"start": {
		// "maxZoom": 16,
		"center": [38.203,-99.799],
		"zoom": 4,
		"attributionControl": false,
		"zoomControl": false
	},
	"about": {
		"title": "Bootleaf application template",
		"contents": "<p>This is an open-source version of the excellent <a href='https://github.com/bmcbride/bootleaf'>Bootleaf map </a>started by Bryan McBride.</p><p>It's designed for rapid web map development. See <a href='https://github.com/iag-geo/bootleaf'>https://github.com/iag-geo/bootleaf</a> for more information.</p><p>Chage this message in the config file</p>"
	},
	"controls": {
		"zoom": {
			"position": "topleft"
		},
		"leafletGeocoder": {
			//https://github.com/perliedman/leaflet-control-geocoder
			"collapsed": false,
			"position": "topleft",
			"placeholder": "Search for a location",
			"type": "Google", // OpenStreetMap, Google, ArcGIS
			//"suffix": "Australia" // optional keyword to append to every search
		},
		"TOC": {
			//http://leafletjs.com/reference-1.0.2.html#control-layers-option
			"collapsed": false,
			"uncategorisedLabel": "Layers",
			"position": "topright",
			"toggleAll": true
		},
		"history": {
			"position": "bottomleft"
		},
		"bookmarks": {
			"position": "bottomright",
			"places": [
				{
				"latlng": [
					22.245598601926222,
					114.17609095573425
				],
				"zoom": 5,
				"name": "Ocean Park",
				"id": "a148fa354ba3",
				"editable": true,
				"removable": true
				}
			]
		}
	},
	// "activeTool": "identify", // options are identify/coordinates/queryWidget
	"basemaps": ['esriGray', 'esriDarkGray', 'esriStreets', 'OpenStreetMap'],
	"bing_key": "enter your Bing Maps key",
	"mapboxKey": "enter your MapBox key",
	// "defaultIcon": {
	// 	"imagePath": "http://leafletjs.com/examples/custom-icons/",
	// 	"iconUrl": "leaf-green.png",
	// 	"shadowUrl": "leaf-shadow.png",
	// 	"iconSize":     [38, 95],
	// 		"shadowSize":   [50, 64],
	// 		"iconAnchor":   [22, 94],
	// 		"shadowAnchor": [4, 62],
	// 		"popupAnchor":  [-3, -76]
	// },
	"tocCategories": [
		{
			"name": "GeoJSON layers",
			"layers": ["generationplant", "transmissionsubstation" "elevenkvmvline" "county"]
		},

		
	],
	"projections": [
		{4326: '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs '}
	],
	"highlightStyle": {
		"weight": 2,
		"opacity": 1,
		"color": 'white',
		"dashArray": '3',
		"fillOpacity": 0.5,
		"fillColor": '#E31A1C',
		"stroke": true
	},
	"layers": [
	{
    "id": "generationplants",
    "name": "Generationplants",
    "type": "geoJSON",
    "cluster": true,
    "showCoverageOnHover": false,
    "minZoom": 12,
    "url": "http://127.0.0.1:8000/generationplants_data",
    "icon": {
        "iconUrl": "static/img/genplant2.png",
        "iconSize": [24,28]
    },
    "style": {
    "stroke": true,
    "fillColor": "#00FFFF",
    "fillOpacity": 0.5,
    "radius": 10,
    "weight": 0.5,
    "opacity": 1,
    "color": '#727272',
    },
	  "visible": false,
	  "label": {
	  	"name": "NAME",
	  	"minZoom": 14
	  }
	},
	{
    "id": "transmissionsubstation",
    "type": "geoJSON",
    "cluster": true,
    "showCoverageOnHover": false,
    "minZoom": 12,
    "url": "http://127.0.0.1:8000/transmissionsubstations_data",
    "style": {
        "stroke": true,
        "fillColor": "#00FFFF",
        "fillOpacity": 0.5,
        "radius": 10,
        "weight": 0.5,
        "opacity": 1,
        "color": '#727272'
		  },
		  "icon": {
		      "iconUrl": "static/img/transub2.png",
		      "iconSize": [24,28]
		  },
		  "visible": false,
		  "label": {
		  	"name": "NAME",
		  	"minZoom": 14
		  "queryWidget": {
				"queries" : [
					{"name": "name", "alias": "transmission substation", "defaultOperator": "starts with", "defaultQuery": "A"},
					
				],
				"outFields": [
					{"name": "transmission substation", "alias": "name"},
					{"name": "HEIGHT", hidden: true},
					{"name": "DIAMETER", "hidden": true}
				]
			},
			"style": {
				"stroke": true,
		    "fillColor": "#00FFFF",
		    "fillOpacity": 0.5,
		    "radius": 10,
		    "weight": 0.5,
		    "opacity": 1,
		    "color": '#727272'
		  },
			"minZoom": 7
		},
			
		{
			"id": "elevenkvmvlines",
			"name": "Eleven KV MV line",
			"type": "geoJSON",
			"url": "http://127.0.0.1:8000/elevenkvmvlines_data",
			"visible": false,
			"useCors": false,
			"popup": true,
			"fields": ["primaryfee","primarysub","linevoltag"],
			"style": {
				"stroke": true,
		    "radius": 10,
		    "weight": 2,
		    "opacity": 1,
		    "color": "red"
		  },
			"queryWidget": {
				"queries" : [
					{"Primary Feeder": "primaryfee", "alias": "Name"}
				],
				"outFields": [
					{"name": "primaryfee", "alias": "Name"},
					{"name": "primarysub", "alias": "PrimarySubstation"}
				],
				"maxAllowableOffset": 10
			}
		},
		{
			"id": "county",
			"name": "County",
			"type": "geoJSON",
			"url": "http://127.0.0.1:8000/county_data",
			"layers": [3],
			"format": 'png24',
			"transparent": true,
			//"layerDefs": {3:"POP2000 > 1000000"},
			"useCors": false,
			"visible": false,
			"identify": {
				"layerLabel": "County",
				"layerName": "County",
				"primaryField": "name",
				"outFields": [
					{"name": "name", "alias": "name"},
				
				],
				"maxAllowableOffset": 0.001
			},
			"queryWidget": {
				"queries" : [
					{"name": "name", "alias": "County name"},
					{"name": "STATE_NAME", "alias": "State name"},
					{"name": "POP2000", "alias": "Population", "type": "numeric"}
				],
				"outFields": [
					{"name": "name", "alias": "County name"},
					
				],
				"layerIndex": 3,
				"maxAllowableOffset": 0.001
			}
		},
	]	
		
