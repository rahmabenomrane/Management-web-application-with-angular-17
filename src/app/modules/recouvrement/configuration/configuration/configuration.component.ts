import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SenarioService } from '../../services/senario.service';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AutocompleteService } from '../../services/autocomplete.service';
interface scenario {
  scenarioName: string,
  scenarioId: string,
  isStandard: boolean,
  //length: number, 
  actionName: string
}
@Component({
  selector: 'configuration',
  standalone: true,
  imports: [TabViewModule, ButtonModule, SplitButtonModule, TableModule, CommonModule, DialogModule, InputTextModule, DropdownModule, MessagesModule,
    InputTextareaModule, CheckboxModule, EditorModule, FormsModule, ConfirmDialogModule, ToastModule, AutoCompleteModule, FloatLabelModule, SplitButtonModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css',
})

export class ConfigurationComponent {
  scenarioFilter: string = "";
  scenariosOptions = [];
  actionFilter: string = "";
  actionsOptions = [];
  items: any[] = [];
  scenarios: scenario[] = [];
  tempscenario: any[] = [];
  nbClientUse: number = 0;
  verifHeight: number = 0;
  visible: boolean = false;
  visibleUpdate: boolean = false;
  visibleDuplicate: boolean = false;
  show: boolean = false;
  actionTypeOptions: any = [];
  messages: Message[] | undefined;
  showDiv: boolean = false;
  relancehour: any = [];
  days: any = [];
  scName: any | undefined;
  idSc: any | undefined;
  position: string = 'center';
  index = -1;
  duplicatelist: any = {};
  i: number = 0;
  length: number = 0;
  nameScToAdd: String = "";
  nameScToDuplicate: String = "";
  standard: boolean = false;
  scenarioFilterValue: String = '';
  actionFilterValue: String = '';
  isLoading = false;
  timeOutMs = 700;
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef, private senarioService: SenarioService, private autocompleteService: AutocompleteService) { }

  loadScenarios(event: any) {
    console.log("event.value", event, this.scenarioFilter);
    this.getScenarios()
  }
  getAcionsFilter(event) { }
  getScenariosFilter(event) {
    var nbPage: number = 1;
    var nbLines: number = 10;
    var scenario = [{
      scenarioName: this.scenarioFilterValue
    }]
    var scenarioAuto = []
    this.senarioService.getScenarioList(nbPage, nbLines, scenario).subscribe((data) => {
      console.log("datadatadatadatadatadata", data);
      if (data.status == true) {
        if (data.data.scenarios) {
          data.data.scenarios.forEach(element => {
            scenarioAuto.push(element)
          });
        }
      }
      this.scenariosOptions = [...scenarioAuto].map(item => item.scenarioName);
    });
  }
  standardCheckBox($event) {
    console.log($event);
    this.standard = $event;
  }
  showDialog() {
    this.standard = false;
    this.visible = true;
  }
  showDialogAction() {
    this.show = true;
  }
  showDialogUpdate(nameSc, idSc, isStandard) {
    console.log("isStandard", isStandard);
    this.visibleUpdate = true;
    this.scName = nameSc;
    this.idSc = idSc;
    this.standard = isStandard
  }
  showDialogDuplicate(idSc) {
    this.visibleDuplicate = true;
    this.idSc = idSc;
  }

  getScenarios() {
    var nbPage: number = 1;
    var nbLines: number = 10;
    //var table: scenario[] = []
    var tableAction: scenario[] = []
    var scenario = [{
      scenarioName: this.scenarioFilterValue
    }]
    console.log("scenarioscenarioscenarioscenario", scenario);
    var scenarioAction: {};
    this.senarioService.getScenarioList(nbPage, nbLines, scenario).subscribe((data) => {
      if (data.status == true && data.data.scenarios) {
        data.data.scenarios.forEach(element => {
          scenarioAction = {
            actionName: this.actionFilterValue,
            scenarioId: element.scenarioId
          }
          this.senarioService.getScenarioActionsListById(nbPage, nbLines, scenarioAction).subscribe((dataAction) => {
            if (dataAction.status == true) {
              if (dataAction.data.scenarioActions) {
                dataAction.data.scenarioActions.forEach(elem => {
                  tableAction.push({
                    scenarioName: element.scenarioName,
                    scenarioId: elem.scenarioId,
                    isStandard: element.isStandard,
                    actionName: elem.actionName
                  })

                });
              }
              if (!dataAction.data.scenarioActions) {
                tableAction.push({
                  scenarioName: element.scenarioName,
                  scenarioId: element.scenarioId,
                  isStandard: element.isStandard,
                  actionName: ''
                })
              }
            }
          },
            (val) => console.error(val),
            () => {
              this.scenarios = [...tableAction]; 
            }

          )
        }
        )
      }
    },
    )
  }
  saveScenario(action: string) {
    let scenario;
    if (action == 'add') {
      scenario = {
        isStandard: this.standard,
        scenarioName: this.nameScToAdd,
        scenarioStatus: 1,
      }
      console.log("scenario", scenario);
    } else if (action == 'update') {
      scenario = {
        isStandard: this.standard,
        scenarioName: this.scName,
        scenarioStatus: 1,
        scenarioId: this.idSc
      }
    }
    console.log("scenario", scenario);
    this.senarioService
      .saveScenario(scenario)
      .subscribe((data) => {
        console.log("saveScenario data", data);
        if (data.status == false) {
          this.showError(data.errors[0].errordesc);
        } else {
          console.log('action', action);
          location.reload();
          if (action == 'add') {
            this.visible = false;
          } else {
            this.visibleUpdate = false;
          }
        }
      })
  }
  duplicateScenario() {
    let scenario;
    scenario = {
      isStandard: false,
      scenarioName: this.nameScToDuplicate,
      scenarioStatus: 1,
      scenarioId: this.idSc
    }
    console.log("scenario", scenario);
    this.senarioService
      .duplicateScenario(scenario)
      .subscribe((data) => {
        console.log("duplicateScenario data", data);
        if (data.status == false) {
          this.showError(data.errors[0].errordesc);
        } else {
          location.reload();
          this.visibleDuplicate = false;

        }
      })
  }
  selectActionType(event: any) {
    if (event.value == "email" || event.value == "sms" || event.value == "fax") {
      this.showDiv = true;
    }
    else {
      this.showDiv = false;
    }
  }
  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
  deleteScenario(scenarioId) {
    console.log("scenarioId", scenarioId);
    let scenario = {
      scenarioId: scenarioId
    }
    this.confirmationService.confirm({
      message: 'Confirmez-vous la suppression?',
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Scénario supprimé avec succès' });
        this.senarioService
          .deleteScenario(scenario)
          .subscribe((data) => {
            console.log("deleteScenario data", data);
            if (data.status == false) {
              this.showError(data.errors[0].errordesc);
            }
            else {
              this.scenarios = this.scenarios.filter(scenario => scenario.scenarioId !== scenarioId);
              console.log("this.scenarios", this.scenarios);
            }
          })
      },
      /*  reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Process incomplete', life: 3000 });
      }, */
      key: 'positionDialog'
    });
  }
  ngOnInit() {
    this.getScenarios();
    this.days = [
      { name: 'Lundi', key: 'Lun' },
      { name: 'Mardi', key: 'Mar' },
      { name: 'Mercredi', key: 'Mer' },
      { name: 'Jeudi', key: 'Jeu' },
      { name: 'Vendredi', key: 'Ven' }
    ];
    this.relancehour = [{ relancehour: '8', relancehourLabel: '8h' },
    { relancehour: '9', relancehourLabel: '9h' },
    { relancehour: '10', relancehourLabel: '10h' },
    { relancehour: '11', relancehourLabel: '11h' },
    { relancehour: '12', relancehourLabel: '12h' },
    { relancehour: '13', relancehourLabel: '13h' },
    { relancehour: '14', relancehourLabel: '14h' },
    { relancehour: '15', relancehourLabel: '15h' },
    { relancehour: '16', relancehourLabel: '16h' },
    { relancehour: '17', relancehourLabel: '17h' },
    ]
    this.messages = [{ severity: 'info', detail: "Souhaitez vous copier le contenu d'une action existante?" }];

    this.items = this.scenarios.filter(
      (thing, i, arr) => arr.findIndex(t => t.scenarioId === thing.scenarioId) === i
    );
    this.items.forEach(item => {
      item['label'] = item.name;
    })
    this.length = this.items.length;
    this.actionTypeOptions = [{
      actionTypeId: "tel",
      actionTypeName: "Téléphone"
    }, {
      actionTypeId: "dep",
      actionTypeName: "Déplacement"
    }, {
      actionTypeId: "fax",
      actionTypeName: "Fax"
    }, {
      actionTypeId: "email",
      actionTypeName: "Email"
    }, {
      actionTypeId: "sms",
      actionTypeName: "SMS"
    }]
  }
  verifActionHeight(scenarioName: String) {
    this.verifHeight = 0;
    this.scenarios.forEach(scenario => {
      if (scenario.scenarioName == scenarioName) {
        this.verifHeight++;
      }
    })
    return this.verifHeight;
  }
}
