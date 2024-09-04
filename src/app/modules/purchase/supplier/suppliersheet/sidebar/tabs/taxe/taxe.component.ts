import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
export interface ChipColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-taxe',
  templateUrl: './taxe.component.html',
  styleUrls: ['./taxe.component.css']
})
export class TaxeComponent {
  checked: boolean = false;
  color: ThemePalette  = 'primary';
  disabled = false;

  selectedFileStatut: File | null = null;
  fileNameStatut: string | null = null;

  selectedFileRc: File | null = null;
  fileNameRc: string | null = null;

  selectedFileMf: File | null = null;
  fileNameMf: string | null = null;

  onFileSelected(event: any, controlType: string): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      if (controlType === 'statut') {
        this.selectedFileStatut = inputElement.files[0];
        this.fileNameStatut = this.selectedFileStatut.name;
      } else if (controlType === 'rc') {
        this.selectedFileRc = inputElement.files[0];
        this.fileNameRc = this.selectedFileRc.name;
      }else if (controlType === 'mf') {
        this.selectedFileMf = inputElement.files[0];
        this.fileNameMf = this.selectedFileMf.name;
      }
    }
  }
  availableColors: ChipColor[] = [
    {name: 'A Taxer', color: 'primary'},
  ];
}
