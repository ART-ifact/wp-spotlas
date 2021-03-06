import { Component, OnInit } from '@angular/core';
import { LocationsService } from 'src/app/services/locations.service';
import { LocationStrategy } from '@angular/common';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  constructor(
    public locationService : LocationsService,
    public locationsService : LocationsService,
    private filterPipe: FilterPipe
  ) { }

  ngOnInit() {
    this.locationsService.getLocations().subscribe(response => {
      this.locationsService.locations = response;
    })
  }

}
