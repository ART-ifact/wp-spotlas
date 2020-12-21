import { Component, OnInit } from '@angular/core';
import { LocationsService } from 'src/app/services/locations.service';
import { LocationStrategy } from '@angular/common';
import { FilterPipe } from 'ngx-filter-pipe';
import { LocationItem } from 'src/app/classes/location';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  public locations : LocationItem[];

  constructor(
    public locationService : LocationsService,
    public locationsService : LocationsService,
    private filterPipe: FilterPipe
  ) {
    this.locationsService.getLocations()
  }

  ngOnInit() {

  }

}
