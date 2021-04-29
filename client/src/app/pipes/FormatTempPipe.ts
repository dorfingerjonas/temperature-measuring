import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTemperature'
})
export class FormatTemperaturePipe implements PipeTransform {
  transform(temperature: number): string {
    const tempParts: string[] = temperature.toString().split('.');

    if (tempParts.length > 1) {
      return `${ tempParts[0] },${ Math.round(parseFloat(tempParts[1]) / 100) }`;
    } else {
      return `${ temperature },0`;
    }
  }
}
