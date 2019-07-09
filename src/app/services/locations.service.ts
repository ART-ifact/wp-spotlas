import { Injectable } from '@angular/core';
import { BasicRestService } from './basic-rest.service';
import { LocationItem } from '../classes/location';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Helper } from '../helper/helper';
import { ApiEndpoints } from '../classes/enum/api-endpoints.enum';
import { OptionsService } from './options.service';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  public locations = [];
  public filteredLocations = [];
  public filter = {
    shared: null,
    title: null,
    note: null,
    properties: {
      accesibility : null,
      category: null,
      adress: null,
      type: null,
      wheater: {
        cloudy: null,
        foggy: null,
        rainy: null,
        sunny: null
      },
      seasons: {
        autumn: null,
        spring: null,
        summer: null,
        winter: null
      }
    },
  };

  constructor(private baseService : BasicRestService, private options : OptionsService) { }

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
        this.locations = locations;
        this.filteredLocations = locations;
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
            shared: (item.shared == 'true'),
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

  getSharedLocation(id, hash) {
    return this.baseService.get(ApiEndpoints.getLocation + id+'?id='+id+'&hash='+hash).pipe(
      map((result: any) => {

        let item = result;

          let location : LocationItem = {
            id: item.id,
            shared: (item.shared == 'true'),
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

  saveLocation(locationObject) {
    let formData = Helper.buildFormData(locationObject, false);
    return this.baseService.post(ApiEndpoints.saveLocation, formData);
  }

  editLocation(locationObject) {
    let formData = Helper.buildFormData(locationObject, true);
    return this.baseService.post(this.options.options.basePath + ApiEndpoints.editLocation, formData);
  }

  deleteLocation(id) {
    return this.baseService.delete(ApiEndpoints.deleteLocation + id + '?force=true');
  }

  filterLocation(id) {
    return this.locations.filter(x => x.id == id)[0];
  }

  locationFilter(filters) {


    const filterKeys = Object.keys(filters);
    return this.locations.filter(eachObj => {
      return filterKeys.every(eachKey => {
        if (!filters[eachKey].length) {
          return true; // passing an empty filter means that filter is ignored.
        }
        return filters[eachKey].includes(eachObj[eachKey]);
      });
    });
  }
}
