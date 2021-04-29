import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-current-temp',
  templateUrl: './current-temp.component.html',
  styleUrls: ['./current-temp.component.scss']
})
export class CurrentTempComponent implements OnInit {

  temperature?: number;
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

      if (measuring.temperature && measuring.timestamp) {
        this.temperature = measuring.temperature;
        this.time = measuring.timestamp;
      }
    });
  }
}
