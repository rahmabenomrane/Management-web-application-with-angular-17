
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask'; 
import { AutocompleteService } from '../../services/autocomplete.service';
import { SettingsService } from '../../services/settings.service';
interface actionTypes { 
  typeLabel: String; 
  selectedConfig: boolean; 
  description: String; 
  prototype: boolean; 
  fieldType: String; 

} 
interface Prototype {
  name: string;
  code: string;
}

@Component({
  selector: 'type-configuration',
  standalone: true,
  imports: [
    DropdownModule,
    InputTextModule,
    ButtonModule,
    DialogModule, 
    TableModule, 
    CommonModule, 
    RadioButtonModule, 
    EditorModule,
    FormsModule,
    AutoCompleteModule,
    FloatLabelModule,
    InputMaskModule,
    
  ],
  templateUrl: './type-configuration.component.html',
  styleUrl: './type-configuration.component.css'
})
export class TypeConfigurationComponent {
  actionTypes : actionTypes[] = [];

  configurations: any[] = [
      { label: 'Oui', value: true },
      { label: 'Non', value: false },
  ];
  prototypes: Prototype[] | undefined;
  PrototypeObject = [];
  selectedPrototype: Prototype | undefined;

  visible: boolean = false;
  showDiv: boolean = false;
  prototext: string = 'Hello World!';
  prototypeName: string = "";
  typeFilter : string = "";
  totalRecords = 0;
  typeOptions = [];

  constructor(private AutocompleteService: AutocompleteService, private SettingsService: SettingsService, ){}
  ngOnInit(){
    // this.actionTypes = [ 
    //   { 
    //     typeLabel: "Téléphone", 
    //     selectedConfig: true, 
    //     description : "commentaire obligatoire",
    //     prototype : false,
       
    // }, 
    // { 
    //   typeLabel: "Téléphone", 
    //   selectedConfig: false, 
    //   description : "frais obligation",
    //   prototype : false,
     
    // },
    //   { 
    //     typeLabel: "Deplacement", 
    //     selectedConfig: false,
    //     description : "commentaire obligatoire",
    //     prototype : false,
       
    //   },
    //   { 
    //     typeLabel: "SMS", 
    //     selectedConfig : false,
    //     description : "Prototype",
    //     prototype : true,
       
    //   }
    // ]
    this.prototypes = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];
 
  }
  
  showPrototype(event){
    event.preventDefault();
    console.log("here prototype");
    this.visible = true;
    this.showDiv = true;
    this.prototext = "hibaaaaaaaaaa"; 
    console.log("this.showDivthis.showDiv", this.prototext);
    
  }
  selectPrototype(event: any) {
   this.prototypeName =  event.value.name;
   this.prototext = "<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>"
   console.log("this.showDivthis.showDiv", this.prototext);
      
 
  }
  clearInput(){
    this.prototypeName = "";
    this.prototext = "";
    this.selectedPrototype = undefined;
  }
  savePrototype(){
    console.log("this.showDivthis.showDiv", this.prototext);
    this.PrototypeObject.push({

      name:this.prototypeName,
      content: this.prototext
      

    })
    console.log("this.showDivthis.showDiv", this.PrototypeObject);
  }
  getActionTypeList(event: any){
    var rows = 10 ;
    var page = 1;
    
    if(event.rows){
       page = (event.first + event.rows) / event.rows
       rows = event.rows
      var  sortField = event.sortField
      var sortOrder = event.sortOrder == -1 ? "desc" : ""
    }
    this.SettingsService.getActionTypeList(page, rows,this.typeFilter).subscribe((res) => {
      console.log("res.datares.data", res.data);
      this.actionTypes = [];
      //this.actionTypes =  res.data.tt_crm_dca_actionsType ;

      this.totalRecords = res.data.paginate[0].totalRecords;
      res.data.tt_crm_dca_actionsType.forEach(type => {
        if(res.data.tt_crm_dca_actionCondFieldValue){
          var found = res.data.tt_crm_dca_actionCondFieldValue.find((elt) => elt.actionTypeId == type.typeId);
        }
        if(found){
          res.data.tt_crm_dca_actionCondFieldValue.forEach(field => {
            if(type.typeId == field.actionTypeId){
              const found1 = res.data.tt_crm_dca_actionConditionField.find((elt) => elt.fieldId == field.fieldId);
              if(found1.fieldId == field.fieldId){
                this.actionTypes.push({
                  typeLabel: type.typeLabel, 
                  selectedConfig: JSON.parse(field.fieldValue.toLowerCase()), 
                  description : found1.fieldDescription,
                  prototype : false,
                  fieldType : found1.fieldType,
  
                })
              }
             
            }
           
          });

        }
        else{
          this.actionTypes.push({
            typeLabel: type.typeLabel, 
            selectedConfig: false, 
            description : "",
            prototype : false,
            fieldType : "",
          })
        }
        
      });
      console.log("  this.actionTypes  this.actionTypes" ,   this.actionTypes);
      
    })
      
     
    
   
    
  }
  getActionTypeAutocomplete(event: any){
    console.log("event.value", event);
    var typeAuto = []
    console.log("here auto");
    
    //this.SettingsService.getInvoiceStatusList(1, 10, event.query).subscribe((data) => {
      
    this.AutocompleteService.AutocompleteActionType(event.query).subscribe((data) => {
      for (let index = 0; index < data.data.tt_crm_dca_actionsType.length; index++) {
        const element =  data.data.tt_crm_dca_actionsType[index];
       
         typeAuto.push(element)
        
      }
      this.typeOptions =  [...typeAuto].map(item =>item.typeLabel);
      console.log("data.data.tt_crm_dca_invoiceStatusdata.data.tt_crm_dca_invoiceStatus", data.data.tt_crm_dca_actionsType);
      
    });
  }
  addActionType(){}
  
}
