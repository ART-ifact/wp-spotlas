import { Renderer2,Component, OnInit, Inject } from '@angular/core';
import { OptionsService } from 'src/app/services/options.service';
import { Location } from '@angular/common';
import { LocationService } from 'src/app/services/location.service';
import { LocationItem } from 'src/app/classes/location';
import { LocationsService } from 'src/app/services/locations.service';
import { Router } from '@angular/router';
import { Helper } from 'src/app/helper/helper';
import { LanguageService } from 'src/app/services/language-service.service';

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
  private locationArray = Helper.getLocationArray();
  constructor(
    private _location: Location,
    private router: Router,
    public optionService : OptionsService,
    private location : LocationService,
    private locationsService : LocationsService,
    public language : LanguageService
  ) { }

  ngOnInit() {
  }

  goBack() {
    this._location.back()
  }

  getCurrentLocation() {
    this.location.getPosition().then(pos => {
      this.updateLocation(pos);
    })
  }


  updateLocation(position) {
    this.locationObject.latitude = position.lat;
    this.locationObject.longitude = position.lng;
    this.locationArray.geoLocation.lat = this.locationObject.latitude;
    this.locationArray.geoLocation.lng = this.locationObject.longitude;
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
    console.log(title)
    this.locationArray.title = title.target.value
  }

  setNote(note) {
    console.log(note)
    this.locationArray.note = note.target.value
  }

  setAccessibility(value) {
    console.log(value.value)
    this.locationArray.properties.accesibility = value.value;
  }

  setCategory(category) {
    console.log(category)
    this.locationArray.properties.category = category.value;
  }

  setTags(tags) {
    console.log(tags)
    this.locationArray.properties.type = tags.value;
  }

  setWeatherSunny(value) {
    console.log(value)
    this.locationArray.properties.wheater.sunny = value.value;
  }

  setWeatherCloudy(value) {
    console.log(value)
    this.locationArray.properties.wheater.cloudy = value.value;
  }
  setWeatherRainy(value) {
    console.log(value)
    this.locationArray.properties.wheater.rainy = value.value;
  }
  setWeatherFoggy(value) {
    console.log(value)
    this.locationArray.properties.wheater.foggy = value.value;
  }

  setSeasonSpring(value) {
    console.log(value)
    this.locationArray.properties.seasons.spring = value.value;
  }

  setSeasonSummer(value) {
    console.log(value)
    this.locationArray.properties.seasons.summer = value.value;
  }

  setSeasonAutumn(value) {
    console.log(value)
    this.locationArray.properties.seasons.autumn = value.value;
  }

  setSeasonWinter(value) {
    console.log(value)
    this.locationArray.properties.seasons.winter = value.target.value;
  }

    saveLocation() {
      console.log(this.locationArray)
      this.locationsService.saveLocation(this.locationArray).subscribe(res => {
        console.log(res)
        this.router.navigate(['location/' + res])
      })
    }

}
