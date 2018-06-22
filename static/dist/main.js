// TODO
// - request API key for OSM
// - add contributors : map icons, Fuse.js
// - use sprites for icons
// - icon is reloaded when making a layer visible again
// - layers control : add All on/off toggle ?
// - improve Fuse.js to consider accents ...

var categories = {
    101 : {desc: "elevenkvmvlinedatasets"},
    103 : {desc: "generationplantdatasets"},
    104 : {desc: "primarysubdatasets"},
    105 : {desc: "secondarysubdatasets"},
    106 : {desc: "transmissionsubdatasets"},
    107 : {desc: "thirtythreekvlinedatasets"},
    108 : {desc: "transmissionlinedatasets"}
};

    // Add fuse search control
    var options = {
        position: 'topright',
        title: 'Search',
        placeholder: ' Generation Plant',
        maxResultLength: 15,
        threshold: 0.5,
        showInvisibleFeatures: true,
        showResultFct: function(feature, container) {
            props = feature.properties;
            var name = L.DomUtil.create('b', null, container);
            name.innerHTML = props.name;

            container.appendChild(L.DomUtil.create('p', null, container));

            var info = '' +  props.name + ', ' + props.capacity;
        container.appendChild(document.createTextNode(info));            
    }
            
    };
    var fuseSearchCtrl = L.control.fuseSearch(options);
    map.addControl(fuseSearchCtrl);

    layerCtrl.addTo(map);

    
 