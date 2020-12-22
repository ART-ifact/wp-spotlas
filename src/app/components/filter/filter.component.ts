import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';
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

  public filter = {
    shared: undefined,
    title: undefined,
    note: undefined,
    accesibility : undefined,
    category: undefined,
    adress: undefined,
    type: undefined,
    foggy: undefined,
    cloudy: undefined,
    rainy: undefined,
    sunny: undefined,
    autumn: undefined,
    spring: undefined,
    summer: undefined,
    winter: undefined
  };

  public emptyFilter = {
    shared: undefined,
    title: undefined,
    note: undefined,
    accesibility : undefined,
    category: undefined,
    adress: undefined,
    type: undefined,
    foggy: undefined,
    cloudy: undefined,
    rainy: undefined,
    sunny: undefined,
    autumn: undefined,
    spring: undefined,
    summer: undefined,
    winter: undefined
  };

  constructor(public language : LanguageService, public filterService : FilterService) { }

  ngOnInit() {
  }

  setFilter(value) {
    this.filterService.applyFilter(this.filter)
  }


  resetFilter() {
    this.filter = this.emptyFilter;
    this.filterService.applyFilter(this.emptyFilter)
  }

}
