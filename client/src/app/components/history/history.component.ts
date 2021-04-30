import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import Measuring from '../../model/measuring';
import { AnimationOptions } from 'ngx-lottie';
import { Location } from "@angular/common";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  measures: Measuring[] = [];
  showLoading = true;
  options: AnimationOptions = {
    path: 'assets/animations/thermometer.json'
  };

  constructor(private db: AngularFireDatabase,
              private location: Location) {
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
  }

  back(): void {
    this.location.back();
  }
}
