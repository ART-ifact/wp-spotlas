import { Component, OnInit, ElementRef, EventEmitter, Output, ChangeDetectorRef, NgZone, ViewChild } from '@angular/core';
import { PubSubService } from 'angular7-pubsub';
import { Events } from 'src/app/classes/enum/events.enum';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-geoautofill',
  templateUrl: './geoautofill.component.html',
  styleUrls: ['./geoautofill.component.scss']
})
export class GeoautofillComponent implements OnInit {
  private mapsListener;
  public latitude: number;
  public longitude: number;
  public autocomplete;
  @Output() position = new EventEmitter();

  constructor(private eventService : PubSubService, private element: ElementRef, private ngZone: NgZone) { }
  ngOnInit() {
    if('google' in window) {
      this.initAutocomplete();
    } else {
      this.mapsListener = this.eventService.$sub(Events.MAPSLOADED,() => {
        this.initAutocomplete();
      })
    }
    window.addEventListener('geoposition', (data : any) => {
      console.log(data)
      this.getLocation(data.detail)
    })
  }

  initAutocomplete() {
    let input = this.element.nativeElement.querySelectorAll('input')[0];
    this.autocomplete = new google.maps.places.SearchBox(input)
    this.autocomplete.addListener("places_changed", () => {
      console.log(event)
      let places = this.autocomplete.getPlaces();

      if (places.length == 0) {
        return;
      }

      // For each place, get the icon, name and location.
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }

        let geoPosition = {"lat": place.geometry.location.lat(), "lng": place.geometry.location.lng()};
        console.log(geoPosition)
        var event = new CustomEvent('geoposition', { detail : geoPosition});
        window.dispatchEvent(event)
      });
    });
  }

  ngOnDestroy(): void {
    if(this.mapsListener) {
      this.mapsListener.unsubscribe();
    }
  }

  getLocation(geoLocation) {
    this.position.emit(geoLocation)
  }

}
