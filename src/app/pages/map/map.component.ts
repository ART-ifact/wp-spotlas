import { Component, OnInit } from '@angular/core';
import { OptionsService } from 'src/app/services/options.service';
import { LocationsService } from 'src/app/services/locations.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public clusterstyle = {
    url: "/assets/img/marker.svg",
        height: 50,
        width: 50,
        anchor: [-14, 0],
        textColor: '#bd0b1d',
        textSize: 11,
        backgroundPosition: "center center"
  }
  public mapStyle = [{
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
}];

  constructor(public optionService : OptionsService, public locationsService : LocationsService) { }

  ngOnInit() {
  }

}
