import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locations'
})
export class LocationsPipe implements PipeTransform {
  transform(items: Array<any>, filter: {[key: string]: any }): Array<any> {
    console.log(filter)
    return items
      //return items.filter(item => {
      //    let notMatchingField = Object.keys(filter).find(key => item[key] !== filter[key]);
//
      //    return !notMatchingField; // true if matches all fields
      //});
  }
}
