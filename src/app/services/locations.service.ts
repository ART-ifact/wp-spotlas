import { Injectable } from '@angular/core';
import { BasicRestService } from './basic-rest.service';
import { LocationItem } from '../classes/location';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Helper } from '../helper/helper';
import { ApiEndpoints } from '../classes/enum/api-endpoints.enum';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  public locations;

  constructor(private baseService : BasicRestService) { }

  getLocations() {
    return this.baseService.get(ApiEndpoints.getLocations).pipe(
      map((result: any) => {
        let locations : LocationItem[] = [];

        for (let index = 0, lenght = result.length; index < lenght; ++index) {
          let item = result[index];

          let locationItem : LocationItem = {
            id: item.id,
            shared: item.shared,
            hash: item.hash,
            title: item.title.rendered,
            note: item.content.rendered.replace(/(<([^>]+)>)/ig,""),
            properties: {
              accesibility : item.accesibility,
              category: item.category,
              adress: item.adress,
              type: item.type,
              wheater: {
                cloudy: item.cloudy,
                foggy: item.foggy,
                rainy: item.rainy,
                sunny: item.sunny
              },
              seasons: {
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

  loadLocation(id) {
    return this.baseService.get(ApiEndpoints.getLocation + id).pipe(
      map((result: any) => {

        let item = result;

          let location : LocationItem = {
            id: item.id,
            shared: item.shared,
            hash: item.hash,
            title: item.title.rendered,
            note: item.content.rendered.replace(/(<([^>]+)>)/ig,""),
            properties: {
              accesibility : item.accesibility,
              category: item.category,
              adress: item.adress,
              type: item.type.split(','),
              wheater: {
                cloudy: (item.cloudy == 'true'),
                foggy: (item.foggy == 'true'),
                rainy: (item.rainy == 'true'),
                sunny: (item.sunny == 'true')
              },
              seasons: {
                autumn: (item.autumn == 'true'),
                spring: (item.spring == 'true'),
                summer: (item.summer == 'true'),
                winter: (item.winter == 'true')},
              images: JSON.parse(item.images)
            },
            geoLocation: {
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lng)
            }
          }
        return location;
      })
    )
  }

  getLocation(id) {
    this.getLocations().subscribe(result => {
      this.locations = result;
      return this.filterLocation(id);
    })
  }

  saveLocation(locationObject) {
    let formData = Helper.buildFormData(locationObject, false);
    return this.baseService.post(ApiEndpoints.saveLocation, formData);
  }

  filterLocation(id) {
    return this.locations.filter(x => x.id == id)[0];
  }
}
