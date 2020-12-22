import { Component, OnInit } from '@angular/core';
import { Options, OptionsService } from 'src/app/services/options.service';
import { Location } from '@angular/common';
import { LocationService } from 'src/app/services/location.service';
import { LocationsService } from 'src/app/services/locations.service';
import { Router } from '@angular/router';
import { Helper } from 'src/app/helper/helper';
import { LanguageService } from 'src/app/services/language-service.service';
import { Logger } from 'src/app/helper/logger';
import { Position } from 'src/app/classes/position.iface';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
  public options: Options;
  public imageArray: string = '';
  public mapStyle = this.optionService.mapStyle;
  public locationObject: Position = {
    lat: 0,
    lng: 0
  }
  public categories: any[] = [
    { value: 'building', viewValue: 'Gebäude' },
    { value: 'landscape', viewValue: 'Landschaft' },
    { value: 'urban', viewValue: 'Urban' },
    { value: 'water', viewValue: 'Wasser' }
  ];
  public tags: any[] = [
    { value: 'building', viewValue: 'industriell' },
    { value: 'landscape', viewValue: 'historisch' },
    { value: 'urban', viewValue: 'panorama' },
    { value: 'water', viewValue: 'Sonnenaufgang' },
    { value: 'water', viewValue: 'Sonnenuntergang' },
    { value: 'water', viewValue: 'Outdoor' },
    { value: 'water', viewValue: 'Architektur' },
    { value: 'water', viewValue: 'Sehenswürdigkeit' }
  ];
  public locationArray = Helper.getLocationArray();
  constructor(
    private _location: Location,
    private router: Router,
    public optionService: OptionsService,
    private location: LocationService,
    private locationsService: LocationsService,
    public language: LanguageService
  ) {
    this.optionService.options.subscribe(options => {
      this.options = options
    })
  }

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


  updateLocation(position: Position) {
    this.locationObject.lat = position.lat;
    this.locationObject.lng = position.lng;
    this.locationArray.geoLocation.lat = this.locationObject.lat;
    this.locationArray.geoLocation.lng = this.locationObject.lng;
  }

  setImageArray(imageArray: string) {
    this.imageArray = JSON.stringify(imageArray);
    this.locationArray.properties.images = this.imageArray;
  }

  parseInt(value) {
    return parseInt(value)
  }

  setPosition(position) {
    this.updateLocation({ lat: position.latLng.lat(), lng: position.latLng.lng() })
  }

  saveLocation() {
    console.log(this.locationArray)
    this.locationsService.saveLocation(this.locationArray).subscribe(res => {
      console.log(res)
      this.router.navigate(['location/' + res])
    })
  }

}
