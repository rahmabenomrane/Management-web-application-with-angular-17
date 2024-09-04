import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { SidebarModule } from 'primeng/sidebar';
import {
  ChartComponent,
  ApexChart,
  ApexDataLabels,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend,
  ApexTooltip,
  NgApexchartsModule,

} from "ng-apexcharts";
import { DashboardService } from '../../../services/dashboard.service';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutocompleteService } from '../../../services/autocomplete.service';
import { ChipModule } from 'primeng/chip';
import { StatusBarService } from 'src/app/core/services/status-bar.service';

export type ChartOptions3 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: string[];
  tooltip: ApexTooltip,
  fill: any,
  legend: ApexLegend;
  dataLabels: ApexDataLabels
};

@Component({
  selector: 'solde',
  standalone: true,
  imports: [RouterModule, ChipModule, DropdownModule, SidebarModule, CommonModule, TagModule, TableModule, ButtonModule, InputTextModule, FormsModule, MultiSelectModule, NgApexchartsModule, TabViewModule],
  templateUrl: './solde.component.html',
  styleUrl: './solde.component.css'
})
export class SoldeComponent {
  public chart: any;
  blockedDocument: boolean = false;
  loading: boolean = false;
  totalRecords = 0
  showCode = false
  selectedcustomerType: any[] = []
  customerTypeOptions = []
  sidebarVisible: boolean = false;
  selectedCustomers: any[] = []
  customerOptions = []
  entityOptions = []
  selectedEntities: any[] = []
  selectedRecovrer: any[] = []
  dateImporation: any
  rangeLabel = []

  selectedRegion: any[] = []
  regionOptions = []

  customerClassOptions = []
  selectedcustomerClass: any[] = []

  recovrerOptions = []
  customerCode = ""
  total = 0



  entityDisabled = true
  customerClassDisabled = false
  customerTypeDisabled = false
  customerRegionDisabled = false
  recovrerDisabled = false
  options = [{ 'label': "Entité", value: "customerEntity", }, { 'label': "Type client", value: "customerType", }, { 'label': "Classe client", value: "customerClass", }, { 'label': "Région", value: "customerRegion", }]
  selectedOptions = "customerEntity"
  @ViewChild("table")
  table: any;
  @ViewChild("chart3") chart3: ChartComponent;
  public chartOptions3: Partial<ChartOptions3>;




  clients = [

  ]
  constructor(private autocompleteservice: AutocompleteService, private dashboardService: DashboardService, private statusBarService : StatusBarService) {
    this.chartOptions3 = {
      series: [],

      chart: {
        type: "donut",
        height: 350,

        events: {
          dataPointSelection: (event, chartContext, config
          ) => {
            console.log(chartContext)
            this.rangeLabel = []
            if (config.w.config.labels[config.dataPointIndex] !== "Autres") {
              this.rangeLabel.push(config.w.config.labels[config.dataPointIndex])

              this.chartSelection(config.w.config.labels[config.dataPointIndex])
            }

          }
        },
      },

      colors: ["#AEDA34",
        "#B0EF00",
        "#FFFF19",
        "#34D2D9",
        "#0080A9",
        "#008ffb"],

      fill: {
        colors: [
          "#AEDA34",
          "#B0EF00",
          "#FFFF19",
          "#34D2D9",
          "#0080A9",
          "#008ffb"
        ],
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {

        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          colors: ['#F8FAE5',]
        }
      },
      legend: {

        position: "bottom",
        markers: {
          fillColors: [
            "#AEDA34",
            "#B0EF00",
            "#FFFF19",
            "#34D2D9",
            "#0080A9",
            "#008ffb"

          ],
        },


      },
      labels: [],

    };
  }
  ngOnInit(): void {
    let roles = JSON.parse(localStorage.getItem('roles'))
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

    this.blockedDocument = true
    this.dashboardService.getCustomersPieChartsAmount([{ "pieChartAmount": this.selectedOptions, entities: entity }]).subscribe((response) => {
      this.dateImporation = response.data.importDate[0].importDate
      this.statusBarService.addStatusBarItem('fa-solid fa-calendar-days', `date d'importation : ${this.dateImporation}`, 'right', () => {});

      let lables = []
      let data = []
      let i = 0
      response.data.Chart.sort(function compare(a, b) {
        if (a.value > b.value)
          return -1;
        if (a.value < b.value)
          return 1;
        return 0;
      });

      response.data.Chart.forEach((element) => {
        if (i < 4) {
          data.push(parseFloat(element["value"].toFixed(2)))
          lables.push(element["key"])
        }
        else if (i == 4) {
          data.push(parseFloat(element["value"].toFixed(2)))
          lables.push("Autres")
        }
        else {
          data[4] = parseFloat((data[4] + parseFloat(element["value"].toFixed(2))).toFixed(2))

        }

        i = i + 1


      });

      this.chartOptions3.series = data;
      this.chartOptions3.labels = lables
      this.blockedDocument = false
    })
  }

