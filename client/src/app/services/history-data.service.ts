import { Injectable } from '@angular/core';
import Measuring from '../model/measuring';
import { JsonObject } from "@angular/compiler-cli/ngcc/src/packages/entry_point";
import ChartData from "../model/chart-data";

@Injectable({
  providedIn: 'root'
})
export class HistoryDataService {

  constructor() {
  }

  getMeasureByDay(measures: Measuring[], date: Date): ChartData[] {
    const measuresOfCurrentDay: ChartData[] = []

    measures.forEach(m => {
      const measureDate = new Date(m.timestamp);

      if (measureDate.getDay() === date.getDay()
        && measureDate.getMonth() === date.getMonth()
        && measureDate.getFullYear() === date.getFullYear()) {

        const hours = ('0' + measureDate.getHours()).slice(-2);
        const minutes = ('0' + measureDate.getMinutes()).slice(-2);
        const seconds = ('0' + measureDate.getSeconds()).slice(-2);

        measuresOfCurrentDay.push({
          time: `${ hours }:${ minutes }:${ seconds }`,
          temperature: m.temperature
        })
      }
    });

    return measuresOfCurrentDay;
  }

  getMaxTemperaturePerDay(measures: Measuring[]): ChartData[] {
    const days: string[] = this.getDaysWhereDataExists(measures);
    const result: ChartData[] = [];

    days.forEach(day => {
      result.push({
        time: day,
        temperature: Math.max(...measures.filter(m => m.label === day).map(m => m.temperature))
      });
    });

    return result;
  }

  getDaysWhereDataExists(measures: Measuring[]): string[] {
    const days: string[] = [];

    measures.forEach(m => {
      const measureDate = new Date(m.timestamp);

      const year = new Intl.DateTimeFormat('de', {year: 'numeric'}).format(measureDate);
      const month = new Intl.DateTimeFormat('de', {month: 'short'}).format(measureDate);
      const day = new Intl.DateTimeFormat('de', {day: '2-digit'}).format(measureDate);

      m.label = `${ day }. ${ month } ${ year }`

      if (!days.includes(m.label)) {
        days.push(m.label);
      }
    });

    return days;
  }
}
