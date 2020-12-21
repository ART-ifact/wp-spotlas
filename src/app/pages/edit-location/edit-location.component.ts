import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationsService } from 'src/app/services/locations.service';
import { OptionsService } from 'src/app/services/options.service';
import { LocationService } from 'src/app/services/location.service';
import { Helper } from 'src/app/helper/helper';
import { Location } from '@angular/common';
import { LanguageService } from 'src/app/services/language-service.service';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss']
})
export class EditLocationComponent implements OnInit {
  public location;
  public id;
  public sharedURL = '';
  public mapStyle = this.optionService.mapStyle;
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

  constructor(
    private route : ActivatedRoute,
    private locationService: LocationService,
    public optionService : OptionsService,
    private locationsService : LocationsService,
    private router : Router,
    private _location : Location,
    public language : LanguageService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")
      console.log(this.id)
      this.getLocation();
    })
  }

  getLocation() {
    this.locationsService.loadLocation(this.id).subscribe(response => {
      this.location = response;
      console.log(this.location)
      this.sharedURL = Helper.getShareURL(this.location.id, this.location.hash);
    })
    console.log(this.location)
  }

  getCurrentLocation() {
    this.locationService.getPosition().then(pos => {
      this.updateLocation(pos);
    })
  }

  updateLocation(position) {
    this.location.geoLocation.lat = position.lat;
    this.location.geoLocation.lng = position.lng;
  }

  setPosition(position) {
    this.location.geoLocation.lat = position.coords.lat;
    this.location.geoLocation.lng = position.coords.lng;

  }

  setTitle(title) {
    console.log(title)
    this.location.title = title.target.value
  }

  setNote(note) {
    console.log(note)
    this.location.note = note.target.value
  }

  setAccessibility(value) {
    console.log(value.value)
    this.location.properties.accesibility = value.value;
  }

  setCategory(category) {
    console.log(category)
    this.location.properties.category = category.value;
  }

  setTags(tags) {
    console.log(tags)
    this.location.properties.type = tags.value;
  }

  setWeatherSunny(value) {
    console.log(value)
    this.location.properties.wheater.sunny = value.value;
  }

  setWeatherCloudy(value) {
    console.log(value)
    this.location.properties.wheater.cloudy = value.value;
  }
  setWeatherRainy(value) {
    console.log(value)
    this.location.properties.wheater.rainy = value.value;
  }
  setWeatherFoggy(value) {
    console.log(value)
    this.location.properties.wheater.foggy = value.value;
  }

  setSeasonSpring(value) {
    console.log(value)
    this.location.properties.seasons.spring = value.value;
  }

  setSeasonSummer(value) {
    console.log(value)
    this.location.properties.seasons.summer = value.value;
  }

  setSeasonAutumn(value) {
    console.log(value)
    this.location.properties.seasons.autumn = value.value;
  }

  setSeasonWinter(value) {
    console.log(value)
    this.location.properties.seasons.winter = value.target.value;
  }

  handleShare(event) {
    console.log(event);
    this.location.shared = event.checked;
    if(this.location.shared === false) {
        this.sharedURL = '';
        this.location.hash = '';
    } else {
        var hash = Helper.generateHash();
        this.location.hash = hash;
        this.sharedURL = Helper.getShareURL(this.location.id, hash);
    }
  }

  goBack() {
    this._location.back()
  }

  saveLocation() {
    console.log(this.location)
    this.locationsService.editLocation(this.location).subscribe(res => {
      console.log(res)
      this.router.navigate(['location/' + this.id])
    })
  }


}
