import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(data: any, value): any[] {
    if (value && value !== '' && data && data.length) {
      // checking if the data is not empty and search string is not empty
      return data.filter(state => {
        // Filtering values based on the input given
        return (state[1].toString().toLowerCase().includes(value.toLowerCase()));
      })
    }
    return data;
  }

}
