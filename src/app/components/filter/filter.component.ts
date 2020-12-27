import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public categories: any[];
  public tags: any[];

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

  constructor(public filterService: FilterService, private uiService: UiService) { }

  ngOnInit() {
    this.uiService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.uiService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  setFilter(value) {
    this.filterService.applyFilter(this.filter);
  }


  resetFilter() {
    this.filter = this.emptyFilter;
    this.filterService.applyFilter(this.emptyFilter);
  }

}
