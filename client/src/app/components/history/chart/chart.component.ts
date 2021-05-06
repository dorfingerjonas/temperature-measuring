import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import ChartData from "../../../model/chart-data";
import { Chart } from "chart.js";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() id?: string;
  @Input() name?: string;
  @Input() measures: ChartData[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.measures) {
      setTimeout(() => {
        if (this.id) {
          new Chart(this.id, {
            type: 'line',
            data: {
              labels: this.measures.map(m => m.time),
              datasets: [{
                label: 'Temperatur',
                data: this.measures.map(m => m.temperature),
                fill: false,
                borderColor: 'rgb(25, 118, 210)'
              }]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    stepSize: 0.5,
                    callback: value => `${ value } °C`
                  }
                }]
              },
              tooltips: {
                callbacks: {
                  label: i => `${ i.yLabel } °C`
                }
              },
              responsive: true
            }
          });
        }
      });
    }
  }
}
