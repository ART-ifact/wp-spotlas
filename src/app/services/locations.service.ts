import { Injectable } from '@angular/core';
import { BasicRestService } from './basic-rest.service';
import { LocationItem } from '../classes/location';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  public locations;

  constructor(private baseService : BasicRestService) { }

  getLocations() {
    return this.baseService.get(environment.api+'wp/v2/posts?per_page=10000000').pipe(
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
    return this.baseService.get(environment.api+'wp/v2/posts/' + id).pipe(
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
    if (this.locations) {
      return this.filterLocation(id);
    } else {
      this.getLocations().subscribe(result => {
        this.locations = result;
        return this.filterLocation(id);
      })
    }
  }

  saveLocation(locationObject) {
    let formData = this.buildFormData(locationObject, false);
    return this.baseService.post('../formhandlers/add-location.php', formData);
  }

  filterLocation(id) {
    return this.locations.filter(x => x.id == id)[0];
  }

  buildFormData(form, widthID) {
    var formData = new FormData();

    if (widthID) {
        formData.append("id", form.id);
    }
    formData.append("title", form.title);
    formData.append("type", form.properties.type);
    formData.append("category", form.properties.category);
    formData.append("accesibility", form.properties.accesibility);
    formData.append("lat", form.geoLocation.lat);
    formData.append("lng", form.geoLocation.lng);
    formData.append("images", form.properties.images);
    formData.append("sunny", form.properties.wheater.sunny);
    formData.append("cloudy", form.properties.wheater.cloudy);
    formData.append("foggy", form.properties.wheater.foggy);
    formData.append("rainy", form.properties.wheater.rainy);
    formData.append("spring", form.properties.seasons.spring);
    formData.append("summer", form.properties.seasons.summer);
    formData.append("autumn", form.properties.seasons.autumn);
    formData.append("winter", form.properties.seasons.winter);
    formData.append("description", form.note);
    formData.append("shared", form.shared);
    formData.append("hash", form.hash);

    return formData;
  }
}
