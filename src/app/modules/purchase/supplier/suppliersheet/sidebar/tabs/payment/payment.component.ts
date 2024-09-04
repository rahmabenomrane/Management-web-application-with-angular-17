import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
export interface ChipColor {
  name: string;
  color: ThemePalette;
}
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  ocrSidebarShow: boolean = false;
  integrationSidebarShow: boolean = false;

  ocrSidebarContent: string = 'OCR Sidebar Content';
  integrationSidebarContent: string = 'Integration Sidebar Content';

  checked: boolean = false;
  color: ThemePalette = 'primary';
  disabled = false;

  selectedFileTarif: File | null = null;
  fileNameTarif: string | null = null;

  selectedFileConv: File | null = null;
  fileNameConv: string | null = null;

  onFileSelected(event: any, controlType: string): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      if (controlType === 'tarif') {
        this.selectedFileTarif = inputElement.files[0];
        this.fileNameTarif = this.selectedFileTarif.name;
      } else if (controlType === 'conv') {
        this.selectedFileConv = inputElement.files[0];
        this.fileNameConv = this.selectedFileConv.name;
      }
    }
  }
  
  availableColors: ChipColor[] = [
    {name: 'Conventionné', color: 'primary'},
  ];
  
  
  toggleOcrSidebar() {
    this.ocrSidebarShow = !this.ocrSidebarShow;
  }

  toggleIntegrationSidebar() {
    this.integrationSidebarShow = !this.integrationSidebarShow;
  }
  closeIntegrationSidebar() {
    this.integrationSidebarShow = false;
  }
  closeSidebar() {
    this.ocrSidebarShow = false;
  }

}
