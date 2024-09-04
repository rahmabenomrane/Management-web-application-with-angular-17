import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { AutocompleteService } from '../../services/autocomplete.service';
import { SenarioService } from '../../services/senario.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';

interface statuts { 
  statusId: String; 
  statusName: String; 
  sousStatus : String

} 
interface scenarios { 
  name: String; 
  code: String; 

} 
@Component({
  selector: 'app-gestion-statut',
  standalone: true,
  imports: [
    DropdownModule,
    InputTextModule,
    ButtonModule,
    DialogModule, 
    TableModule, 
    CommonModule, 
    EditorModule,
    FormsModule,
    IconFieldModule, 
    InputTextModule, 
    InputIconModule,
    ToastModule,
    AutoCompleteModule,
    FloatLabelModule,
  ],
  providers: [MessageService],

  templateUrl: './gestion-statut.component.html',
  styleUrl: './gestion-statut.component.css'
})
export class GestionStatutComponent {
  //statuts : statuts[] = [];
  statusFilter : string = "";
  SousStLabel : string = "";
  selected : string = "";
  title : string = "";
  label : string = "";
  icon : string = "";
  selectedSc : scenarios | undefined;
  selectedSt :statuts | undefined;
  scenarioList: scenarios[] | undefined;
  selectStatut :statuts | undefined;
 
  visible: boolean = false;
  loading: boolean = false;
  invoiceStatus = [];
  Status = [];
  statutList = [];
  statutGroups = [];
  statusOptions = [];
  totalRecords = 0;
  selectedSousStId  : string = "";
  suggestions: any[] | undefined;
  constructor(private AutocompleteService: AutocompleteService, private SettingsService: SettingsService, private senarioService: SenarioService, private messageService: MessageService){}
  ngOnInit(){
    var page = 1;
    var rows = 10;
    // this.SettingsService.getInvoiceStatusList(page, rows).subscribe((res) => {
    //   console.log("res.datares.data", res.data);
      
    //   this.invoiceStatus = res.data.tt_crm_dca_invoiceStatus
      
    //   for (let index = 0; index <  this.invoiceStatus.length; index++) {
    //     const element =  this.invoiceStatus[index];
    //     if(element.parentId == 0){
          
    //       this.statutList.push({
    //         statusId : element.statusId,
    //         statusName : element.statusLabel,
    //         sousStatus :  ""

    //       });
    //     }
    //   }
    //   console.log("ddddddddddddddddddd",  this.statutList);
      
    
    var nbPage: number;
     var nbLines: number
     var scenario: any
    // });
    this.senarioService.getScenarioList(nbPage, nbLines, scenario).subscribe((data) => {
      console.log("datadata", data);
      
      
      this.scenarioList =  data["data"].scenarios
      console.log("this.scenarioListthis.scenarioList", this.scenarioList);
    
    });
    this.SettingsService.getInvoiceStatusList(1, 10,this.statusFilter).subscribe((res) => {
      this.statutList = [];
      for (let index = 0; index < res.data.tt_crm_dca_invoiceStatus.length; index++) {
        const element =  res.data.tt_crm_dca_invoiceStatus[index];
      if(element.parentId == ""){
        this.statutList.push({
          statusId : element.statusId,
          statusName : element.statusLabel,
          sousStatus :  "" 
        });
      }}
    })
   
    
   
  }
  
