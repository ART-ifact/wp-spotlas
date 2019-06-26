import { Renderer2,Component, OnInit, Inject } from '@angular/core';
import { OptionsService } from 'src/app/services/options.service';
import { DOCUMENT } from '@angular/common';
import { PubSubService } from 'angular7-pubsub';
import { Events } from 'src/app/classes/enum/events.enum';
import { LocationService } from 'src/app/services/location.service';
import { LocationItem } from 'src/app/classes/location';

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
  public categories : any[] = [
    {value: 'building', viewValue: 'Gebäude'},
    {value: 'landscape', viewValue: 'Landschaft'},
    {value: 'urban', viewValue: 'Urban'},
    {value: 'water', viewValue: 'Wasser'}
  ];
  public tags : any[] = [
    {value: 'building', viewValue: 'industriell'},
    {value: 'landscape', viewValue: 'historisch'},
    {value: 'urban', viewValue: 'panorama'},
    {value: 'water', viewValue: 'Sonnenaufgang'},
    {value: 'water', viewValue: 'Sonnenuntergang'},
    {value: 'water', viewValue: 'Outdoor'},
    {value: 'water', viewValue: 'Architektur'},
    {value: 'water', viewValue: 'Sehenswürdigkeit'}
  ];
  private mapsListener;
  private locationArray = {
    shared: false,
    hash: '',
    title: '',
    note: '',
    properties: {
      accesibility : 1,
      category: '',
      adress: '',
      type: '',
      wheater: {
        cloudy: false,
        foggy: false,
        rainy: false,
        sunny: false
      },
      seasons: {
        autumn: false,
        spring: false,
        summer: false,
        winter: false
      },
      images: ''
    },
    geoLocation: {
      lat: 0,
      lng: 0
    }
  };
  constructor(public optionService : OptionsService, private eventService : PubSubService, private location : LocationService) { }

  ngOnInit() {
  }

  getCurrentLocation() {
    this.location.getPosition().then(pos => {
      this.updateLocation(pos);
    })
  }


  updateLocation(position) {
    this.locationObject.latitude = position.lat;
    this.locationObject.longitude = position.lng;
    console.log(this.locationObject)
  }

  setImageArray(imageArray) {
    console.log('event', JSON.stringify(imageArray))
    this.imageArray = JSON.stringify(imageArray);
    this.locationArray.properties.images = this.imageArray;
  }

  parseInt(value) {
    return parseInt(value)
  }

  setPosition(position) {
    this.locationObject.latitude = position.coords.lat;
    this.locationObject.longitude = position.coords.lng;
    this.locationArray.geoLocation.lat = this.locationObject.latitude;
    this.locationArray.geoLocation.lng = this.locationObject.longitude;
  }

  setTitle(title) {
    this.locationArray.title = title.target.value
  }

  setNote(note) {
    this.locationArray.note = note.target.value
  }

  setAccessibility(access) {
    console.log(access)
    this.locationArray.properties.accesibility = access.target.value;
  }

  setCategory(category) {
    console.log(category)
    this.locationArray.properties.category = category.target.value;
  }

  setTags(tags) {
    console.log(tags)
    this.locationArray.properties.type = tags.target.value;
  }

  setWeatherSunny(value) {
    console.log(value)
    this.locationArray.properties.wheater.sunny = value.target.value;
  }

  setWeatherCloudy(value) {
    console.log(value)
    this.locationArray.properties.wheater.cloudy = value.target.value;
  }
  setWeatherRainy(value) {
    console.log(value)
    this.locationArray.properties.wheater.rainy = value.target.value;
  }
  setWeatherFoggy(value) {
    console.log(value)
    this.locationArray.properties.wheater.foggy = value.target.value;
  }

  setSeasonSpring(value) {
    console.log(value)
    this.locationArray.properties.seasons.spring = value.target.value;
  }

  setSeasonSummer(value) {
    console.log(value)
    this.locationArray.properties.seasons.summer = value.target.value;
  }

  setSeasonAutumn(value) {
    console.log(value)
    this.locationArray.properties.seasons.autumn = value.target.value;
  }

  setSeasonWinter(value) {
    console.log(value)
    this.locationArray.properties.seasons.winter = value.target.value;
  }

    saveLocation() {
      console.log(this.locationArray)
    }

}
