import { Component, OnInit } from '@angular/core';
import { LocationsService } from 'src/app/services/locations.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  constructor(public locationService : LocationsService) { }

  ngOnInit() {
  }

}
