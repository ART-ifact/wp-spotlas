import { Renderer2,Component, OnInit, Inject } from '@angular/core';
import { OptionsService } from 'src/app/services/options.service';
import { DOCUMENT } from '@angular/common';
import { PubSubService } from 'angular7-pubsub';
import { Events } from 'src/app/classes/enum/events.enum';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
  public imageArray : string = '';
  public mapStyle = this.optionService.mapStyle;
  public locationObject = {
    latitude : 0,
    longitude: 0
  }
  private mapsListener;
  constructor(public optionService : OptionsService, private eventService : PubSubService) { }

  ngOnInit() {
  }

  loadAutocomplete() {

  }

  updateLocation(position) {
    this.locationObject.latitude = position.lat;
    this.locationObject.longitude = position.lng;
    console.log(this.locationObject)
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


}
