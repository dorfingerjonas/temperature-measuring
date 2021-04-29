import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(timestamp: string): string {
    const date = new Date(parseInt(timestamp, 0));

    const year = new Intl.DateTimeFormat('de', {year: 'numeric'}).format(date);
    const month = new Intl.DateTimeFormat('de', {month: 'short'}).format(date);
    const day = new Intl.DateTimeFormat('de', {day: '2-digit'}).format(date);
    const weekDay = new Intl.DateTimeFormat('de', {weekday: 'short'}).format(date);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    return `${ weekDay }, ${ day }. ${ month } ${ year } ${ hours }:${ minutes }:${ seconds }`;
  }
}
