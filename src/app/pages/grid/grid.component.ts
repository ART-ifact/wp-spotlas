import { Component, OnInit } from '@angular/core';
import { LocationItem } from 'src/app/classes/location';
import { FilterService } from 'src/app/services/filter.service';
import { LocationsService } from 'src/app/services/locations.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  public locations: LocationItem[];
  public filter;

  constructor(
    public locationService: LocationsService,
    public locationsService: LocationsService,
    private filterService: FilterService
  ) {
    this.locationsService.getLocations().subscribe();
    this.filterService.filterObject.subscribe(filter => {
      this.filter = { ...filter };
    });
  }

  ngOnInit() {

  }

}
