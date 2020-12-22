import { Injectable } from '@angular/core';
import { BasicRestService } from './basic-rest.service';
import { LocationItem } from '../classes/location';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Helper } from '../helper/helper';
import { ApiEndpoints } from '../classes/enum/api-endpoints.enum';
import { OptionsService } from './options.service';
import { formattedError } from '@angular/compiler';
import { from, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  public locations : Subject<LocationItem[]> = new ReplaySubject();

  constructor(private baseService : BasicRestService, private optionsService : OptionsService) { }

  checkTruthy(value : string) {
    return (value === 'true')
  }

  getLocations() {
    return this.baseService.get(ApiEndpoints.getLocations).pipe(
      map((result: any) => {
        let locations : LocationItem[] = [];

        for (let index = 0, lenght = result.length; index < lenght; ++index) {
          let item = result[index];

          let locationItem : LocationItem = {
            id: item.id,
            shared: (item.shared == 'true'),
            hash: item.hash,
            title: item.title.rendered,
            note: item.content.rendered.replace(/(<([^>]+)>)/ig,""),
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
          }
          locations.push(locationItem);
        }
        this.locations.next(locations);
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
    return this.locations.pipe(
      filter(location => location[0].id == id)
    )
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
    let subscribtion;
    this.optionsService.options.subscribe(options => {
      let basePath = options.basePath
      subscribtion =  this.baseService.post(basePath + ApiEndpoints.editLocation, formData);
    })
    return subscribtion;
  }

  deleteLocation(id) {
    return this.baseService.delete(ApiEndpoints.deleteLocation + id + '?force=true');
  }

  // TODO: refactor
  /*flatten(data) {
    console.log('flat', data)
    var result = {};
    function recurse (cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
             for(var i=0, l=cur.length; i<l; i++)
                 recurse(cur[i], prop + "[" + i + "]");
            if (l == 0)
                result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p],  p);
            }
            if (isEmpty && prop)
                result[prop] = {};
        }
    }
    recurse(data, "");
    console.log('result', result)
    return result;
}*/
}
