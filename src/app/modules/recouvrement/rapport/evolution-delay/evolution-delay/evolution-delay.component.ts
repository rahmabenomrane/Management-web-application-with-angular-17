import { Component, ViewChild } from '@angular/core';
import { AutocompleteService } from '../../../services/autocomplete.service';
import { DashboardService } from '../../../services/dashboard.service';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { SidebarModule } from 'primeng/sidebar';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexPlotOptions,
  ApexFill,
  ApexTooltip,
  ApexXAxis,
  NgApexchartsModule,
  ApexGrid,

} from "ng-apexcharts";
import { StatusBarService } from 'src/app/core/services/status-bar.service';

export type ChartOptions = {
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
  grid: ApexGrid,
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'evolution-delay',
  standalone: true,
  imports: [NgApexchartsModule, RouterModule, SidebarModule, ChipModule, TagModule, TableModule, InputTextModule, TabViewModule, CommonModule, DropdownModule, ButtonModule, FormsModule, MultiSelectModule],
  templateUrl: './evolution-delay.component.html',
  styleUrl: './evolution-delay.component.css'
})
export class EvolutionDelayComponent {

  clients = []
  totalRecords = 0
  loading = true
  selectedPeriod: any | undefined;

  showCode = false


  customerCode = ""
  sidebarVisible: boolean = false;

  selectedcustomerType: any[] = []
  customerTypeOptions = []

  selectedCustomers: any[] = []
  customerOptions = []
  entityOptions = []
  selectedEntities: any[] = []
  selectedRecovrer: any[] = []

  selectedRegion: any[] = []
  regionOptions = []
  rangeLabel = []
  customerClassOptions = []
  selectedcustomerClass: any[] = []
  filterRangeIsApplied = false;
  recovrerOptions = []

  recovrerDisabled = false
  displayType = "Balance"
  dateImporation: any

  chartComplete = false
  detailsComplete = false
  radio: string = "Balance"
  seletedPeriod = [{ "periodFilterRC_value": 6, "periodFilterRC_label": "6 mois" }]
  @ViewChild("chart") chart2: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @ViewChild("table")
  table: any;
  period: any[] | undefined;
  cols!: any[];
  filterCols!: any[];
  selectedRange = ""
  constructor(private autocompleteservice: AutocompleteService, private dashboardService: DashboardService, private statusBarService : StatusBarService) {
    this.chartOptions = {
      series: [{ "data": [], type: "column", name: "solde Echu", }, { "data": [], type: "column", name: "solde Total", }, { "data": [], type: "line", name: "Taux de retard", }]
      , chart: {
        selection: {
          enabled: false,
        },
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
        events: {
          click: (event, chartContext, config
          ) => {
            console.log(this.filterRangeIsApplied)
            this.filterRangeIsApplied = true;
            console.log(this.filterRangeIsApplied)
            this.rangeLabel = []
            this.rangeLabel.push(this.filterCols[config.dataPointIndex].label)
            this.selectedRange = this.filterCols[config.dataPointIndex].value
            let element = document.getElementById('btn') as HTMLElement
            element.click()
            this.filtreMethod()

          }
        },
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
            formatter: function (value) {
              return new Intl.NumberFormat('fr-TN', { style: 'currency', currency: 'TND', notation: 'compact' },).format(
                value,
              )
            }
          },
          title: {


          },
          tooltip: {
            enabled: true,

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
            formatter: function (value) {
              return new Intl.NumberFormat('fr-TN', { style: 'currency', currency: 'TND', notation: 'compact' },).format(
                value,
              )
            }
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
      tooltip: {
        y: {
          formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
            if (seriesIndex == 0 || seriesIndex == 1) {
              return new Intl.NumberFormat('fr-TN', { style: 'currency', currency: 'TND' }).format(
                value,
              )
            }
            return value + '%';

          }
        }
      }

    };

  }



