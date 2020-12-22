import { Pipe, PipeTransform } from '@angular/core';
import { LocationItem } from '../classes/location';
import { Helper } from './helper';

@Pipe({
  name: 'filterLocations',
  pure : true
})
export class LocationsPipe implements PipeTransform {
  transform(items: LocationItem[], filter: {[key: string]: any }): LocationItem[] {
    if (!items || !filter) {
      return items;
    }

    let filteredLocations = [];
    let filters = [];

    for (let key in filter) {
      if (filter[key] !== undefined) {
        filters[key] = filter[key];
      }
    }
    if (Object.keys(filters).length === 0) {
      return items
    }
    for (let index = 0; index < items.length; index++) {
      const location = items[index];
      let flattenLocation = Helper.flatten(location)
      let truthyFilters = null;
      if (Object.keys(filters).length > 0) {
        truthyFilters = 0
      }
      for(let entry in filters) {
        switch (typeof filters[entry]) {
          case 'string':
            if (flattenLocation[entry].includes(filters[entry]) || filters[entry].length === 0) {
              truthyFilters = truthyFilters + 1
            }
            break;
          case 'boolean':
            if (flattenLocation[entry] === filters[entry]) {
              truthyFilters = truthyFilters + 1
            }
          break;
          case 'number':
            if (flattenLocation[entry] >= filters[entry]) {
              truthyFilters = truthyFilters + 1
            }
            break;
          case 'object':
            let tmpObject = flattenLocation[entry].split(',')
            if (tmpObject.every(i => filters[entry].includes(i))) {
              truthyFilters = truthyFilters + 1
            }
            break;
          default:
            break;
        }
      }

      if (truthyFilters === Object.keys(filters).length) {
        filteredLocations.push(location)
      }
    }
    return filteredLocations;
  }
}
