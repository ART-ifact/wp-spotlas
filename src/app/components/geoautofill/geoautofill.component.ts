import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { Events } from 'src/app/classes/enum/events.enum';
import { EventsService } from 'src/app/services/events.service';

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

  constructor(private eventService: EventsService, private element: ElementRef, private ngZone: NgZone) { }
  ngOnInit() {
    if ('google' in window) {
      this.initAutocomplete();
    } else {
      this.mapsListener = this.eventService.sub(Events.MAPSLOADED, () => {
        this.initAutocomplete();
      });
    }
    window.addEventListener('geoposition', (data: any) => {
      console.log(data);
      this.getLocation(data.detail);
    });
  }

  initAutocomplete() {
    const input = this.element.nativeElement.querySelectorAll('input')[0];
    this.autocomplete = new google.maps.places.SearchBox(input);
    this.autocomplete.addListener('places_changed', () => {
      console.log(event);
      const places = this.autocomplete.getPlaces();

      if (places.length == 0) {
        return;
      }

      // For each place, get the icon, name and location.
      places.forEach(function(place) {
        if (!place.geometry) {
          return;
        }

        const geoPosition = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
        console.log(geoPosition);
        const event = new CustomEvent('geoposition', { detail : geoPosition});
        window.dispatchEvent(event);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.mapsListener) {
      this.mapsListener.unsubscribe();
    }
  }

  getLocation(geoLocation) {
    this.position.emit(geoLocation);
  }

}
