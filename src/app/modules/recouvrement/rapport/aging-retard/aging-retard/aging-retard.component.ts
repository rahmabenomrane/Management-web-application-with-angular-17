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
import { StatusBarService } from 'src/app/core/services/status-bar.service';

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
  tooltip: any
};

@Component({
  selector: 'aging-retard',
  standalone: true,
  imports: [RouterModule, DropdownModule, ChipModule, SidebarModule, CommonModule, TagModule, TableModule, ButtonModule, InputTextModule, FormsModule, MultiSelectModule, NgApexchartsModule, TabViewModule],
  templateUrl: './aging-retard.component.html',
  styleUrl: './aging-retard.component.css'
})
export class AgingRetardComponent {
  public chartOptions2: Partial<ChartOptions2>;
  @ViewChild("chart2") chart2: ChartComponent;

  blockedDocument: boolean = false;
  @ViewChild("table")
  table: any;

  clients = []
  filtre = []
  sidebarVisible: boolean = false;

  loading: boolean = true;
  totalRecords = 0
  cities: any[] | undefined;
  cities2: any[] | undefined;
  total = 0
  showCode = false
  customerCode = ""
  selectedRange = ""
  selectedcustomerType: any[] = []
  customerTypeOptions = []
  rangeLabel = []

  selectedCustomers: any[] = []
  customerOptions = []
  entityOptions = []
  selectedEntities: any[] = []
  recovrerOptions = []
  cols!: any[];
  filterCols!: any[];
  selectedRecovrer: any[] = []
  radio = "i"
  selectedPeriodType = "i"
  selectedPeriod: any | undefined;
  period: any[] | undefined;
  selectedRegion: any[] = []
  regionOptions = []
  dateImporation: any

  customerClassOptions = []
  selectedcustomerClass: any[] = []


  constructor(private autocompleteservice: AutocompleteService, private dashboardService: DashboardService, private statusBarService : StatusBarService) {
    this.chartOptions2 = {
      series: [

      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          dataPointSelection: (event, chartContext, config
          ) => {
            this.rangeLabel = []
            this.rangeLabel.push(this.filterCols[config.dataPointIndex].label)
            this.selectedRange = this.filterCols[config.dataPointIndex].value
            console.log(event)

            console.log(event)

            this.filtreMethod()
          }

        },
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "25%",
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
            return new Intl.NumberFormat('fr-TN', { style: 'currency', currency: 'TND', notation: 'compact' },).format(
              value,
            )
          }
        },
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

  ngOnInit(): void {
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
    /*   if (roles.isRecovrer) {
        this.recovrerDisabled = true
      } */
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

    this.dashboardService
      .getCustomerDelayChart([{ entities: entity, period: 0, periodType: 'i' }])
      .subscribe((response) => {
        this.dateImporation = response.data.importDate[0].importDate
        this.statusBarService.addStatusBarItem('fa-solid fa-calendar-days', `date d'importation : ${this.dateImporation}`, 'right', () => {});

        let chartAmountDelayPerDays = response.data.Chart


        let labels = []
        let data = []
        chartAmountDelayPerDays.forEach((element) => {

          labels.push(element.key)


          data.push(element.value)


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

  filtreMethod() {
    //this.blockedDocument = true


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

    this.dashboardService
      .getCustomerDelayChart(filtre)
      .subscribe((response) => {
        let chartAmountDelayPerDays = response.data.Chart


        let labels = []
        let data = []
        chartAmountDelayPerDays.forEach((element) => {

          labels.push(element.key)


          data.push(element.value)


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
      });

    this.loadCustomers(this.table.createLazyLoadMetadata(), filtre)

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
  loadCustomers(event: any, filtre: any = []) {
    if (filtre.length == 0) {
      filtre = this.filtre
    }
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
        period: 0, periodType: 'i'
      })
    }
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

    this.loading = true;


    this.dashboardService.getAgingDelayDetails(page, rows, sortField, sortOrder, filtre).subscribe((res) => {

      this.total = res.data.paginate[0].totalAmount

      this.clients = res.data.CustomerAmoutDelay
      this.totalRecords = res.data.paginate[0].totalRecords;
      this.cols = res.data.ColumnLabel
      if (!this.filterCols || this.filterCols.length == 0)
        this.filterCols = res.data.ColumnLabel
      this.loading = false;
      let element: HTMLElement = document.getElementById('auto_trigger') as HTMLElement;
      element.click();
    });

  }
  searchEntity(event: any) {
    this.autocompleteservice
      .getEntities(event.filter)
      .subscribe((data) => {

        this.entityOptions = data.data.entity

        this.selectedEntities.forEach(selected => {
          const found = this.entityOptions.find((element) => element.entityId == selected.entityId);
          if (!found) {
            this.entityOptions.push(selected)
          }

        });

      });
  }

  searchRecovrer(event: any) {
    this.autocompleteservice
      .getRecovrers(event.filter)
      .subscribe((data) => {

        this.recovrerOptions = data.data.recovrer

        this.selectedRecovrer.forEach(selected => {
          const found = this.recovrerOptions.find((element) => element.recovrerLabel == selected.recovrerLabel);
          if (!found) {
            this.recovrerOptions.push(selected)
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
  selectPriodType(event: any) {
    this.filterCols = []
    this.selectedPeriodType = event
    this.radio = event
    this.selectedRange = ""
    this.rangeLabel = []
    this.filtreMethod()


  }
  selectPeriod(event: any) {
    this.filterCols = []
    this.rangeLabel = []
    this.selectedRange = ""
    this.filtreMethod()

  }
  clearRangeFiltre() {
    this.rangeLabel = []

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

