import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-current-temp',
  templateUrl: './current-temp.component.html',
  styleUrls: ['./current-temp.component.scss']
})
export class CurrentTempComponent implements OnInit {

  temperature?: string;
  time?: string;
  showLoading = true;
  options: AnimationOptions = {
    path: 'assets/animations/thermometer.json'
  };

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.db.object('temperature/currentTemperature').valueChanges().subscribe(value => {
      this.showLoading = false;
      const measuring: any = value;

      if (measuring.temp && measuring.timestamp) {
        const tempParts: string[] = measuring.temp.toString().split('.');

        if (tempParts.length > 1) {
          this.temperature = `${ tempParts[0] },${ Math.round(parseFloat(tempParts[1]) / 100) }`;
        } else {
          this.temperature = `${ measuring.temp },0`;
        }

        this.time = `${ this.formatDate(new Date(parseInt(measuring.timestamp, 0))) }`;
      }
    });
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
