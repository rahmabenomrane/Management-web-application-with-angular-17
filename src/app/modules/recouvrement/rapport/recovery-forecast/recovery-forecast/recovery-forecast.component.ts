import { Component, ViewChild } from '@angular/core';
import { AutocompleteService } from '../../../services/autocomplete.service';
import { DashboardService } from '../../../services/dashboard.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexLegend,
  ApexFill,
  ApexXAxis,
  NgApexchartsModule,
  ApexYAxis,
} from "ng-apexcharts";
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { SidebarModule } from 'primeng/sidebar';
import { ChipModule } from 'primeng/chip';
import { StatusBarService } from 'src/app/core/services/status-bar.service';

export type ChartOptions4 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: any
};
@Component({
  selector: 'recovery-forecast',
  standalone: true,
  imports: [RouterModule, ChipModule, DropdownModule, SidebarModule, CommonModule, TagModule, TableModule, ButtonModule, InputTextModule, FormsModule, MultiSelectModule, NgApexchartsModule, TabViewModule],
  templateUrl: './recovery-forecast.component.html',
  styleUrl: './recovery-forecast.component.css'
})
export class RecoveryForecastComponent {

  @ViewChild("chart4") chart4: ChartComponent;
  public chartOptions4: Partial<ChartOptions4>;
  @ViewChild("table")
  table: any;
  showCode = false

  selectedcustomerType: any[] = []
  customerTypeOptions = []
  dateImporation: any

  selectedCustomers: any[] = []
  customerOptions = []
  entityOptions = []
  selectedEntities: any[] = []
  selectedRecovrer: any[] = []
  sidebarVisible: boolean = false;

  selectedRegion: any[] = []
  regionOptions = []

  customerClassOptions = []
  selectedcustomerClass: any[] = []

  recovrerOptions = []
  customerCode = ""

  clients = []
  radio = "m"
  selectedPeriodType = "m"
  total = 0
  period: any[] | undefined;
  blockedDocument: boolean = false;
  selectedPeriod: any | undefined;

  selectedRange = ""
  recovrerDisabled = false
  rangeLabel = []
  filterCols!: any[];


  loading: boolean = true;
  totalRecords = 0
  constructor(private autocompleteservice: AutocompleteService, private dashboardService: DashboardService, private statusBarService : StatusBarService) {
    this.chartOptions4 = {
      series: [

      ],
      chart: {

        type: "bar",
        height: 400,
        stacked: true,
        width: '100%',
        redrawOnWindowResize: true,
        events: {
          dataPointSelection: (event, chartContext, config
          ) => {
            const found = this.filterCols.find((element) => element.label == config.w.config.xaxis.categories[config.dataPointIndex]);

            this.selectedRange = found.value
            this.rangeLabel = []
            this.rangeLabel.push(found.label)
            this.filtreMethod()
          }
        },
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
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: function (value) {
            return new Intl.NumberFormat('fr-TN', { style: 'currency', currency: 'TND', notation: 'compact' },).format(
              value,
            )
          }
        },
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
      },
      tooltip: {
        y: {
          formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {

            return new Intl.NumberFormat('fr-TN', { style: 'currency', currency: 'TND' }).format(
              value,
            )
          }
        }
      }
    };
  }
  cols!: any[];
  ngOnInit() {
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
    console.log(this.selectedEntities)
    this.autocompleteservice
      .getTypes("")
      .subscribe((data) => {
        this.customerTypeOptions = data.data.type

      });
    this.autocompleteservice
      .getRecovrers("")
      .subscribe((data) => {

        this.recovrerOptions = data.data.recovrer
      });
    this.autocompleteservice
      .getTypes("")
      .subscribe((data) => {
        this.customerTypeOptions = data.data.type

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
      .getRegion("")
      .subscribe((data) => {
        this.regionOptions = data.data.region

      });
    this.autocompleteservice
      .getCustomersID("")
      .subscribe((data) => {
        this.customerOptions = data.data.customer
      });

    if (globalEntity) {
      this.showCode = true
    }
    let roles = JSON.parse(localStorage.getItem('roles'))
    /*  if (roles.isRecovrer) {
       this.recovrerDisabled = true
     } */
    this.blockedDocument = true
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
    const filtre = [{ period: this.selectedPeriod.value, periodType: this.selectedPeriodType, entities: entity ? entity : [] }]
    this.dashboardService.getRecoveryForcast(filtre).subscribe((response) => {
      this.dateImporation = response.data.importDate[0].importDate
      this.statusBarService.addStatusBarItem('fa-solid fa-calendar-days', `date d'importation : ${this.dateImporation}`, 'right', () => {});

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
      //this.forcastComplete = true

    })
  }
  loadCustomers(event: any, filtre: any = []) {
    this.blockedDocument = true
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
      filtre.push({
        entities: entity,
        period: this.selectedPeriod.value, periodType: this.selectedPeriodType
      })
    }


    this.loading = true;
    this.dashboardService.getRecoveryForecastFiltred(page, rows, sortField, sortOrder, filtre).subscribe((res) => {
      this.clients = res.data.RecoveryForecast
      this.totalRecords = res.data.paginate[0].totalRecords;
      this.total = res.data.paginate[0].totalAmount
      this.cols = res.data.ColumnLabel
      if (!this.filterCols || this.filterCols.length == 0) {
        this.filterCols = res.data.ColumnLabel
      }
      console.log("filterCols:", this.filterCols)
      this.loading = false;
      let element: HTMLElement = document.getElementById('auto_trigger') as HTMLElement;

      element.click();
      this.blockedDocument = false
    });
  }


  selectPriodType() {
    if (this.selectedPeriodType == "m") {
      this.selectedPeriodType = "w"
    }
    else {
      this.selectedPeriodType = "m"

    }
    this.filtreMethod()


  }
  selectPeriod(event: any) {
    this.filterCols = []
    this.rangeLabel = []
    this.selectedRange = ""
    this.filtreMethod()

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

  searchRegion(event: any) {

    this.autocompleteservice
      .getRegion(event.query)
      .subscribe((data) => {
        this.regionOptions = data.data.region

      });
  }

  searchRecovrer(event: any) {
    this.autocompleteservice
      .getRecovrers(event.query)
      .subscribe((data) => {

        this.recovrerOptions = data.data.recovrer
      });
  }

  filtreMethod() {
    this.blockedDocument = true
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
    const filtre = [{ entities: entity, customers: customer, regions: region, custClass: customerClass, recovrers: recovrer, custTypes: types, customerCode: this.customerCode, period: this.selectedPeriod.value, periodType: this.selectedPeriodType, searchFor: this.selectedRange }]
    this.dashboardService.getRecoveryForcast(filtre).subscribe((response) => {
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
      //this.forcastComplete = true

    })
    this.loadCustomers(this.table.createLazyLoadMetadata(), filtre)

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
  selectEntity() {
    console.log("ttttttttt")
    if (this.selectedEntities.length > 0)
      this.showCode = true
  }


  unselectEntity(event: any) {
    if (event.target.value == "")
      this.showCode = false
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

    this.selectedPeriodType = "i"
    this.selectedRange = ""
    this.filtreMethod()

  }
  clearSort() {
    this.table.reset()
  }
  clearRangeFiltre() {
    this.rangeLabel = []

    this.selectedRange = ""
    this.filtreMethod()
  }
  
  ngOnDestroy() {
    this.statusBarService.clearStatusBarItems();
  }
}

