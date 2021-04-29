import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTemperature'
})
export class FormatTemperaturePipe implements PipeTransform {
  transform(temperature: number): string {
    return temperature.toString().replace('.', ',');
  }
}
