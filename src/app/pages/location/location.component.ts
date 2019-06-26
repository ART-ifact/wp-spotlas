import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationsService } from 'src/app/services/locations.service';
import { LocationItem } from 'src/app/classes/location';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { environment } from 'src/environments/environment';
import { OptionsService } from 'src/app/services/options.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  public id : string;
  public location : LocationItem;
  public mapStyle = environment.mapStyle;
  constructor(
    private route : ActivatedRoute,
    private locationService: LocationsService,
    public optionService:OptionsService,
    public dialog: MatDialog,
    private router : Router
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")
      this.getLocation();
    })
  }

  getLocation() {
    this.locationService.loadLocation(this.id).subscribe(response => {
      this.location = response;
      console.log(this.location)
    })
    console.log(this.location)
  }

  deleteLocation(id) {
    this.locationService.deleteLocation(id).subscribe(response => {
      this.router.navigate(['/']);
    })
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      hasBackdrop: true,
      data: "You really want to delete the location?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteLocation(id)
      }
    });
  }
}
