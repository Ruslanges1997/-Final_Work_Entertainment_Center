import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(value: Array<any>, seacrhParam: any): Array<any> {
    if (!seacrhParam) {
      return value;
    }
    if (!value) {
      return null;
    }
    return value.filter(categ => categ.nameEN.toLowerCase().includes(seacrhParam.toLowerCase()));
  }

}
