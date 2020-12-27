import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private mediaMatcher: MediaMatcher,
    private translate: TranslateService
  ) {

  }

  prepareUIElements() {
    this.matIconRegistry.addSvgIcon(
      'rainy',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg-icons/rainy.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'cloudy',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg-icons/cloudy.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'foggy',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg-icons/foggy.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'sunny',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg-icons/sunny.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'spring',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg-icons/spring.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'summer',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg-icons/summer.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'winter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg-icons/winter.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'autumn',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg-icons/autumn.svg')
    );
  }

  isSharedUrl(): boolean {
    return (window.location.href.indexOf('/share/') > -1);
  }

  hasBackdrop() {
    return this.mediaMatcher.matchMedia('(max-width: 960px)').matches;
  }

  getTags() {
    return this.translate.get([
      'TAGS.INDUSTRIAL',
      'TAGS.HISTORIC',
      'TAGS.PANORAMIC',
      'TAGS.SUNRISE',
      'TAGS.SUNSET',
      'TAGS.OUTDOOR',
      'TAGS.ARCHITECTURE',
      'TAGS.SIGHT'
    ]).pipe(
      map(translations => {
        return [
          { value: 'industrial', viewValue: translations['TAGS.INDUSTRIAL'] },
          { value: 'historic', viewValue: translations['TAGS.HISTORIC'] },
          { value: 'panoramic', viewValue: translations['TAGS.PANORAMIC'] },
          { value: 'sunrise', viewValue: translations['TAGS.SUNRISE'] },
          { value: 'sunset', viewValue: translations['TAGS.SUNSET'] },
          { value: 'outdoor', viewValue: translations['TAGS.OUTDOOR'] },
          { value: 'architecture', viewValue: translations['TAGS.ARCHITECTURE'] },
          { value: 'sight', viewValue: translations['TAGS.SIGHT'] }
        ];
      })
    );
  }

  getCategories() {
    return this.translate.get(['CATEGORIES.BUILDING', 'CATEGORIES.LANDSCAPE', 'CATEGORIES.URBAN', 'CATEGORIES.WATER']).pipe(
      map(translations => {
        return [
          { value: 'building', viewValue: translations['CATEGORIES.BUILDING'] },
          { value: 'landscape', viewValue: translations['CATEGORIES.LANDSCAPE'] },
          { value: 'urban', viewValue: translations['CATEGORIES.URBAN'] },
          { value: 'water', viewValue: translations['CATEGORIES.WATER'] }
        ];
      })
    );
  }
}
