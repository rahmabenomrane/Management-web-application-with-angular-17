import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { SidebarModule } from 'primeng/sidebar';
import { ChipModule } from 'primeng/chip';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexGrid,
  ApexLegend,
  ApexXAxis,
  NgApexchartsModule,
  ApexTooltip,


} from "ng-apexcharts";
import { DashboardService } from '../../../services/dashboard.service';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutocompleteService } from '../../../services/autocomplete.service';
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
  selector: 'aging-balance',
  standalone: true,
  imports: [RouterModule, DropdownModule, ChipModule, CommonModule, SidebarModule, TagModule, TableModule, ButtonModule, InputTextModule, FormsModule, MultiSelectModule, NgApexchartsModule, TabViewModule],
  templateUrl: './aging-balance.component.html',
  styleUrl: './aging-balance.component.css'
})
export class AgingBalanceComponent {
  
  public chartOptions2: Partial<ChartOptions2>;
  @ViewChild("chart2") chart2: ChartComponent;
  public chart: any;
  @ViewChild("table")
  table: any;
  clients = []
  blockedDocument: boolean = false;
  sidebarVisible: boolean = false;

  loading: boolean = false;
  totalRecords = 0
  showCode = false
  total = 0
  selectedcustomerType: any[] = []
  customerTypeOptions = []
  cols!: any[];
  filterCols!: any[];
  selectedCustomers: any[] = []
  customerOptions = []
  entityOptions = []
  selectedEntities: any[] = []
  selectedRecovrer: any[] = []
  dateImporation: any
  selectedRegion: any[] = []
  regionOptions = []
  rangeLabel = []
  customerClassOptions = []
  selectedcustomerClass: any[] = []

  recovrerOptions = []
  customerCode = ""
  radio = "i"
  selectedPeriodType = "i"
  selectedPeriod: any | undefined;
  period: any[] | undefined;
  filtre = []
  selectedRange = ""
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
            this.filtreMethod()
          }
        },
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
      }
      ,
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
      .getTypes("")
      .subscribe((data) => {
        this.customerTypeOptions = data.data.type

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
    this.blockedDocument = true
    this.dashboardService
      .getCustomersAmountDelayPerDays([{ entities: entity, period: 0, periodType: 'i' }])
      .subscribe((response) => {
        console.log(response.data.Chart)
        let chartAmountDelayPerDays = response.data.Chart

        this.dateImporation = response.data.importDate[0].importDate
        this.statusBarService.addStatusBarItem('fa-solid fa-calendar-days', `date d'importation : ${this.dateImporation}`, 'right', () => {});

        let labels = []
        let data = []

        chartAmountDelayPerDays.forEach((element) => {
          labels.push(element.key)


          console.log(element)
          data.push(parseFloat(element.value.toFixed(2)))


        });
        console.log(data)
        this.chartOptions2.series = [{ "data": data }];
        this.chartOptions2.xaxis = {
          categories: labels,
          labels: {
            style: {

              fontSize: "12px"
            }
          }
        };
        this.blockedDocument = false
      });


  }

  loadCustomers(event: any, filtre: any = []) {
    console.log(event)
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
    if (filtre.length == 0) {
      filtre = this.filtre
    }
    let globalEntity = JSON.parse(localStorage.getItem("entityGlobal"))
    let entity = []
    if (globalEntity) {
      globalEntity.forEach(element => {
        entity.push({
          entityId: element.entityId,

        })
      });
    }
    if (filtre.length == 0) {
      filtre.push({
        entities: entity,

        period: 0, periodType: 'i'
      })
    }
    this.loading = true;

    setTimeout(() => {
      this.dashboardService.getCustomersAmountDelayPerDaysFiltred(page, rows, sortField, sortOrder, filtre).subscribe((res) => {
        this.clients = res.data.CustomerAmoutDelay
        this.totalRecords = res.data.paginate[0].totalRecords;
        this.total = res.data.paginate[0].totalAmount
        this.cols = res.data.ColumnLabel
        if (!this.filterCols || this.filterCols.length == 0) {
          this.filterCols = res.data.ColumnLabel
        }
        this.loading = false;
        let element: HTMLElement = document.getElementById('auto_trigger') as HTMLElement;

        element.click();
        this.blockedDocument = false
      });
    }, 1000);
  }






  filtreMethod() {
    this.blockedDocument = true

    console.log(this.selectedCustomers)
    console.log(this.selectedRegion)
    console.log(this.selectedcustomerClass)
    console.log(this.selectedRecovrer)

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
      .getCustomersAmountDelayPerDays(filtre)
      .subscribe((response) => {
        console.log(response.data.Chart)
        let chartAmountDelayPerDays = response.data.Chart



        let labels = []
        let data = []

        chartAmountDelayPerDays.forEach((element) => {
          labels.push(element.key)


          console.log(element)
          data.push(parseFloat(element.value.toFixed(2)))


        });
        console.log(data)
        this.chartOptions2.series = [{ "data": data }];
        this.chartOptions2.xaxis = {
          categories: labels,
          labels: {
            style: {

              fontSize: "12px"
            }
          }
        };
        this.blockedDocument = false
      });
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
  selectEntity(event: any) {
    this.showCode = true
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
  
  ngOnDestroy() {
    this.statusBarService.clearStatusBarItems();
  }
}
