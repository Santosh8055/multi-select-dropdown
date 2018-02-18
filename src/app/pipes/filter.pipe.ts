import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(data: any, value): any[] {
    if (value && value !== '') {
      return data.filter(state => {
        return (state[1].toString().toLowerCase().includes(value.toLowerCase()));
      })
    }
    return data;
  }

}
