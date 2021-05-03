import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import Measuring from '../../model/measuring';
import { AnimationOptions } from 'ngx-lottie';
import { Location } from '@angular/common';
import { HistoryDataService } from "../../services/history-data.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  private measures: Measuring[] = [];
  showLoading = true;
  currentDate?: string;
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

      this.showLoading = false;

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.measures.push(data[key]);
        }
      }
    });

    const date = new Date();

    const year = new Intl.DateTimeFormat('de', {year: 'numeric'}).format(date);
    const month = new Intl.DateTimeFormat('de', {month: 'short'}).format(date);
    const day = new Intl.DateTimeFormat('de', {day: '2-digit'}).format(date);

    this.currentDate = `${ day }. ${ month } ${ year }`;
  }

  getMeasuresOfCurrentDay(): Measuring[] {
    const measures = this.historyDataService.getMeasuresOfCurrentDay(this.measures);

    measures.forEach(m => {
      const date = new Date(parseInt(m.timestamp.toString(), 0));

      const hours = ('0' + date.getHours()).slice(-2);
      const minutes = ('0' + date.getMinutes()).slice(-2);
      const seconds = ('0' + date.getSeconds()).slice(-2);

      m.label = `${ hours }:${ minutes }:${ seconds }`;
    });

    return measures;
  }

  back(): void {
    this.location.back();
  }
}
