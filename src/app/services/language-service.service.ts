import { Injectable } from '@angular/core';
import { BasicRestService } from './basic-rest.service';
import { environment } from 'src/environments/environment';
import { translation } from 'src/translations/strings';
import { OptionsService } from './options.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public strings : any = translation;
  private currentLanguage = 'en';
  constructor(private baseService : BasicRestService, private optionService : OptionsService) { }

  getString(string) {
    if (this.optionService.options) {
      this.currentLanguage = this.optionService.options.language;
    }
    if (this.strings[this.currentLanguage].hasOwnProperty(string)) {
      return this.strings[this.currentLanguage][string];
    } else {
      return 'Not Available'
    }
  }
}
