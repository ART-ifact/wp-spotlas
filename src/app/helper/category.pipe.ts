import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'category'
})

export class CategoryPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}
  transform(category: string): string {
    switch (category) {
      case 'building':
        return this.translate.instant('CATEGORIES.BUILDING');
      case 'landscape':
        return this.translate.instant('CATEGORIES.LANDSCAPE');
      case 'urban':
        return this.translate.instant('CATEGORIES.URBAN');
      case 'water':
        return this.translate.instant('CATEGORIES.WATER');
      default:
        break;
    }
  }
}
