import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchNameGame',
  pure: false
})
export class SearchNameGamePipe implements PipeTransform {
  transform(value: Array<any>, seacrhParam: any): Array<any> {
    if (!seacrhParam) {
      return value;
    }
    if (!value) {
      return null;
    }
    return value.filter(categ => categ.nameGame.toLowerCase().includes(seacrhParam.toLowerCase()));
  }
}