  loadStatus(event: any) {
    var rows = 10 ;
    var page = 1;
    
    if(event.rows){
       page = (event.first + event.rows) / event.rows
       rows = event.rows
      var  sortField = event.sortField
      var sortOrder = event.sortOrder == -1 ? "desc" : ""
    }
   
    this.loading = true;
    this.Status =  [];
    console.log("event.value", this.statusFilter);
    this.SettingsService.getInvoiceStatusList(page, rows,this.statusFilter).subscribe((res) => {
      console.log("res.datares.data", res.data);
      this.invoiceStatus = []
      this.invoiceStatus = res.data.tt_crm_dca_invoiceStatus
     
      for (let index = 0; index <  this.invoiceStatus.length; index++) {
        const element =  this.invoiceStatus[index];
        if(element.parentId == ""){
          const found1 = this.invoiceStatus.find((elt) => elt.parentId == element.statusId);
          if(!found1){
            this.Status.push({
              statusId : element.statusId,
              statusName : element.statusLabel,
              sousStatus :  element.statusLabel,
              sousStatusId : "" ,
  
            })
          }
          
        
        }
        const found = this.invoiceStatus.find((elt) => elt.statusId == element.parentId);
        if(found){
          this.Status.push({
            statusId : found.statusId,
            statusName : found.statusLabel,
            sousStatus :  element.statusLabel,
            sousStatusId :  element.statusId,

          })
        }
       
        
      }
      console.log(" this.Status",   this.Status);
      
      const group = this.Status.reduce((acc: any, curr) => {
        let key = curr.statusId;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(curr);
        return acc;
      }, {});
      this.Status = [];
      
      for (const key in group){
        group[key].forEach(element => {
          this.Status.push(element)
        });
      }
      console.log(" this.Status11111111111",   this.Status);
    
      this.totalRecords = res.data.paginate[0].totalRecords;
      this.loading = false;
    });
  }
  selectedStatut(event){
    console.log("here");
    
  };
  selectStatus(event){
    console.log("here", event);
    this.selectedSt = event.value

  };
  addStatut(){
    this.title = "Nouveau Statut";
    this.label = "Ajouter"
    this.icon = "pi pi-plus"
    this.visible = true;
    this.selectedSt = undefined;
    this.SousStLabel = "";
  };
  showStatut(st){
    console.log("here", st);
    console.log("ccccccccccc", this.invoiceStatus);
     
    this.title = "";
    this.label = "Modifier"
    this.icon = "pi pi-check"
    this.visible = true;
    this.selectedSt = st.statusId;
    this.SousStLabel = st.sousStatus;
    this.selectedSousStId =  st.sousStatusId;
    if( st.sousStatusId == ""){
      var found1 = this.invoiceStatus.find((elt) => elt.statusId ==  st.statusId);
    }else{
      var found1 = this.invoiceStatus.find((elt) => elt.statusId ==  st.sousStatusId);
    }
    console.log("found1",  found1);
    this.selectedSc=  found1.scenarioId;
    console.log("here",  this.selectedSc);

  };
  saveStatut(){
    console.log("here");
    this.visible = true;
    var statutObj= []
    if(this.selectedSousStId == undefined){
      statutObj.push({
        parentId: this.selectedSt,
        scenarioId: this.selectedSc,
        statusLabel: this.SousStLabel,
        statusName: this.SousStLabel,
        statusId: "",
  
      })
    }else{
      statutObj.push({
        parentId: this.selectedSt,
        scenarioId: this.selectedSc,
        statusLabel: this.SousStLabel,
        statusName: this.SousStLabel,
        statusId: this.selectedSousStId,
  
      })
    }
  
    console.log("statutObjstatutObj" ,statutObj);
    
    this.SettingsService.saveInvoiceStatusDetails(statutObj).subscribe((data) => {
      console.log("resssssssssssssss", data );
      if (data.status == false) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.errors[0].errordesc});
        this.visible = false;
      }else{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Success' });
        this.visible = false;
      }
     

    })

  }
  getStatus(event){
    console.log("event.value", event);
    var statusAuto = []
    console.log("here auto");
    
    //this.SettingsService.getInvoiceStatusList(1, 10, event.query).subscribe((data) => {
    this.AutocompleteService.AutocompleteStatus(event.query).subscribe((data) => {
      for (let index = 0; index < data.data.tt_crm_dca_invoiceStatus.length; index++) {
        const element =  data.data.tt_crm_dca_invoiceStatus[index];
        if(element.parentId == 0){
         statusAuto.push(element)
        }
      }
      this.statusOptions =  [...statusAuto].map(item =>item.statusLabel);
      console.log("data.data.tt_crm_dca_invoiceStatusdata.data.tt_crm_dca_invoiceStatus", data.data.tt_crm_dca_invoiceStatus);
      
    });
  }
 
}
