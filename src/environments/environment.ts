// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: '/wp-json/',
  mapStyle: [{
    "featureType": "road",
    "elementType": "labels",
    "stylers": [{
        "visibility": "simplified"
    }, {
        "lightness": 20
    }]
}, {
    "featureType": "administrative.land_parcel",
    "elementType": "all",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "landscape.man_made",
    "elementType": "all",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{
        "saturation": -100
    }, {
        "visibility": "on"
    }, {
        "lightness": 10
    }]
}, {
    "featureType": "road.local",
    "elementType": "all",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "road.local",
    "elementType": "all",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [{
        "visibility": "simplified"
    }]
}, {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [{
        "visibility": "on"
    }, {
        "lightness": 50
    }]
}, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [{
        "hue": "#a1cdfc"
    }, {
        "saturation": 30
    }, {
        "lightness": 49
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
        "hue": "#f49935"
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{
        "hue": "#fad959"
    }]
}, {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [{
        hue: '#dddbd7'
    }, {
        saturation: -92
    }, {
        lightness: 60
    }, {
        visibility: 'on'
    }]
}, {
    featureType: 'landscape.natural',
    elementType: 'all',
    stylers: [{
        hue: '#c8c6c3'
    }, {
        saturation: -71
    }, {
        lightness: -18
    }, {
        visibility: 'on'
    }]
}, {
    featureType: 'poi',
    elementType: 'all',
    stylers: [{
        hue: '#d9d5cd'
    }, {
        saturation: -70
    }, {
        lightness: 20
    }, {
        visibility: 'off'
    }]
}]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
