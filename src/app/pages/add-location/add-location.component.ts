import { Renderer2,Component, OnInit, Inject } from '@angular/core';
import { OptionsService } from 'src/app/services/options.service';
import { DOCUMENT } from '@angular/common';
import { PubSubService } from 'angular7-pubsub';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
  public imageArray : string = '';
  public mapStyle = this.optionService.mapStyle;
  public locationObject = {
    "latitude" : '',
    "longitude": ''
  }

  constructor(public optionService : OptionsService) { }

  ngOnInit() {
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);

    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      console.log(places);
      if (places.length == 0) {
        return;
      }


      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }


        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
          console.log('Dresden',bounds.union(place.geometry.viewport),bounds.extend(place.geometry.location))
        } else {
          bounds.extend(place.geometry.location);
        }
      });
    });
  }

  setImageArray(imageArray) {
    console.log('event', JSON.stringify(imageArray))
    this.imageArray = JSON.stringify(imageArray);
  }

  parseInt(value) {
    return parseInt(value)
  }

  setPosition(position) {
    this.locationObject.latitude = position.coords.lat;
    this.locationObject.longitude = position.coords.lng;
  }

  autoCompleteCallback1(position) {
    console.log(position)
  }

}
