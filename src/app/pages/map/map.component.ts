import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';
import { LocationsService } from 'src/app/services/locations.service';
import { Options, OptionsService } from 'src/app/services/options.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public clusterstyle = {
    url: '/assets/img/marker.svg',
    height: 50,
    width: 50,
    anchor: [-14, 0],
    textColor: '#bd0b1d',
    textSize: 11,
    backgroundPosition: 'center center'
  };
  public mapStyle = this.optionService.mapStyle;
  public options: Options;
  public filter;
  public changed: Date;

  constructor(
    public optionService: OptionsService,
    public locationsService: LocationsService,
    public filterService: FilterService
    ) {
    this.optionService.options.subscribe(options => {
      this.options = options;
    });
    this.filterService.filterObject.subscribe(filter => {
      this.filter = { ...filter };
    });
  }

  ngOnInit() {
  }

}
