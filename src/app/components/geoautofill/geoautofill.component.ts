import { Component, OnInit } from '@angular/core';
import { PubSubService } from 'angular7-pubsub';
import { Events } from 'src/app/classes/enum/events.enum';

@Component({
  selector: 'app-geoautofill',
  templateUrl: './geoautofill.component.html',
  styleUrls: ['./geoautofill.component.scss']
})
export class GeoautofillComponent implements OnInit {
  private mapsListener;
  constructor(private eventService : PubSubService) { }

  ngOnInit() {
    if(window.google !== undefined) {
      this.initAutocomplete();

    } else {
      this.mapsListener = this.eventService.$sub(Events.MAPSLOADED,() => {
        this.initAutocomplete();
      })
    }
  }

  autoCompleteCallback1(position) {
    console.log(position)
  }

  initAutocomplete() {
    var input = document.getElementById('autocomplete-input');
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

  ngOnDestroy(): void {
    this.mapsListener.unsubscribe();
  }

}
