import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiEndpoints } from '../classes/enum/api-endpoints.enum';
import { LocationItem } from '../classes/location';
import { Helper } from '../helper/helper';
import { BasicRestService } from './basic-rest.service';
import { OptionsService } from './options.service';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  public locations: Subject<LocationItem[]> = new ReplaySubject();

  constructor(private baseService: BasicRestService, private optionsService: OptionsService) { }

  checkTruthy(value: string) {
    return (value === 'true');
  }

  getLocations() {
    return this.baseService.get(ApiEndpoints.getLocations).pipe(
      map((result: any) => {
        const locations: LocationItem[] = [];

        for (let index = 0, lenght = result.length; index < lenght; ++index) {
          const item = result[index];

          const locationItem: LocationItem = {
            id: item.id,
            shared: (item.shared === 'true'),
            hash: item.hash,
            title: item.title.rendered,
            note: item.content.rendered.replace(/(<([^>]+)>)/ig, ''),
            properties: {
              accesibility : item.accesibility,
              category: item.category,
              adress: item.adress,
              type: item.type,
              wheater: {
                cloudy: this.checkTruthy(item.cloudy),
                foggy: this.checkTruthy(item.foggy),
                rainy: this.checkTruthy(item.rainy),
                sunny: this.checkTruthy(item.sunny)
              },
              seasons: {
                autumn: this.checkTruthy(item.autumn),
                spring: this.checkTruthy(item.spring),
                summer: this.checkTruthy(item.summer),
                winter: this.checkTruthy(item.winter)
              },
              images: JSON.parse(item.images)
            },
            geoLocation: {
              lat: parseInt(item.lat),
              lng: parseInt(item.lng)
            }
          };
          locations.push(locationItem);
        }
        this.locations.next(locations);
        return locations;
      })
    );
  }

  refreshLocations() {
    this.getLocations().subscribe();
  }

  loadLocation(id) {
    return this.baseService.get(ApiEndpoints.getLocation + id).pipe(
      map((result: any) => {

        const item = result;

        const location: LocationItem = {
            id: item.id,
            shared: (item.shared === 'true'),
            hash: item.hash,
            title: item.title.rendered,
            note: item.content.rendered.replace(/(<([^>]+)>)/ig, ''),
            properties: {
              accesibility : item.accesibility,
              category: item.category,
              adress: item.adress,
              type: item.type.split(','),
              wheater: {
                cloudy: this.checkTruthy(item.cloudy),
                foggy: this.checkTruthy(item.foggy),
                rainy: this.checkTruthy(item.rainy),
                sunny: this.checkTruthy(item.sunny)
              },
              seasons: {
                autumn: this.checkTruthy(item.autumn),
                spring: this.checkTruthy(item.spring),
                summer: this.checkTruthy(item.summer),
                winter: this.checkTruthy(item.winter)},
              images: JSON.parse(item.images)
            },
            geoLocation: {
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lng)
            }
          };
        return location;
      })
    );
  }

  getLocation(id) {
    return this.locations.pipe(
      filter(location => location[0].id == id)
    );
  }

  getSharedLocation(id, hash) {
    return this.baseService.get(ApiEndpoints.getLocation + id + '?id=' + id + '&hash=' + hash).pipe(
      map((result: any) => {

        const item = result;

        const location: LocationItem = {
            id: item.id,
            shared: (item.shared == 'true'),
            hash: item.hash,
            title: item.title.rendered,
            note: item.content.rendered.replace(/(<([^>]+)>)/ig, ''),
            properties: {
              accesibility : item.accesibility,
              category: item.category,
              adress: item.adress,
              type: item.type.split(','),
              wheater: {
                cloudy: this.checkTruthy(item.cloudy),
                foggy: this.checkTruthy(item.foggy),
                rainy: this.checkTruthy(item.rainy),
                sunny: this.checkTruthy(item.sunny)
              },
              seasons: {
                autumn: this.checkTruthy(item.autumn),
                spring: this.checkTruthy(item.spring),
                summer: this.checkTruthy(item.summer),
                winter: this.checkTruthy(item.winter)
              },
              images: JSON.parse(item.images)
            },
            geoLocation: {
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lng)
            }
          };
        return location;
      })
    );
  }

  saveLocation(locationObject) {
    const formData = Helper.buildFormData(locationObject, false);
    return this.baseService.post(ApiEndpoints.saveLocation, formData);
  }

  editLocation(locationObject) {
    const formData = Helper.buildFormData(locationObject, true);
    let subscribtion;
    this.optionsService.options.subscribe(options => {
      const basePath = options.basePath;
      subscribtion =  this.baseService.post(basePath + ApiEndpoints.editLocation, formData);
    });
    return subscribtion;
  }

  deleteLocation(id) {
    return this.baseService.delete(ApiEndpoints.deleteLocation + id + '?force=true');
  }
}
