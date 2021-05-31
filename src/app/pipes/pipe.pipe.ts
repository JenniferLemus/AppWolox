import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class PipePipe implements PipeTransform {

  transform(value: Array<any>, arg: any) {
    debugger;
    if (arg === '' || arg.length < 3) return value;
    const resultFilter = [];
    for (const item of value) {
      if (
        item.tech.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        item.type.toLowerCase().indexOf(arg.toLowerCase()) > -1
      ) {
        resultFilter.push(item);
      }
    }
    return resultFilter;
  }

}
