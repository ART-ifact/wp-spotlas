import { Injectable } from '@angular/core';
import { BasicRestService } from './basic-rest.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public strings;

  constructor(private baseService : BasicRestService) { }

  getString(string) {
    if (this.strings.hasOwnProperty(string)) {
      return this.strings[string];
    } else {
      return 'Not Available'
    }
  }

  loadTranslation(language) {
    return this.baseService.get('translations/'+language+'.json');
  }
}
