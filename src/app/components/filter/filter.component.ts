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
    title : '',
    category : '',
    type : '',
    accessibility : 0,
    cloudy: false,
    foggy: false,
    rainy: false,
    sunny: false,
    spring: false,
    summer: false,
    autumn: false,
    winter: false,
    shared: false
  };

  constructor(public language : LanguageService, public locationService : LocationsService) { }

  ngOnInit() {
  }


  resetFilter() {
    this.locationService.filter = this.emptyFilter;
  }

}
