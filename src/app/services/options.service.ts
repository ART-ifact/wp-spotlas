import { Injectable } from '@angular/core';
import { BasicRestService } from './basic-rest.service';
import { environment } from 'src/environments/environment';
import { ApiEndpoints } from '../classes/enum/api-endpoints.enum';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  public options;
  public mapStyle = environment.mapStyle;
  public placesURL = '';

  constructor(private baseService : BasicRestService) { }

  getOptions() {
    return this.baseService.get(ApiEndpoints.getOptions);
  }
}