  loadCustomers(event: any, filtre: any = []) {
    console.log(filtre)
    this.blockedDocument = true
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
        entities: entity
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
    this.dashboardService.getCustomersAmountDetails(page, rows, sortField, sortOrder, filtre).subscribe((res) => {
      this.clients = res.data.solde
      this.totalRecords = res.data.paginate[0].totalRecords;
      this.total += res.data.paginate[0].totalAmount

      this.loading = false;
      let element: HTMLElement = document.getElementById('auto_trigger') as HTMLElement;

      element.click();
      this.blockedDocument = false
    });

  }


  select(event: any) {
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
        regionId: element.regionValue
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
    const filtre = [{ entities: entity, customers: customer, regions: region, custClass: customerClass, recovrers: recovrer, "pieChartAmount": this.selectedOptions, custTypes: types, customerCode: this.customerCode }]
    if (event.value == "customerEntity") {
      this.entityDisabled = true
      this.customerTypeDisabled = false
      this.customerClassDisabled = false
      this.customerRegionDisabled = false

    }
    if (event.value == "customerClass") {
      this.customerClassDisabled = true
      this.customerTypeDisabled = false
      this.entityDisabled = false
      this.customerRegionDisabled = false


    }
    if (event.value == "customerType") {
      this.customerTypeDisabled = true
      this.customerClassDisabled = false
      this.entityDisabled = false
      this.customerRegionDisabled = false


    }
    if (event.value == "customerRegion") {
      this.customerTypeDisabled = false
      this.customerClassDisabled = false
      this.entityDisabled = false
      this.customerRegionDisabled = true


    }
    this.dashboardService.getCustomersPieChartsAmount(filtre).subscribe((response) => {
      console.log("repooooooooooooooooooooonnnseeeee", response)
      let lables = []
      let data = []
      let i = 0
      response.data.Chart.sort(function compare(a, b) {
        if (a.value > b.value)
          return -1;
        if (a.value < b.value)
          return 1;
        return 0;
      });

      response.data.Chart.forEach((element) => {

        if (i < 4) {
          data.push(parseFloat(element["value"].toFixed(2)))
          lables.push(element["key"])
        }
        else if (i == 4) {
          data.push(parseFloat(element["value"].toFixed(2)))
          lables.push("Autres")
        }
        else {
          data[4] = parseFloat((data[4] + parseFloat(element["value"].toFixed(2))).toFixed(2))

        }

        i = i + 1

      });

      this.chartOptions3.series = data;
      this.chartOptions3.labels = lables
    })
    this.loadCustomers(this.table.createLazyLoadMetadata(), filtre)
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
        regionId: element.regionValue
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
    const filtre = [{ entities: entity, customers: customer, regions: region, custClass: customerClass, recovrers: recovrer, "pieChartAmount": this.selectedOptions, custTypes: types, customerCode: this.customerCode }]

    this.dashboardService.getCustomersPieChartsAmount(filtre).subscribe((response) => {
      console.log("repooooooooooooooooooooonnnseeeee", response)
      let lables = []
      let data = []
      let i = 0
      response.data.Chart.sort(function compare(a, b) {
        if (a.value > b.value)
          return -1;
        if (a.value < b.value)
          return 1;
        return 0;
      });

      response.data.Chart.forEach((element) => {

        if (i < 4) {
          data.push(parseFloat(element["value"].toFixed(2)))
          lables.push(element["key"])
        }
        else if (i == 4) {
          data.push(parseFloat(element["value"].toFixed(2)))
          lables.push("Autres")
        }
        else {
          data[4] = parseFloat((data[4] + parseFloat(element["value"].toFixed(2))).toFixed(2))

        }

        i = i + 1



      });

      this.chartOptions3.series = data;
      this.chartOptions3.labels = lables
      this.blockedDocument = false

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
  getDataWithEntity() {
    localStorage.setItem("entityGlobal", JSON.stringify(this.selectedEntities))

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
  chartSelection(categorie: any) {

    let entity = []
    if (this.selectedOptions == "customerEntity") {
      entity.push({
        entityId: categorie
      })
    }
    else {
      this.selectedEntities.forEach(element => {
        entity.push({
          entityId: element.entityId
        })
      });
    }


    let customer = []
    this.selectedCustomers.forEach(element => {
      customer.push({
        customerID: element.customer_id
      })
    });
    let region = []
    if (this.selectedOptions == "customerRegion") {
      region.push({
        regionId: categorie
      })
    }
    else {
      this.selectedRegion.forEach(element => {
        region.push({
          regionId: element.regionValue
        })
      });
    }


    let customerClass = []
    if (this.selectedOptions == "customerClass") {
      customerClass.push({
        custClass: categorie
      })
    }
    else {
      this.selectedcustomerClass.forEach(element => {
        customerClass.push({
          custClass: element.classValue
        })
      });
    }


    let recovrer = []
    this.selectedRecovrer.forEach(element => {
      recovrer.push({
        recovrerId: element.recovrerValue
      })
    });
    let types = []
    if (this.selectedOptions == "customerType") {
      types.push({
        custType: categorie
      })
    }
    else {
      this.selectedcustomerType.forEach(element => {
        types.push({
          custType: element.typeValue
        })
      });
    }


    const filtre = [{ entities: entity, customers: customer, regions: region, custClass: customerClass, recovrers: recovrer, "pieChartAmount": this.selectedOptions, custTypes: types, customerCode: this.customerCode }]

    this.dashboardService.getCustomersPieChartsAmount(filtre).subscribe((response) => {
      console.log("repooooooooooooooooooooonnnseeeee", response)
      let lables = []
      let data = []
      let i = 0
      response.data.Chart.sort(function compare(a, b) {
        if (a.value > b.value)
          return -1;
        if (a.value < b.value)
          return 1;
        return 0;
      });

      response.data.Chart.forEach((element) => {

        if (i < 4) {
          data.push(parseFloat(element["value"].toFixed(2)))
          lables.push(element["key"])
        }
        else if (i == 4) {
          data.push(parseFloat(element["value"].toFixed(2)))
          lables.push("Autres")
        }
        else {
          data[4] = parseFloat((data[4] + parseFloat(element["value"].toFixed(2))).toFixed(2))

        }

        i = i + 1



      });

      this.chartOptions3.series = data;
      this.chartOptions3.labels = lables
      this.blockedDocument = false

    })

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
    this.rangeLabel = []
    this.filtreMethod()

  }
  clearRangeFiltre() {
    this.rangeLabel = []
    this.filtreMethod()
  }
  clearSort() {
    this.table.reset()
  }
  
  ngOnDestroy() {
    this.statusBarService.clearStatusBarItems();
  }
}
