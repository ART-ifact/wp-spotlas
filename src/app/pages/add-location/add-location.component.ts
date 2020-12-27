import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Position } from 'src/app/classes/position.iface';
import { Helper } from 'src/app/helper/helper';
import { LocationService } from 'src/app/services/location.service';
import { LocationsService } from 'src/app/services/locations.service';
import { Options, OptionsService } from 'src/app/services/options.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
  public options: Options;
  public imageArray = '';
  public mapStyle = this.optionService.mapStyle;
  public locationObject: Position = {
    lat: 0,
    lng: 0
  };
  public categories: any[];
  public tags: any[];
  public locationArray = Helper.getLocationArray();
  constructor(
    private _location: Location,
    private router: Router,
    public optionService: OptionsService,
    private location: LocationService,
    private locationsService: LocationsService,
    private translate: TranslateService,
    private uiService: UiService
  ) {
    this.optionService.options.subscribe(options => {
      this.options = options;
    });

    this.uiService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.uiService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  ngOnInit() {
  }

  goBack() {
    this._location.back();
  }

  getCurrentLocation() {
    this.location.getPosition().then(pos => {
      this.updateLocation(pos);
    });
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
    return parseInt(value);
  }

  setPosition(position) {
    this.updateLocation({ lat: position.latLng.lat(), lng: position.latLng.lng() });
  }

  saveLocation() {
    this.locationsService.saveLocation(this.locationArray).subscribe(res => {
      console.log(res);
      this.router.navigate(['location/' + res]);
    });
  }

}
