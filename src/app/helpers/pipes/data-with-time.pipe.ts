import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateWithTime',
})
export class DateWithTimePipe implements PipeTransform {
  /**
   * Transforming values to respective format
   * @param value 
   * @returns 
   */
  transform(value: any): string {
    const [date, time] = value.toString().split('T');
    const [y, m, d] = date.split('-');
    const [min, sec] = time.split(':');
    return `${m}-${d}-${y} (${min}:${sec})`;
  }
}
