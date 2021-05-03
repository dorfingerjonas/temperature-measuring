import { Component, Input, OnInit } from '@angular/core';
import { Chart } from "chart.js";
import Measuring from "../../../model/measuring";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() name?: string;
  @Input() measures: Measuring[] = [];

  constructor() {
  }

  ngOnInit(): void {
    if (this.name) {
      new Chart('chart', {
        type: 'line',
        data: {
          labels: this.measures.map(m => m.label || ''),
          datasets: [{
            label: 'Temperatur',
            data: this.measures.map(m => m.temperature),
            fill: false,
            borderColor: 'rgb(25,118,210)'
          }]
        }
      });
    }
  }
}
