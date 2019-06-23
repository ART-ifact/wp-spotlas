import { Injectable } from '@angular/core';
import { BasicRestService } from './basic-rest.service';
import { LocationItem } from '../classes/location';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  public locations;

  constructor(private baseService : BasicRestService) { }

  getLocations() {
    return this.baseService.get('wp/v2/posts?per_page=10000000').pipe(
      map((result: any) => {
        let locations : LocationItem[] = [];

        for (let index = 0, lenght = result.length; index < lenght; ++index) {
          let item = result[index];

          let locationItem : LocationItem = {
            id: item.id,
            shared: item.shared,
            hash: item.hash,
            title: item.title.rendered,
            properties: {
              accesibility : item.accesibility,
              category: item.category,
              adress: item.adress,
              type: item.type,
              wheater: {
                autumn: item.autumn,
                cloudy: item.cloudy,
                foggy: item.foggy,
                rainy: item.rainy,
                sunny: item.sunny
              },
              seasony: {
                autumn: item.autumn,
                spring: item.spring,
                summer: item.summer,
                winter: item.winter
              },
              images: JSON.parse(item.images)
            },
            geoLocation: {
              lat: item.lat,
              lng: item.lng
            }
          }
          locations.push(locationItem);
        }
        return locations;
      })
    );
  }
}
