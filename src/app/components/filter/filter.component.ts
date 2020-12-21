import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language-service.service';
import { LocationsService } from 'src/app/services/locations.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public categories : any[] = [
    {value: 'building', viewValue: 'Gebäude'},
    {value: 'landscape', viewValue: 'Landschaft'},
    {value: 'urban', viewValue: 'Urban'},
    {value: 'water', viewValue: 'Wasser'}
  ];
  public tags : any[] = [
    {value: 'building', viewValue: 'industriell'},
    {value: 'landscape', viewValue: 'historisch'},
    {value: 'urban', viewValue: 'panorama'},
    {value: 'water', viewValue: 'Sonnenaufgang'},
    {value: 'water', viewValue: 'Sonnenuntergang'},
    {value: 'water', viewValue: 'Outdoor'},
    {value: 'water', viewValue: 'Architektur'},
    {value: 'water', viewValue: 'Sehenswürdigkeit'}
  ];

  public emptyFilter = {
    shared: null,
    title: null,
    note: null,
    accesibility : null,
    category: null,
    adress: null,
    type: null,
    foggy: null,
    cloudy: null,
    rainy: null,
    sunny: null,
    autumn: null,
    spring: null,
    summer: null,
    winter: null
  };

  constructor(public language : LanguageService, public locationService : LocationsService) { }

  ngOnInit() {
  }

  setFilter(value) {
    console.log('filter value', value);
    //TODO: refactor this.locationService.filterItems();
  }


  resetFilter() {
    this.locationService.filter = this.emptyFilter;
    //TODO: refactor this.locationService.resetFilter();
  }

}
