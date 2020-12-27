import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'type'
})

export class TypePipe implements PipeTransform {
  constructor(private translate: TranslateService) { }
  transform(type: string): string {
    switch (type) {
      case 'industrial':
        return this.translate.instant('TAGS.INDUSTRIAL');
      case 'historic':
        return this.translate.instant('TAGS.HISTORIC');
      case 'panoramic':
        return this.translate.instant('TAGS.PANORAMIC');
      case 'sunrise':
        return this.translate.instant('TAGS.SUNRISE');
      case 'sunset':
        return this.translate.instant('TAGS.SUNSET');
      case 'outdoor':
        return this.translate.instant('TAGS.OUTDOOR');
      case 'architecture':
        return this.translate.instant('TAGS.ARCHITECTURE');
      case 'sight':
        return this.translate.instant('TAGS.SIGHT');
      default:
        return type;
    }
  }
}
