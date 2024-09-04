import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexGrid,
  ApexResponsive,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  ApexXAxis,
  NgApexchartsModule,


} from "ng-apexcharts";
import { DashboardService } from '../../services/dashboard.service';
import { AutocompleteService } from '../../services/autocomplete.service';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PlanningService } from '../../services/planning.service';

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
  title: ApexTitleSubtitle;
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
export type ChartOptions4 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
  title: ApexTitleSubtitle;
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



interface EventItem {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
}
@Component({
  selector: 'customer-details',
  standalone: true,
  imports: [TagModule, TabViewModule, TableModule, CommonModule, DialogModule, ButtonModule, NgApexchartsModule, TimelineModule, DropdownModule, FormsModule,],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent {

 //  public chart: any ;
 blockedDocument: boolean = false;
 @ViewChild("table")
 table: any;
 @ViewChild("chart2") chart2: ChartComponent;
 public chartOptions2: Partial<ChartOptions2>;

 @ViewChild("chart") chart: ChartComponent;
 public chartOptions: Partial<ChartOptions>;

 @ViewChild("chart4") chart4: ChartComponent;
 public chartOptions4: Partial<ChartOptions4>;
 @ViewChild("chart5") chart5: ChartComponent;
 public chartOptions5: Partial<ChartOptions5>;
 public chartProduct: any;
 public pieChart: any;
 totalRecords: number = 0;
 visible: boolean = false;
 loading = true
 first = 0;

 rows = 10;
 events: EventItem[];
 filtre = [{ "customerID": "", entity: "", period: 6, periodType: "m", customerCode: "", chartName: "", searchFor: "", searchForType: "" }]

 totalLines = 0
 invoiceAmtTotal = 0
 remainingAmtTotal = 0
 customer: any = []
 customerInvoices: any = []
 customerEntity: any = []
 selectedInvoices = []


 customerDetailsCompelte = false
 customerInvoicesCompelte = false

 soldeComplete = false
 forcastComplete = false
 agingBalanceComplete = false

 relances = [

 ]
 entityOptions = []
 selectedEntities: any | undefined;


 constructor(private planningService: PlanningService, private autocompleteservice: AutocompleteService, private dashboardService: DashboardService, private _Activatedroute: ActivatedRoute) {

   this.events = [
     { status: '-5', date: '15/10/2020 10:30', icon: 'pi pi-phone', color: '#9C27B0', image: 'game-controller.jpg' },
     { status: '+5', date: '15/10/2020 14:00', icon: 'pi pi-at', color: '#673AB7' },
     { status: '+12', date: '15/10/2020 16:15', icon: 'pi pi-envelope', color: '#FF9800' },
     { status: '+15', date: '16/10/2020 10:00', icon: 'pi pi-envelope', color: '#607D8B' },
     { status: '+18', date: '16/10/2020 10:00', icon: 'pi pi-at', color: '#607D8B' },
     { status: '+23', date: '16/10/2020 10:00', icon: 'pi pi-phone', color: '#607D8B' },
     { status: '+28', date: '16/10/2020 10:00', icon: 'pi  pi-envelope', color: '#607D8B' },
     { status: '+35', date: '16/10/2020 10:00', icon: 'pi pi-at', color: '#607D8B' }
   ];

   this.chartOptions2 = {
     title: {
       "text": "Balance agé",
       offsetX: 350
     },
     series: [

     ],
     chart: {
       height: 400,
       type: "bar",
       width: '100%',

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
       labels: {
         formatter: function (value) {
           return new Intl.NumberFormat('fr-TN', { style: 'currency', currency: 'TND' }).format(
             value,
           )
         }
       },
     }
   };

   this.chartOptions = {
     series: [],
     chart: {
       height: 350,
       type: 'line',
       stacked: false
     },
     dataLabels: {
       enabled: false
     },
     stroke: {
       width: [1, 1, 4]
     },

     xaxis: {
       categories: [],
     },
     yaxis: [


       {
         max: 100,
         min: 0,
         show: false,
         forceNiceScale: true,
         seriesName: 'solde Echu',

         axisTicks: {
           show: true,
         },
         axisBorder: {
           show: true,
           color: '#00E396'
         },
         labels: {
           style: {
             colors: '#00E396',
           }
         },
         title: {
           text: "Encours echu",
           style: {
             color: '#00E396',
           }
         },
       },
       {
         seriesName: 'solde Total',
         max: 100,
         min: 0,
         showAlways: true,
         forceNiceScale: true,
         axisTicks: {
           show: true,
         },
         axisBorder: {
           show: true,

         },
         labels: {
           style: {

           }
         },
         title: {

         },
         tooltip: {
           enabled: true
         }
       },
       {
         max: 100,
         min: 0,
         seriesName: 'Tauxretards',

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

         }
       },
     ],
     tooltip: {

     },
     legend: {
       horizontalAlign: 'left',
       offsetX: 40
     }
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
           "#EAE974", "#96C334"
         ],
       },
     },
     dataLabels: {
       enabled: false,
     },
     fill: {

       colors: ["#EAE974", "#96C334"],
     }
   };
   this.chartOptions5 = {
     series: [],
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


 relnaces = [
   {
     date: "01/12/2023",
     typeAction: "Email",
     action: "rappel par e-mail N°2",
     montant: 24775,

   },

 ]
 ngOnInit(): void {
   console.log("this._Activatedroute.queryParams", this._Activatedroute.queryParams)
   this._Activatedroute.queryParams.subscribe(
     params => {
       this.filtre[0].customerID = params['id'];
       this.filtre[0].entity = params['entity'];
       if (params['entity'] != "")
         this.selectedEntities = params['entity']
       this.filtre[0].customerCode = params['code'];
       this.filtre[0].chartName = params['chartName'];
       this.filtre[0].searchFor = params['period'];
       this.filtre[0].searchForType = params['periodType'];
     }
   )


   this.dashboardService
     .getCustomerById(this.filtre)
     .subscribe((data) => {

       if (data.data.customer) {

         this.customer = data.data.customer

       }

       if (data.data.customerEntity) {
         this.customerEntity = data.data.customerEntity
       }
       this.customerDetailsCompelte = true


     });




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
     console.log(response)
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
     console.log(max)
     this.chartOptions.series = [{ "data": dataEchu, type: "column", name: "solde Echu", }, { "data": dataToal, type: "column", name: "solde Total", }, { "data": dataEchuRate, type: "line", name: "Taux de retard", }];
     this.chartOptions.xaxis = {
       tickAmount: 4,
       categories: labels
     }

     this.chartOptions.yaxis[0].max = max
     this.chartOptions.yaxis[1].max = max

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
         dataDr.push(element.value)
       })

       response.data.AvgRealDSO.forEach((element) => {
         dataDp.push(element.value)
       })

       response.data.AvgDelay.forEach((element) => {
         retard.push(element.value)
       })
       response.data.AvgDelayRate.forEach((element) => {
         dataTauxRetard.push(element.value)
       })
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


   this.dashboardService.getRecoveryForcast(this.filtre).subscribe((response) => {
     let labels = []
     let dataPromise = []
     let dataForecast = []
     console.log("forecast", response)
     response.data.Chart.forEach((element) => {
       labels.push(element.key)

       dataPromise.push(0)
       dataForecast.push(element.value)
       this.chartOptions4.series = [{ "data": dataPromise, name: "dont Promesses de règlement" }, { "data": dataForecast, name: "Prévision comportement de paiement" },];
       this.chartOptions4.xaxis = {
         tickAmount: 4,
         categories: labels
       }
     })
     this.forcastComplete = true

   })


 }





 loadInvoices(event: any) {
   console.log(event)

   const page = (event.first + event.rows) / event.rows
   const rows = event.rows
   const sortField = event.sortField
   const sortOrder = event.sortOrder == -1 ? "desc" : ""

   this.loading = true;

   setTimeout(() => {
     this.dashboardService.getCustomerInvoices(page, rows, sortField, sortOrder, this.filtre).subscribe((res) => {
       console.log("ressssss", res)
       this.customerInvoices = res.data.customerEntityInvoice
       this.totalRecords = res.data.paginate[0].totalRecords;
       this.invoiceAmtTotal = res.data.totalInvoice[0].Amount;
       this.remainingAmtTotal = res.data.totalInvoice[0].Delay;

       this.loading = false;
       this.customerInvoicesCompelte = true

     });
   }, 1000);
 }

 loadActions(event: any) {



   this.loading = true;

   setTimeout(() => {
     this.planningService.getPlanningCustActions(this.filtre).subscribe((res) => {
       this.relances = res.data.RecoveryPlan

     });
   }, 1000);
 }



 searchEntity(event: any) {
   console.log(event)
   this.autocompleteservice
     .getEntities(event.filter)
     .subscribe((data) => {

       this.entityOptions = data.data.entity
       console.log(this.entityOptions)

     });
 }
 selectEntity(event: any) {
   this.customerInvoicesCompelte = false
   this.customerDetailsCompelte = false

   this.soldeComplete = false
   this.forcastComplete = false
   this.agingBalanceComplete = false
   this.filtre[0].customerID = this._Activatedroute.snapshot.paramMap.get("id");
   if (event.value != null)
     this.filtre[0].entity = event.value;

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
     console.log(response)
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
     console.log(max)
     this.chartOptions.series = [{ "data": dataEchu, type: "column", name: "solde Echu", }, { "data": dataToal, type: "column", name: "solde Total", }, { "data": dataEchuRate, type: "line", name: "Taux de retard", }];
     this.chartOptions.xaxis = {
       tickAmount: 4,
       categories: labels
     }

     this.chartOptions.yaxis[0].max = max
     this.chartOptions.yaxis[1].max = max
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
         dataDr.push(element.value)
       })

       response.data.AvgRealDSO.forEach((element) => {
         dataDp.push(element.value)
       })

       response.data.AvgDelay.forEach((element) => {
         retard.push(element.value)
       })
       response.data.AvgDelayRate.forEach((element) => {
         dataTauxRetard.push(element.value)
       })
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


   this.dashboardService.getRecoveryForcast(this.filtre).subscribe((response) => {
     let labels = []
     let dataPromise = []
     let dataForecast = []
     console.log("forecast", response)
     response.data.Chart.forEach((element) => {
       labels.push(element.key)

       dataPromise.push(0)
       dataForecast.push(element.value)
       this.chartOptions4.series = [{ "data": dataPromise, name: "dont Promesses de règlement" }, { "data": dataForecast, name: "Prévision comportement de paiement" },];
       this.chartOptions4.xaxis = {
         tickAmount: 4,
         categories: labels
       }
     })
     this.forcastComplete = true

   })
   this.loadInvoices(this.table.createLazyLoadMetadata())
 }
 clearSort() {
   this.table.reset()
 }
 showDialog() {
   /*  if (this.selectedInvoices.length == 0) {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Vous devez séléctionner au moins une ligne' });
    }
    else {
      this.visible = true;
    } */



 }
}

