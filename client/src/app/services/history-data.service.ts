import { Injectable } from '@angular/core';
import Measuring from '../model/measuring';

@Injectable({
  providedIn: 'root'
})
export class HistoryDataService {

  constructor() {
  }

  getMeasuresOfCurrentDay(measures: Measuring[]): Measuring[] {
    const measuresOfCurrentDay: Measuring[] = []
    const currentTime = new Date();

    measures.forEach(m => {
      const measureDate = new Date(m.timestamp);

      if (measureDate.getDay() === currentTime.getDay()
        && measureDate.getMonth() === currentTime.getMonth()
        && measureDate.getFullYear() === currentTime.getFullYear()) {
        measuresOfCurrentDay.push(m);
      }
    });

    return measuresOfCurrentDay;
  }
}
