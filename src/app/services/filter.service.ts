import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
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

  public filterObject : Subject<any> = new ReplaySubject();

  constructor() { }

  public applyFilter(filter) {
    this.filterObject.next(filter)
  }



}
