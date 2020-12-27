import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocationItem } from 'src/app/classes/location';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { LocationsService } from 'src/app/services/locations.service';
import { Options, OptionsService } from 'src/app/services/options.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  public id: string;
  public hash: string;
  public location: LocationItem;
  public mapStyle = environment.mapStyle;
  public showButtonBar = true;
  public options: Options;
  constructor(
    private route: ActivatedRoute,
    private locationService: LocationsService,
    public optionService: OptionsService,
    public dialog: MatDialog,
    private router: Router,
    private navigation: Location,
    private translate: TranslateService
    ) {
      this.optionService.getOptions().subscribe(options => {
        this.options = options;
      });
    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.hash = params.get('hash');
      if (this.hash) {
        this.showButtonBar = false;
        this.getSharedLocation();
      } else {
        this.getLocation();
      }
    });
  }

  goBack() {
    this.navigation.back();
  }

  getSharedLocation() {
    this.locationService.getSharedLocation(this.id, this.hash).subscribe(response => {
      this.location = response;
    });
  }

  getLocation() {
    this.locationService.loadLocation(this.id).subscribe(response => {
      this.location = response;
    });
  }

  deleteLocation(id) {
    this.locationService.deleteLocation(id).subscribe(() => {
      this.locationService.refreshLocations();
      this.router.navigate(['/']);
    });
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      hasBackdrop: true,
      data: this.translate.instant('LOCATION.DELETE_CONFIRM')
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteLocation(id);
      }
    });
  }
}
