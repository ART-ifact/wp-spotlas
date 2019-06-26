import { Component, OnInit } from '@angular/core';
import { OptionsService } from 'src/app/services/options.service';
import { LocationsService } from 'src/app/services/locations.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public clusterstyle = {
    url: "/assets/img/marker.svg",
        height: 50,
        width: 50,
        anchor: [-14, 0],
        textColor: '#bd0b1d',
        textSize: 11,
        backgroundPosition: "center center"
  }
  public mapStyle = this.optionService.mapStyle;

  constructor(public optionService : OptionsService, public locationsService : LocationsService) { }

  ngOnInit() {
    this.locationsService.getLocations().subscribe(response => {
      this.locationsService.locations = response;
    })
  }

}
