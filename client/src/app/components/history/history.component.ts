import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import Measuring from '../../model/measuring';
import { AnimationOptions } from 'ngx-lottie';
import { Location } from '@angular/common';
import { HistoryDataService } from "../../services/history-data.service";
import ChartData from "../../model/chart-data";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  private measures: Measuring[] = [];
  currentDay: ChartData[] = [];
  dailyMaxTemperature: ChartData[] = [];
  showLoading = true;
  currentDate?: string;
  days: string[] = [];
  options: AnimationOptions = {
    path: 'assets/animations/thermometer.json'
  };

  constructor(private db: AngularFireDatabase,
              private location: Location,
              private historyDataService: HistoryDataService) {
  }

  ngOnInit(): void {
    this.db.object('temperature/history').valueChanges().subscribe(value => {
      const data: any = value;
      this.measures = [];

      this.showLoading = false;

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.measures.push(data[key]);
        }
      }

      this.days = this.historyDataService.getDaysWhereDataExists(this.measures);
      this.currentDay = this.historyDataService.getMeasureByDay(this.measures, new Date());
      this.dailyMaxTemperature = this.historyDataService.getMaxTemperaturePerDay(this.measures);

      if (this.days.length === 0 && this.currentDate) {
        this.days.push(this.currentDate);
      }
    });

    const date = new Date();

    const year = new Intl.DateTimeFormat('de', {year: 'numeric'}).format(date);
    const month = new Intl.DateTimeFormat('de', {month: 'short'}).format(date);
    const day = new Intl.DateTimeFormat('de', {day: '2-digit'}).format(date);

    this.currentDate = `${ day }. ${ month } ${ year }`;
  }

  back(): void {
    this.location.back();
  }

  changeDetailDay(): void {
    this.currentDay = this.historyDataService.getMeasureByDay(this.measures, this.stringToDate(this.currentDate!));
  }

  stringToDate(dateString: string): Date {
    const parts = dateString.split(' ');
    const day = parts[0].slice(0, 2);
    const year = parts[2];

    switch (parts[1]) {
      case 'Jan':
        return new Date(`${ year }-01-${ day }`);
      case 'Feb':
        return new Date(`${ year }-02-${ day }`);
      case 'Mär':
        return new Date(`${ year }-03-${ day }`);
      case 'Apr':
        return new Date(`${ year }-04-${ day }`);
      case 'Mai':
        return new Date(`${ year }-05-${ day }`);
      case 'Jun':
        return new Date(`${ year }-06-${ day }`);
      case 'Jul':
        return new Date(`${ year }-07-${ day }`);
      case 'Aug':
        return new Date(`${ year }-08-${ day }`);
      case 'Sep':
        return new Date(`${ year }-09-${ day }`);
      case 'Okt':
        return new Date(`${ year }-10-${ day }`);
      case 'Nov':
        return new Date(`${ year }-11-${ day }`);
      case 'Dez':
        return new Date(`${ year }-12-${ day }`);
    }

    return new Date();
  }
}
