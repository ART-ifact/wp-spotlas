import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Position } from 'src/app/classes/position.iface';
import { Helper } from 'src/app/helper/helper';
import { LocationService } from 'src/app/services/location.service';
import { LocationsService } from 'src/app/services/locations.service';
import { Options, OptionsService } from 'src/app/services/options.service';

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
  public categories: any[] = [
    {value: 'building', viewValue: 'Gebäude'},
    {value: 'landscape', viewValue: 'Landschaft'},
    {value: 'urban', viewValue: 'Urban'},
    {value: 'water', viewValue: 'Wasser'}
  ];
  public tags: any[] = [
    {value: 'building', viewValue: 'industriell'},
    {value: 'landscape', viewValue: 'historisch'},
    {value: 'urban', viewValue: 'panorama'},
    {value: 'water', viewValue: 'Sonnenaufgang'},
    {value: 'water', viewValue: 'Sonnenuntergang'},
    {value: 'water', viewValue: 'Outdoor'},
    {value: 'water', viewValue: 'Architektur'},
    {value: 'water', viewValue: 'Sehenswürdigkeit'}
  ];
  public options: Options;

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private snackBar: MatSnackBar,
    public optionService: OptionsService,
    private locationsService: LocationsService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.optionService.options.subscribe(options => {
      this.options = options;
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getLocation();
    });
  }

  getLocation() {
    this.locationsService.loadLocation(this.id).subscribe(response => {
      this.location = response;
      this.sharedURL = Helper.getShareURL(this.location.id, this.location.hash);
    });
  }

  getCurrentLocation() {
    const snackbar = this.snackBar.open(this.translate.instant('LOCATION.SEARCHING'), '', {
      panelClass: ['info']
    });
    this.locationService.getPosition().then(pos => {
      snackbar.dismiss();
      this.updateLocation(pos);
    });
  }

  updateLocation(position: Position) {
    this.location.geoLocation.lat = position.lat;
    this.location.geoLocation.lng = position.lng;
  }

  handleShare(event) {
    this.location.shared = event.checked;
    if (this.location.shared === false) {
        this.sharedURL = '';
        this.location.hash = '';
    } else {
        const hash = Helper.generateHash();
        this.location.hash = hash;
        this.sharedURL = Helper.getShareURL(this.location.id, hash);
    }
  }

  goBack() {
    this.location.back();
  }

  saveLocation() {
    this.locationsService.editLocation(this.location).subscribe(res => {
      this.router.navigate(['location/' + this.id]);
    });
  }


}
