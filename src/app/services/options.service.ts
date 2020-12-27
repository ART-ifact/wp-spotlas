import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiEndpoints } from '../classes/enum/api-endpoints.enum';
import { Logger } from '../helper/logger';
import { BasicRestService } from './basic-rest.service';

export interface Options {
  language: string;
  apiKey: string;
  logoutLink: string;
  logo: string;
  basePath: string;
  geoLocation: {
    lat: number;
    lng: number
  };
}
@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  public options: Subject<Options> = new ReplaySubject();
  public mapStyle = environment.mapStyle;
  public placesURL = '';

  constructor(private baseService: BasicRestService) { }

  getOptions() {
    return this.baseService.get(ApiEndpoints.getOptions).pipe(
      map((options: any) => {
        const mappedOptions = {
          language: options.language,
          apiKey: options.apiKey,
          logoutLink: options.logoutLink,
          logo: options.logo,
          basePath: options.basePath,
          geoLocation: {
            lat: parseInt(options.geoLocation.lat),
            lng: parseInt(options.geoLocation.lng)
          }
        };
        Logger.dev(mappedOptions);
        this.placesURL = 'https://maps.google.com/maps/api/js?sensor=true&key=' + mappedOptions.apiKey + '&libraries=places&language=en-US';
        this.options.next(mappedOptions);
        return mappedOptions;
      })
    );
  }

}
