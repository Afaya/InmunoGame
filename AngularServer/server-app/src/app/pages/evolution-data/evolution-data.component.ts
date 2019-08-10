import { Component, OnInit } from '@angular/core';
import { EvolutionDataModel, GraphDataModel } from 'src/app/models/chart';
import { DataReadService } from 'src/app/services/data-read.service';
import { Chart } from 'chart.js';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evolution-data',
  templateUrl: './evolution-data.component.html',
  styleUrls: ['./evolution-data.component.scss']
})
export class EvolutionDataComponent implements OnInit {

  receivedData: EvolutionDataModel[];
  chartInfluenza: any;
  chartAllergy: any;

  temperatureLevelHighRisk = 5;
  temperatureLevelMediumRisk = 10;
  humidityLevelHighRisk = 20;
  humidityLevelMediumRisk = 30;
  particlesLevelExtraHighRisk = 150;
  particlesLevelHighRisk = 100;
  particlesLevelMediumRisk = 50;

  constructor(private dataReadService: DataReadService, private spinnerService: SpinnerService, private router: Router) { }

  ngOnInit() {
    this.spinnerService.startOnLoading();
    this.dataReadService.getEvolutionData().subscribe(
      data => {
        this.receivedData = data;
        this.createLineGraphs();
      }
    );
  }

  createLineGraphs(): void {
    const days: string[] = this.receivedData.map(item => this.formatDate(item.getData_date));
    const influenzaList: number[] = this.receivedData.map(item => this.calculateInfluenzaValue(item.humidity, item.temperature));
    const allergyList: number[] = this.receivedData.map(item => this.calculateParticlesRisk(item.particle25, item.particle100));

    this.chartInfluenza = new Chart('canvasInfluenza', {
      type: 'line',
      data: {
        labels: days,
        datasets: [{
          label: 'Gripe',
          data: influenzaList,
          borderColor: 'Aqua'
        }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Nivel'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Días'
            }
          }]
        }
      }
    });

    this.chartAllergy = new Chart('canvasAllergy', {
      type: 'line',
      data: {
        labels: days,
        datasets: [
          {
            label: 'Alergia',
            data: allergyList,
            borderColor: 'LightPink'
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Nivel'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Días'
            }
          }]
        }
      }
    });

    this.spinnerService.finishOnLoading();

  }

  calculateInfluenzaValue(humidity: number, temperature: number): number {
    if (temperature < this.temperatureLevelHighRisk && humidity < this.humidityLevelHighRisk) {
      return 4;
    } else if (temperature < this.temperatureLevelHighRisk || humidity < this.humidityLevelHighRisk) {
      return 3;
    } else if (temperature < this.temperatureLevelMediumRisk && humidity < this.humidityLevelMediumRisk) {
      return 2;
    } else {
      return 1;
    }
  }

  calculateParticlesRisk(pm25: number, pm100: number): number {
    if (pm25 > this.particlesLevelExtraHighRisk && pm100 > this.particlesLevelExtraHighRisk) {
      return 4;
    } else if (pm25 > this.particlesLevelHighRisk || pm100 > this.particlesLevelHighRisk) {
      return 3;
    } else if (pm25 > this.particlesLevelMediumRisk || pm100 > this.particlesLevelMediumRisk) {
      return 2;
    } else {
      return 1;
    }
  }

  formatDate(dateToFormat: Date): string {
    let formattedDate = '';
    const currentDate = new Date(dateToFormat);
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    formattedDate += day < 10 ? ('0' + day) : day;
    formattedDate += '/';
    formattedDate += month < 10 ? ('0' + month) : month;
    formattedDate += '/';
    formattedDate += year;

    return formattedDate;
  }

  returnHome(): void {
    this.router.navigate(['/home']);
  }
}


