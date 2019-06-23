import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationsService } from 'src/app/services/locations.service';
import { LocationItem } from 'src/app/classes/location';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { environment } from 'src/environments/environment';
import { OptionsService } from 'src/app/services/options.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  public id : string;
  public location : LocationItem;
  public mapStyle = environment.mapStyle;
  constructor(private route : ActivatedRoute, private locationService: LocationsService, public optionService:OptionsService) { }

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

}
