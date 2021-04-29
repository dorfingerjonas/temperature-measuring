import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-temp',
  templateUrl: './current-temp.component.html',
  styleUrls: ['./current-temp.component.scss']
})
export class CurrentTempComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  formatDate(date: Date): string {
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
