import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchWorker',
  pure: false
})
export class SearchWorkerPipe implements PipeTransform {
  transform(value: Array<any>, seacrhParam: any): Array<any> {
    if (!seacrhParam) {
      return value;
    }
    if (!value) {
      return null;
    }
    return value.filter(categ => categ.professionWorker.toLowerCase().includes(seacrhParam.toLowerCase()));
  }
}
