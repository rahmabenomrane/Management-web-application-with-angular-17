import { Component, ViewChild } from '@angular/core';
import { DashboardService } from 'src/app/modules/recouvrement/services/dashboard.service';
import { EntityService } from 'src/app/modules/recouvrement/services/entity.service'; 
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  ApexXAxis,
  NgApexchartsModule,
} from "ng-apexcharts";
import { NumberSuffixPipe } from 'src/app/number-suffix.pipe';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { Entity } from 'src/app/modules/recouvrement/models/entity';
import { ButtonModule } from 'primeng/button';
import { StatusBarService } from 'src/app/core/services/status-bar.service';

export type ChartOptions4 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
  colors: string[];
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

export type ChartOptions3 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: string[];
  fill: any,
  legend: ApexLegend;
};

export type ChartOptions2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

export type ChartOptions5 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
  grid: ApexGrid
};

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [RouterModule, NgApexchartsModule, NumberSuffixPipe, DropdownModule, FormsModule, InputTextModule, MultiSelectModule, ChipModule, TagModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  public chartOptions: Partial<ChartOptions>;
  filtre = [{ entities: [], period: 6, periodType: "m" }]
  entityOptions: Entity[] = []
  selectedEntities: Entity[] = [];
  public chartOptions2: Partial<ChartOptions2>;
  amount: number = 0
  remainingDelay: number = 0
  actionToDo: number = 0
  dateImporation: any
  soldeComplete = false
  forcastComplete = false
  agingBalanceComplete = false

  @ViewChild("chart2") chart2: ChartComponent;
  @ViewChild("chart") chart: ChartComponent;

  @ViewChild("chart3") chart3: ChartComponent;
  public chartOptions3: Partial<ChartOptions3>;

  @ViewChild("chart4") chart4: ChartComponent;
  public chartOptions4: Partial<ChartOptions4>;

  @ViewChild("chart5") chart5: ChartComponent;
  public chartOptions5: Partial<ChartOptions5>;
  blockedDocument: boolean = false;

  constructor(private entityService: EntityService, private dashboardService: DashboardService, private statusBarService : StatusBarService) {
    this.chartOptions2 = {
      series: [

      ],
      chart: {

        height: 400,
        type: "bar",

      },
      colors: [
        "#0080a9",
        "#f7ee00",
        "#ff8f00",
        "#cf75f1",
        "#ff0081",
        "#da3b30",

      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: true
      },
      grid: {
        show: false
      },
      xaxis: {

      }
      ,
      yaxis: {
        tickAmount: 7,
        forceNiceScale: true,
      }
    };
    this.chartOptions = {
      series: [{ "data": [], type: "column", name: "solde Echu", }, { "data": [], type: "column", name: "solde Total", }, { "data": [], type: "line", name: "Taux de retard", }]
      ,
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },


      xaxis: {
        categories: [],
      },
      yaxis: [



        {
          seriesName: 'solde Echu',
          min: 0,
          max: 200,
          show: false,
          forceNiceScale: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: false,

          },
          labels: {

          },
          title: {


          },
          tooltip: {
            enabled: false
          }
        },
        {
          max: 100,
          min: 0,
          seriesName: 'Tauxretards',

          tickAmount: 4,
          showAlways: true,
          forceNiceScale: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: false,

          },
          labels: {

          },
          title: {


          },
          tooltip: {
            enabled: false
          }
        },

        {
          seriesName: 'taux de retard',

          max: 100,
          min: 0,
          tickAmount: 4,
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,

          },
          labels: {
            formatter: (value) => { return value + " %" },
          },
          title: {
            text: "",

          },

        },



      ],

    };

    this.chartOptions3 = {
      series: [44, 55, 13, 43, 22, 22, 22, 22],

      chart: {
        type: "donut",
        height: 350,
      },

      fill: {
        colors: [
          "#AEDA34",
          "#B0EF00",
          "#ABCF5D",
          "#34D2D9",
          "#0080A9",

        ],
      },
      legend: {

        position: "bottom",
        markers: {
          fillColors: [
            "#AEDA34",
            "#B0EF00",
            "#ABCF5D",
            "#34D2D9",
            "#0080A9",

          ],
        },


      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E", "Team E", "Team E", "Team E"],

    };
    this.chartOptions4 = {
      series: [

      ],
      chart: {

        type: "bar",
        height: 400,
        stacked: true,
        width: '100%',
        redrawOnWindowResize: true

      },

      responsive: [
        {
          breakpoint: 850,
          options: {
            legend: {
              position: "left",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        type: "category",
        categories: [

        ]
      },
      legend: {
        position: "bottom",
        offsetY: 7,
        markers: {
          fillColors: [
            "#DD5746", "#EAE974", "#96C334",
          ],
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {

        colors: ["#DD5746", "#EAE974", "#96C334",],
      }
    };
    this.chartOptions5 = {
      series: [{ "data": [], name: "Délai réalisée", type: 'line', }, { "data": [], name: "Délai convenu", type: 'line', }, { data: [], type: 'line', name: "retard" }, { data: [], type: 'column', name: "taux de retard" },],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },

      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: [],
      },
      yaxis: [


        {
          min: 0,
          max: 200,
          forceNiceScale: true,
          show: false,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,

          },
          labels: {

          },
          title: {


          },
          tooltip: {
            enabled: false
          }
        },
        {
          min: 0,
          max: 200,
          show: false,
          forceNiceScale: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: false,

          },
          labels: {

          },
          title: {


          },
          tooltip: {
            enabled: false
          }
        },
        {
          seriesName: 'retard',
          min: 0,
          max: 200,
          showAlways: true,
          forceNiceScale: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: false,

          },
          labels: {

          },
          title: {


          },
          tooltip: {
            enabled: false
          }
        },

        {
          seriesName: 'taux de retard',

          max: 100,
          min: 0,
          tickAmount: 4,
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,

          },
          labels: {
            formatter: (value) => { return value + " %" },
          },
          title: {


          },

        },



      ],

    };

  }

  ngOnInit(): void {
    this.entityService
      .getEntities("")
      .subscribe((data) => {


        this.entityOptions = data.data.entity
        if (this.entityOptions && this.entityOptions.length > 0) {
          if (this.entityOptions.length == 1) {
            this.selectedEntities = [this.entityOptions[0]]
            console.log("this.selectedEntities", this.selectedEntities)
            localStorage.setItem("entityGlobal", JSON.stringify(this.selectedEntities))

            //console.log(this.selectedEntities)
            /*   this.selectedEntities = this.entityOptions[0].entityId

              localStorage.setItem("entityGlobal", this.selectedEntities) */
          }
        }


      });

    let globalEntity = JSON.parse(localStorage.getItem("entityGlobal"))
    if (globalEntity) {
      this.selectedEntities = globalEntity
      let entity = []
      globalEntity.forEach(element => {
        entity.push({
          entityId: element.entityId
        })
      });


      this.filtre[0].entities = entity
    }




    this.dashboardService
      .getCustomersAmountDelayPerDays(this.filtre)
      .subscribe((response) => {
        let chartAmountDelayPerDays = response.data.Chart
        if (chartAmountDelayPerDays) {
          let labels = []
          let data = []
          chartAmountDelayPerDays.forEach((element) => {

            labels.push(element.key)


            data.push(parseFloat(element.value.toFixed(2)))

          });
        
          this.chartOptions2.series = [{ "data": data }];
          this.chartOptions2.xaxis = {
            categories: labels,
            labels: {
              style: {

                fontSize: "12px"
              }
            }
          };
          this.agingBalanceComplete = true
        }
    });

    this.dashboardService.getEvoluationDelay(this.filtre).subscribe((response) => {
      let labels = []
      let dataToal = []
      let dataEchu = []
      let dataEchuRate = []
      if (response.data.ChartBalance) {
        response.data.ChartBalance.forEach(element => {
          labels.push(element.key)
          dataToal.push(parseFloat(element.value.toFixed(2)))
        });
      }
      if (response.data.ChartRemainingDelay) {
        response.data.ChartRemainingDelay.forEach(element => {
          dataEchu.push(parseFloat(element.value.toFixed(2)))
        });
      }
      if (response.data.ChartRemainingDelayRate) {
        response.data.ChartRemainingDelayRate.forEach(element => {
          dataEchuRate.push(parseFloat(element.value.toFixed(2)))
        });
      }
      const array1 = dataToal.concat(dataEchu)

      let max = Math.max(...array1);
      this.chartOptions.series = [{ "data": dataEchu, type: "column", name: "solde Echu", }, { "data": dataToal, type: "column", name: "solde Total", }, { "data": dataEchuRate, type: "line", name: "Taux de retard", }];
      this.chartOptions.xaxis = {
        tickAmount: 4,
        categories: labels
      }

      this.chartOptions.yaxis[0].max = max
      this.chartOptions.yaxis[1].max = max



    })

    this.dashboardService.getRecoveryForcast(this.filtre).subscribe((response) => {
      let labels = []
      let dataPromise = []
      let dataRetard = []
      let dataForecast = []

      if(response.data.ChartDelay){
        response.data.ChartDelay.forEach((element) => {
          dataRetard.push(element.value)
        })
      }
      if(response.data.Chart){
        response.data.Chart.forEach((element) => {
          labels.push(element.key)

          dataPromise.push(0)
          dataForecast.push(element.value)

        })
      }
      this.chartOptions4.series = [{ "data": dataRetard, name: "en retard" }, { "data": dataPromise, name: "dont Promesses de règlement" }, { "data": dataForecast, name: "Prévision comportement de paiement" },];
      this.chartOptions4.xaxis = {
        tickAmount: 4,
        categories: labels
      }
      this.forcastComplete = true

    })

    this.dashboardService
      .getCustomersAmountDelay(this.filtre)
      .subscribe((response) => {
        if (response.data.OutPuts && response.data.OutPuts.length > 0) {

          let tnd = new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'TND',
          });
          this.amount = parseFloat(response.data.OutPuts[0].Amount)




          this.remainingDelay = parseFloat(response.data.OutPuts[0].RemainingDelay)
          this.actionToDo = response.data.OutPuts[0].ActionToDo
          this.soldeComplete = true
        }
      })


    this.dashboardService
      .getEvolutionRecoveryDelay(this.filtre)
      .subscribe((response) => {
        let labels = []
        let dataDr = []
        let dataDp = []
        let dataTauxRetard = []
        let retard = []
        if(response.data.AvgAgreedDSO){
          response.data.AvgAgreedDSO.forEach((element) => {
            labels.push(element.key)
            dataDr.push(parseFloat(element.value.toFixed(2)))
          })
        }
        if(response.data.AvgRealDSO){
          response.data.AvgRealDSO.forEach((element) => {
            dataDp.push(parseFloat(element.value.toFixed(2)))
          })
        }
        if(response.data.AvgDelay){
          response.data.AvgDelay.forEach((element) => {
            retard.push(parseFloat(element.value.toFixed(2)))
          })
        }
        if(response.data.AvgDelayRate){
          response.data.AvgDelayRate.forEach((element) => {
            dataTauxRetard.push(parseFloat(element.value.toFixed(2)))
          })
        }
        /*  response.data.tt_EvolutionRecoveryDelay.forEach((element) => {
           labels.push(element.period)
           dataDr.push(parseFloat(element.DRC.toFixed(2)))
           dataDp.push(parseFloat(element.DRR.toFixed(2)))
           dataTauxRetard.push(parseFloat(element.delayRate.toFixed(2)))
           retard.push(parseFloat(element.delay.toFixed(2)))
 
         }) */

        const array1 = dataDr.concat(dataDp)
        const array2 = array1.concat(retard)
        let max = Math.max(...array2);

        this.chartOptions5.series = [{ "data": dataDp, name: "Délai réalisée", type: 'line', }, { "data": dataDr, name: "Délai convenu", type: 'line', }, { data: retard, type: 'line', name: "retard" }, { data: dataTauxRetard, type: 'column', name: "taux de retard" },];
        this.chartOptions5.xaxis = {
          tickAmount: 4,
          categories: labels
        }

        this.chartOptions5.yaxis[0].max = max
        this.chartOptions5.yaxis[1].max = max
        this.chartOptions5.yaxis[2].max = max
      })
    this.dashboardService
      .getSituationDateDashboard(this.filtre)
      .subscribe((response) => {
        if (response && response.data && response.data.importDate && response.data.importDate.length > 0) {
          this.dateImporation = response.data.importDate[0].importDate;
          this.statusBarService.addStatusBarItem('fa-solid fa-calendar-days', `date d'importation : ${this.dateImporation}`, 'right', () => {});
        }
      })

     

  }

  getDataWithEntity() {
    localStorage.setItem("entityGlobal", JSON.stringify(this.selectedEntities))
    console.log("888888888888", this.selectedEntities)
    let entity = []
    this.selectedEntities.forEach(element => {
      entity.push({
        entityId: element.entityId
      })
    });
    this.filtre[0].entities = entity

    this.dashboardService
      .getCustomersAmountDelayPerDays(this.filtre)
      .subscribe((response) => {
        let chartAmountDelayPerDays = response.data.Chart

        let labels = []
        let data = []
        chartAmountDelayPerDays.forEach((element) => {

          labels.push(element.key)


          data.push(parseFloat(element.value.toFixed(2)))

        });
        this.chartOptions2.series = [{ "data": data }];
        this.chartOptions2.xaxis = {
          categories: labels,
          labels: {
            style: {

              fontSize: "12px"
            }
          }
        };
        this.agingBalanceComplete = true
      });
    this.dashboardService.getEvoluationDelay(this.filtre).subscribe((response) => {
      let labels = []
      let dataToal = []
      let dataEchu = []
      let dataEchuRate = []
      response.data.ChartBalance.forEach(element => {
        labels.push(element.key)
        dataToal.push(parseFloat(element.value.toFixed(2)))
      });
      response.data.ChartRemainingDelay.forEach(element => {
        dataEchu.push(parseFloat(element.value.toFixed(2)))
      });
      response.data.ChartRemainingDelayRate.forEach(element => {
        dataEchuRate.push(parseFloat(element.value.toFixed(2)))
      });

      const array1 = dataToal.concat(dataEchu)

      let max = Math.max(...array1);
      this.chartOptions.series = [{ "data": dataEchu, type: "column", name: "solde Echu", }, { "data": dataToal, type: "column", name: "solde Total", }, { "data": dataEchuRate, type: "line", name: "Taux de retard", }];
      this.chartOptions.xaxis = {
        tickAmount: 4,
        categories: labels
      }

      this.chartOptions.yaxis[0].max = max
      this.chartOptions.yaxis[1].max = max



    })

    this.dashboardService.getRecoveryForcast(this.filtre).subscribe((response) => {
      let labels = []
      let dataPromise = []
      let dataRetard = []
      let dataForecast = []
      response.data.ChartDelay.forEach((element) => {
        dataRetard.push(element.value)
      })

      response.data.Chart.forEach((element) => {
        labels.push(element.key)

        dataPromise.push(0)
        dataForecast.push(element.value)

      })
      this.chartOptions4.series = [{ "data": dataRetard, name: "en retard" }, { "data": dataPromise, name: "dont Promesses de règlement" }, { "data": dataForecast, name: "Prévision comportement de paiement" },];
      this.chartOptions4.xaxis = {
        tickAmount: 4,
        categories: labels
      }
      this.forcastComplete = true

    })

    this.dashboardService
      .getCustomersAmountDelay(this.filtre)
      .subscribe((response) => {
        let tnd = new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'TND',
        });
        this.amount = parseFloat(response.data.OutPuts[0].Amount)




        this.remainingDelay = parseFloat(response.data.OutPuts[0].RemainingDelay)
        this.actionToDo = response.data.OutPuts[0].ActionToDo
        this.soldeComplete = true

      })


    this.dashboardService
      .getEvolutionRecoveryDelay(this.filtre)
      .subscribe((response) => {
        let labels = []
        let dataDr = []
        let dataDp = []
        let dataTauxRetard = []
        let retard = []
        response.data.AvgAgreedDSO.forEach((element) => {
          labels.push(element.key)
          dataDr.push(parseFloat(element.value.toFixed(2)))
        })

        response.data.AvgRealDSO.forEach((element) => {
          dataDp.push(parseFloat(element.value.toFixed(2)))
        })

        response.data.AvgDelay.forEach((element) => {
          retard.push(parseFloat(element.value.toFixed(2)))
        })
        response.data.AvgDelayRate.forEach((element) => {
          dataTauxRetard.push(parseFloat(element.value.toFixed(2)))
        })
        /*  response.data.tt_EvolutionRecoveryDelay.forEach((element) => {
           labels.push(element.period)
           dataDr.push(parseFloat(element.DRC.toFixed(2)))
           dataDp.push(parseFloat(element.DRR.toFixed(2)))
           dataTauxRetard.push(parseFloat(element.delayRate.toFixed(2)))
           retard.push(parseFloat(element.delay.toFixed(2)))
 
         }) */

        const array1 = dataDr.concat(dataDp)
        const array2 = array1.concat(retard)
        let max = Math.max(...array2);

        this.chartOptions5.series = [{ "data": dataDp, name: "Délai réalisée", type: 'line', }, { "data": dataDr, name: "Délai convenu", type: 'line', }, { data: retard, type: 'line', name: "retard" }, { data: dataTauxRetard, type: 'column', name: "taux de retard" },];
        this.chartOptions5.xaxis = {
          tickAmount: 4,
          categories: labels
        }

        this.chartOptions5.yaxis[0].max = max
        this.chartOptions5.yaxis[1].max = max
        this.chartOptions5.yaxis[2].max = max
      })
  }
  searchEntity(event: any) {
    console.log(event)
    this.entityService
      .getEntities(event.filter)
      .subscribe((data) => {

        this.entityOptions = data.data.entity
        console.log(this.entityOptions)

        this.selectedEntities.forEach(selected => {
          const found = this.entityOptions.find((element) => element.entityId == selected.entityId);
          if (!found) {
            this.entityOptions.push(selected)
          }

        });

      });
  }
  ngOnDestroy() {
    this.statusBarService.clearStatusBarItems();
  }

}
