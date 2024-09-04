import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { DashboardService } from '../../../services/dashboard.service';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutocompleteService } from '../../../services/autocomplete.service';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { SidebarModule } from 'primeng/sidebar';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexGrid,
  NgApexchartsModule,

  ApexFill,
  ApexTooltip,
  ApexXAxis,
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
  grid: ApexGrid
};
@Component({
  selector: 'evolution-recovery-delay',
  standalone: true,
  imports: [RouterModule, DropdownModule, SidebarModule, ChipModule, TagModule, CommonModule, TableModule, ButtonModule, InputTextModule, FormsModule, MultiSelectModule, NgApexchartsModule, TabViewModule],
  templateUrl: './evolution-recovery-delay.component.html',
  styleUrl: './evolution-recovery-delay.component.css'
})
export class EvolutionRecoveryDelayComponent {

  displayType = "AvgRealDSO"
  radio = "AvgRealDSO"
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @ViewChild("table")
  table: any;
  filtre = []
  clients = []
  rangeLabel = []
  showCode = false
  total = 0
  selectedcustomerType: any[] = []
  customerTypeOptions = []

  selectedCustomers: any[] = []
  customerOptions = []
  entityOptions = []
  selectedEntities: any[] = []
  selectedRecovrer: any[] = []
  dateImporation: any

  selectedRegion: any[] = []
  regionOptions = []

  customerClassOptions = []
  selectedcustomerClass: any[] = []

  recovrerOptions = []
  customerCode = ""
  selectedRange = ""
  sidebarVisible: boolean = false;


  totalRecords = 0
  periodeOptions = []
  loading = true
  selectedPeriod: any | undefined;
  period: any[] | undefined;


  recovrerDisabled = false
  seletedPeriod = [{ "periodFilterRC_value": 6, "periodFilterRC_label": "6 mois" }]
  totalLines = 0
  cols!: any[];
  filterCols!: any[];
  constructor(private autocompleteservice: AutocompleteService, private dashboardService: DashboardService, private statusBarService : StatusBarService) {
    this.chartOptions = {
      series: [{ "data": [], name: "Délai réalisée", type: 'line', }, { "data": [], name: "Délai convenu", type: 'line', }, { data: [], type: 'line', name: "retard" }, { data: [], type: 'column', name: "taux de retard" },],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
        events: {
          dataPointSelection: (event, chartContext, config
          ) => {
            console.log(this.cols[config.dataPointIndex])
            this.rangeLabel = []
            this.rangeLabel.push(this.filterCols[config.dataPointIndex].label)
            this.selectedRange = this.filterCols[config.dataPointIndex].value
            this.filtreMethod()
          }
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {

        curve: ['smooth', 'smooth', 'smooth',]

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
          // tickAmount: 4,
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

    };;
  }

  ngOnInit() {
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

    if (globalEntity) {
      this.showCode = true
    }
    this.dashboardService
      .getEvolutionRecoveryDelay([
        { period: 6, entities: globalEntity ? entity : [] }
      ])
      .subscribe((response) => {
        this.dateImporation = response.data.importDate[0].importDate
        this.statusBarService.addStatusBarItem('fa-solid fa-calendar-days', `date d'importation : ${this.dateImporation}`, 'right', () => {});

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
        console.log(max)

        this.chartOptions.series = [{ "data": dataDp, name: "Délai réalisée", type: 'line', }, { "data": dataDr, name: "Délai convenu", type: 'line', }, { data: retard, type: 'line', name: "retard" }, { data: dataTauxRetard, type: 'column', name: "taux de retard" },];
        this.chartOptions.xaxis = {
          tickAmount: 4,
          categories: labels
        }

        this.chartOptions.yaxis[0].max = max
        this.chartOptions.yaxis[1].max = max
        this.chartOptions.yaxis[2].max = max
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
    this.loading = true;
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
        columnValue: this.displayType,
        period: 6,
      })
    }

    setTimeout(() => {
      this.dashboardService.getEvolutionRecoveryDelayDetails(page, rows, sortField, sortOrder, filtre).subscribe((res) => {
        this.clients = res.data.dsoPerCustomer
        this.totalRecords = res.data.paginate[0].totalRecords;
        this.cols = res.data.ColumnLabel
        if (!this.filterCols || this.filterCols.length == 0) {
          this.filterCols = res.data.ColumnLabel
        }
        let element: HTMLElement = document.getElementById('auto_trigger') as HTMLElement;

        element.click();
        this.loading = false;
      });
    }, 1000);
  }

  search(event: any) {
    this.dashboardService
      .getEvolutionRecoveryDelay(event)
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
        console.log(max)

        this.chartOptions.series = [{ "data": dataDp, name: "Délai réalisée", type: 'line', }, { "data": dataDr, name: "Délai convenu", type: 'line', }, { data: retard, type: 'line', name: "retard" }, { data: dataTauxRetard, type: 'column', name: "taux de retard" },];
        this.chartOptions.xaxis = {
          tickAmount: 4,
          categories: labels
        }

        this.chartOptions.yaxis[0].max = max
        this.chartOptions.yaxis[1].max = max
        this.chartOptions.yaxis[2].max = max
      })
    this.loadCustomers(this.table.createLazyLoadMetadata(), event)
  }
  selectDisplay(event: any) {
    this.displayType = event.target.value
    console.log("event.target.value", event.target.value)
    this.filtreMethod()
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
    const filtre = [{ entities: entity, customers: customer, regions: region, custClass: customerClass, recovrers: recovrer, custTypes: types, customerCode: this.customerCode, searchFor: this.selectedRange, period: this.selectedPeriod.value, columnValue: this.displayType, }]

    this.dashboardService
      .getEvolutionRecoveryDelay(filtre)
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
        console.log(max)

        this.chartOptions.series = [{ "data": dataDp, name: "Délai réalisée", type: 'line', }, { "data": dataDr, name: "Délai convenu", type: 'line', }, { data: retard, type: 'line', name: "retard" }, { data: dataTauxRetard, type: 'column', name: "taux de retard" },];
        this.chartOptions.xaxis = {
          tickAmount: 4,
          categories: labels
        }

        this.chartOptions.yaxis[0].max = max
        this.chartOptions.yaxis[1].max = max
        this.chartOptions.yaxis[2].max = max
      })

    console.log("123456789", this.table.createLazyLoadMetadata())
    this.loadCustomers(this.table.createLazyLoadMetadata(), filtre)
  }
  selectEntity() {
    this.showCode = true
  }
  unselectEntity(event: any) {
    if (event.target.value == "")
      this.showCode = false
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


  selectPeriod(event: any) {
    this.filterCols = []
    this.rangeLabel = []
    this.selectedRange = ""
    this.filtreMethod()

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

