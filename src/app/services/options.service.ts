import { Injectable } from '@angular/core';
import { BasicRestService } from './basic-rest.service';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  public options;

  constructor(private baseService : BasicRestService) { }

  getOptions() {
    return this.baseService.get('spotlas/options');
  }
}
