import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { PlanningService } from '../../services/planning.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { AutocompleteService } from '../../services/autocomplete.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [FloatLabelModule, AccordionModule, TabViewModule, ProgressSpinnerModule, BlockUIModule, MultiSelectModule, InputTextModule, DropdownModule, InputNumberModule, FullCalendarModule, InputTextareaModule, CommonModule, DialogModule, ButtonModule, StepperModule, TableModule, TagModule, EditorModule, FormsModule, ChipsModule],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.css'
})
export class PlanningComponent {
  customerClassOptions = []
  selectedcustomerClass: any[] = []

  recovrerOptions = []
  selectedRegion: any[] = []
  regionOptions = []
  customerFiltered = []
  selectedcustomerType: any[] = []
  customerTypeOptions = []
  customerCode = ""
  blockedDocument: boolean = false;
  activeIndex: number | undefined = 0;
  selectedCustomers: any[] = []
  customerOptions = []
  entityOptions = []
  selectedEntities: any[] = []
  selectedRecovrer: any[] = []
  text: string | undefined;
  visible: boolean = false
  activeStep = 0
  selectedActions: any
  selectedcustomers = []
  actionDate = ""
  customFieldsModels = [{}]
  actions: any[] = [

  ];
  total = 0
  actionList = []
  statuses = [
    { label: "traitée et envoyée", value: "te" },
    { label: "echange client", value: "ec" },
    { label: "réclamation prix", value: "rep" },
    { label: "promesse", value: "pr" },
  ]
  customers: any[] = [

  ];
  customFields = []
  fee = 0
  emails: string[] | undefined;
  selectedInvoices = []
  loading = true
  totalRecords = 0
  remainingAmtTotal = 0
  invoiceAmtTotal = 0
  selectedType = ""
  calendarOptions: CalendarOptions = {
    editable: true,
    selectable: true,
    initialView: 'dayGridMonth',
    buttonText: {
      today: "aujourd'hui",
      month: 'mois',
      week: 'semaine',
      day: 'jour',
      list: 'liste'
    },
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',

    },
    locale: "fr",
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    events: [

    ],

    eventClick: this.showDialog.bind(this),

  };
  constructor(private planningService: PlanningService, private autocompleteservice: AutocompleteService) {

  }
  ngOnInit() {

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

    let events = []
    this.blockedDocument = true
    this.planningService.getPlanning([]).subscribe((res) => {
      console.log("*************", res.data.RecoveryPlanGoupedByType)
      if (res.data.RecoveryPlanGoupedByType) {
        res.data.RecoveryPlanGoupedByType.forEach(element => {
          events.push({
            title: element.actionLabel, date: element.actionDate, extendedProps: {
              icon: element.actionName == "phone" ? "pi pi-phone" : element.actionName == "shifting" ? "pi pi-car" : element.actionName == "email" ? "pi pi-envelope" : "pi pi-mobile",
              typeid: element.actionType,
              type: element.actionName,
              actionDate: element.actionDate,
              counter: element.actionCount
            },
            color: element.actionName == "phone" ? "#F3CA52" : element.actionName == "shifting" ? "#141E46" : element.actionName == "email" ? "#41B06E" : "#577B8D",
          })
        });
      }
      this.blockedDocument = false

      this.calendarOptions.events = events
    })
  }
  showDialog(event) {
    this.customers = []
    this.selectedActions = []
    this.actions = []
    console.log(event.event._def.extendedProps.actionDate)
    this.selectedType = event.event._def.extendedProps.type


    this.activeStep = 0;
    let actionType = event.event._def.extendedProps.typeid
    let actionDate = event.event._def.extendedProps.actionDate
    this.actionDate = event.event._def.extendedProps.actionDate

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
    const filtre = [{
      entities: entity, customers: customer, regions: region, custClass: customerClass, recovrers: recovrer, custTypes: types, customerCode: this.customerCode, "actionType": actionType,
      "actionDate": actionDate
    }]
    this.blockedDocument = true
    this.planningService.getPlanningActions(filtre).subscribe((res) => {
      console.log(res)
      this.actions = res.data.RecoveryPlan
      /*   if (res.data.RecoveryPlanningActionDetails.length == 1) {
          this.selectedActions = res.data.RecoveryPlanningActionDetails
        } */
      this.blockedDocument = false
      this.visible = true;
    })
  }
  loadInvoices(event: any) {
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

    setTimeout(() => {

    }, 1000);
  }
  calculateCustomerTotal(name: string) {
    let total = 0;

    if (this.customers) {
      for (let customer of this.customers) {
        if (customer.representative?.name === name) {
          total++;
        }
      }
    }

    return total;
  }

  selectAction() {
    console.log(this.selectedActions)
    this.loading = true;
    this.planningService.getPlanningActionInvoice(this.selectedActions.actionId, this.actionDate).subscribe((res) => {
      res.data.ActionInvoice.forEach(element => {
        if (element.actionId == this.selectedActions.actionId) {
          this.selectedInvoices.push(element)

        }
      });
      const ids = this.selectedInvoices.map(({ customerId }) => customerId);
      this.customerFiltered = this.selectedInvoices.filter(({ customerId }, index) =>
        !ids.includes(customerId, index + 1));
      console.log("*****111", this.customerFiltered)
      this.customers = res.data.ActionInvoice
      this.loading = false;
      this.planningService.getPlanningActionCustomFields(this.selectedActions.actionId).subscribe((res) => {
        this.customFields = []
        res.data.PlanningActionCustomFields.forEach(element => {

          this.customFields.push(element)
          for (let index = 0; index < this.customerFiltered.length; index++) {
            this.customerFiltered[index][element.fieldKey] = ""
            console.log("***************", this.customFieldsModels)
          }
        });
      })
    })




  }

  send() {
    console.log("***************1111", this.customerFiltered)
    this.visible = false;
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
    this.filtreMethod()

  }

  filtreMethod() {

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
    const filtre = [{ entities: entity, customers: customer, regions: region, custClass: customerClass, recovrers: recovrer, custTypes: types, customerCode: this.customerCode }]
    let events = []
    this.planningService.getPlanning(filtre).subscribe((res) => {
      if (res.data.RecoveryPlanGoupedByType) {
        res.data.RecoveryPlanGoupedByType.forEach(element => {
          events.push({
            title: element.actionLabel, date: element.actionDate, extendedProps: {
              icon: element.actionName == "phone" ? "pi pi-phone" : element.actionName == "shifting" ? "pi pi-car" : element.actionName == "email" ? "pi pi-envelope" : "pi pi-mobile",
              typeid: element.actionType,
              type: element.actionName,
              actionDate: element.actionDate,
              counter: element.actionCount
            },
            color: element.actionName == "phone" ? "#F3CA52" : element.actionName == "shifting" ? "#141E46" : element.actionName == "email" ? "#41B06E" : "#577B8D",
          })
        });
      }
      this.calendarOptions.events = events
    })
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
  changeInvoices() {
    const ids = this.selectedInvoices.map(({ customerId }) => customerId);
    this.customerFiltered = this.selectedInvoices.filter(({ customerId }, index) =>
      !ids.includes(customerId, index + 1));

    console.log("*****", this.customerFiltered)
  }
  loadActionsListView(event: any, filtre: any = []) {

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

    setTimeout(() => {
      this.planningService.getPlanningListView(page, rows, sortField, sortOrder, filtre).subscribe((res) => {
        this.actionList = res.data.RecoveryPlan
        this.totalRecords = res.data.paginate[0].totalRecords;
        this.total = res.data.paginate[0].totalAmount

        this.loading = false;

      });
    }, 1000);
  }

}