  ngOnInit() {
    this.autocompleteservice
      .getRecovrers("")
      .subscribe((data) => {

        this.recovrerOptions = data.data.recovrer
      });
    this.autocompleteservice
      .getCustomerClasses("")
      .subscribe((data) => {
        this.customerClassOptions = data.data.class

      });
    this.autocompleteservice
      .getEntities("")
      .subscribe((data) => {


        this.entityOptions = data.data.entity


      });
    this.autocompleteservice
      .getTypes("")
      .subscribe((data) => {
        this.customerTypeOptions = data.data.type

      });

    this.autocompleteservice
      .getRegion("")
      .subscribe((data) => {
        this.regionOptions = data.data.region

      });
    this.autocompleteservice
      .getCustomersID("")
      .subscribe((data) => {
        this.customerOptions = data.data.customer
      });
    let globalEntity = JSON.parse(localStorage.getItem("entityGlobal"))
    let entity = []
    if (globalEntity) {
      this.showCode = true
      this.selectedEntities = globalEntity
      globalEntity.forEach(element => {
        entity.push({
          entityId: element.entityId
        })
      });
    }
    this.detailsComplete = false
    this.chartComplete = false


    if (globalEntity) {
      this.showCode = true
    }
    this.selectedPeriod = { value: "6", label: "6 mois" }
    this.period = [
      { value: "1", label: "1 mois" },
      { value: "2", label: "2 mois" },
      { value: "3", label: "3 mois" },
      { value: "4", label: "4 mois" },
      { value: "5", label: "5 mois" },
      { value: "6", label: "6 mois" },
      { value: "7", label: "7 mois" },
      { value: "8", label: "8 mois" },
      { value: "9", label: "9 mois" },
      { value: "10", label: "10 mois" },
      { value: "11", label: "11 mois" },
      { value: "12", label: "1 année" }
    ]
    this.dashboardService.getEvoluationDelay([{ period: 6, entities: entity }]).subscribe((response) => {
      this.dateImporation = response.data.importDate[0].importDate
      this.statusBarService.addStatusBarItem('fa-solid fa-calendar-days', `date d'importation : ${this.dateImporation}`, 'right', () => {});

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
        // tickAmount: 4,
        categories: labels
      }

      this.chartOptions.yaxis[0].max = max
      this.chartOptions.yaxis[1].max = max
      this.chartComplete = true
    })
  }

  loadCustomers(event: any, filtre: any = []) {
    console.log(event)

    const page = (event.first + event.rows) / event.rows
    const rows = event.rows
    let sortField
    if (event.sortField != null) {
      sortField = event.sortField
    }
    else {
      sortField = ""

    }
    const sortOrder = event.sortOrder == -1 ? "desc" : ""
    let globalEntity = JSON.parse(localStorage.getItem("entityGlobal"))
    let entity = []
    if (globalEntity) {
      globalEntity.forEach(element => {
        entity.push({
          entityId: element.entityId
        })
      });
    }
    if (filtre.length == 0) {
      filtre = [{
        columnValue: this.displayType,
        period: 6,
        entities: entity ? entity : ""
      }]
    }
    this.loading = true;

    this.dashboardService
      .getEvoluationDelayDetails(page, rows, sortField, sortOrder, filtre)
      .subscribe((res) => {
        this.clients = res.data.OverdueTrend
        this.totalRecords = res.data.paginate[0].totalRecords;
        this.cols = res.data.ColumnLabel
        if (!this.filterCols || this.filterCols.length == 0) {
          this.filterCols = res.data.ColumnLabel
        }


        this.loading = false
        let element: HTMLElement = document.getElementById('auto_trigger') as HTMLElement;

        element.click();
        this.detailsComplete = true
      });

  }

  filtreMethod() {
    // this.blockedDocument = true


    let entity = []
    this.selectedEntities.forEach(element => {
      entity.push({
        entityId: element.entityId
      })
    });

    let customer = []
    this.selectedCustomers.forEach(element => {
      customer.push({
        customerID: element.customer_id
      })
    });


    let region = []
    this.selectedRegion.forEach(element => {
      region.push({
        regionValue: element.regionValue
      })
    });

    let customerClass = []
    this.selectedcustomerClass.forEach(element => {
      customerClass.push({
        custClass: element.classValue
      })
    });

    let recovrer = []
    this.selectedRecovrer.forEach(element => {
      recovrer.push({
        recovrerId: element.recovrerValue
      })
    });
    let types = []
    this.selectedcustomerType.forEach(element => {
      types.push({
        custType: element.typeValue
      })
    });
    const filtre = [{ entities: entity, customers: customer, regions: region, custClass: customerClass, recovrers: recovrer, custTypes: types, customerCode: this.customerCode, searchFor: this.selectedRange, columnValue: this.displayType, period: this.selectedPeriod.value, }]

    this.dashboardService.getEvoluationDelay(filtre).subscribe((response) => {
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
      this.chartComplete = true

    })

    this.loadCustomers(this.table.createLazyLoadMetadata(), filtre)
  }
  selectPeriod(event: any) {
    this.filterCols = []
    this.rangeLabel = []
    this.selectedRange = ""
    this.filtreMethod()

  }

  selectDisplay(event: any) {
    this.displayType = event.target.value
    console.log("event.target.value", event.target.value)
    this.filterCols = []
    this.rangeLabel = []
    this.selectedRange = ""
    this.filtreMethod()
  }

  selectEntity(event: any) {
    this.showCode = true
  }
  unselectEntity(event: any) {
    if (event.target.value == "")
      this.showCode = false
  }

  searchEntity(event: any) {
    console.log(event)
    this.autocompleteservice
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



  searchClasses(event: any) {
    this.autocompleteservice
      .getCustomerClasses(event.filter)
      .subscribe((data) => {
        this.customerClassOptions = data.data.class
        this.selectedcustomerClass.forEach(selected => {
          const found = this.customerClassOptions.find((element) => element.classValue == selected.classValue);
          if (!found) {
            this.customerClassOptions.push(selected)
          }

        });
      });
  }

  searchRegion(event: any) {

    this.autocompleteservice
      .getRegion(event.query)
      .subscribe((data) => {
        this.regionOptions = data.data.region

      });
  }
  searchCustomer(event: any) {
    console
    this.autocompleteservice
      .getCustomersID(event.filter)
      .subscribe((data) => {
        this.customerOptions = data.data.customer
        this.selectedCustomers.forEach(selected => {
          const found = this.customerOptions.find((element) => element.customer_id == selected.customer_id);
          if (!found) {
            this.customerOptions.push(selected)
          }

        });
      });
  }
  searchRecovrer(event: any) {
    this.autocompleteservice
      .getRecovrers(event.query)
      .subscribe((data) => {

        this.recovrerOptions = data.data.recovrer
      });
  }
  searchTypes(event: any) {
    this.autocompleteservice
      .getTypes(event.filter)
      .subscribe((data) => {
        this.customerTypeOptions = data.data.type
        this.selectedcustomerType.forEach(selected => {
          const found = this.customerTypeOptions.find((element) => element.typeValue == selected.typeValue);
          if (!found) {
            this.customerTypeOptions.push(selected)
          }

        });
      });

  }
  clearRangeFiltre() {
    this.rangeLabel = []
    this.selectedRange = ""
    this.filtreMethod()
  }
  clearFiltre() {
    //this.blockedDocument = true


    this.selectedEntities = []
    this.selectedCustomers = []
    this.selectedRegion = []
    this.selectedcustomerClass = []
    this.selectedRecovrer = []
    this.selectedcustomerType = []
    this.customerCode = ""
    this.selectedPeriod = { value: "6", label: "6 mois" }

    this.selectedRange = ""
    this.filtreMethod()

  }

  clearSort() {
    this.table.reset()
  }
  
  ngOnDestroy() {
    this.statusBarService.clearStatusBarItems();
  }
}

