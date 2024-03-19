import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone:true
})
export class Capitalize implements PipeTransform {
  /**
   * Transforming values to respective format
   * @param value 
   * @returns 
   */
  transform(value: any): string {
    let first = value.substr(0,1).toUpperCase();
    return first + value.substr(1); 
  }
}
