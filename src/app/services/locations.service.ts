import { Injectable } from '@angular/core';
import { BasicRestService } from './basic-rest.service';
import { LocationItem } from '../classes/location';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Helper } from '../helper/helper';
import { ApiEndpoints } from '../classes/enum/api-endpoints.enum';
import { OptionsService } from './options.service';
import { formattedError } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  public locations = [];
  public filteredLocations = [];
  public flattenedLocations = [];
  public filter = {
    shared: null,
    title: null,
    note: null,
    accesibility : null,
    category: null,
    adress: null,
    type: null,
    foggy: null,
    cloudy: null,
    rainy: null,
    sunny: null,
    autumn: null,
    spring: null,
    summer: null,
    winter: null
  };

  constructor(private baseService : BasicRestService, private options : OptionsService) { }

  checkTruthy(value : string) {
    return (value == 'true')
  }

  getLocations() {
    return this.baseService.get(ApiEndpoints.getLocations).pipe(
      map((result: any) => {
        let locations : LocationItem[] = [];
        this.filteredLocations = [];

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
              lat: item.lat,
              lng: item.lng
            }
          }
          let flatLocation = this.flatten(locationItem);
          this.flattenedLocations.push(flatLocation);
          locations.push(locationItem);
        }
        this.locations = locations;
        this.filteredLocations = locations;
        console.log('flattened',this.flattenedLocations)
        return locations;
      })
    );
  }

  resetFilter() {
    this.filteredLocations = this.locations;
  }

  filterItems() {
    this.filteredLocations = [];
    console.log(this.flattenedLocations)
    this.flattenedLocations.forEach((location, index) => {
      let accepted = false;
      for (let key in this.filter) {
        if (this.filter[key] !== null) {
          console.log(typeof this.filter[key])
          switch (typeof this.filter[key]) {
            case 'string':
              if (location[key].includes(this.filter[key])) {
                accepted = true;
              }
              break;
            case 'number':
              if (location[key] <= this.filter[key]) {
                accepted = true;
              }
              break;
            case 'object':
              console.log(key, this.filter[key])
              this.filter[key].forEach(item => {
                console.log('item in',item, location[key], location[key].hasOwnProperty(item))
                if(location[key].includes(item)) {
                  accepted = true;
                }
              })
              break;
            case 'boolean':
              if (location[key] == this.filter[key]) {
                accepted = true;
              }
              break;
            default:
              break;
          }
        }
      }
      if(accepted) {
        this.filteredLocations.push(this.locations[index]);
      }
      console.log('Filtered Locations',this.filteredLocations)
    })
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

  flatten(data) {
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
}
}
