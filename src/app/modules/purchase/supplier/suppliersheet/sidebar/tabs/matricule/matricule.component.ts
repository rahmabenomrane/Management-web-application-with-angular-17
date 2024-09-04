import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
export interface IBankData {
  regle: string;
  action: string;
  
}
const bankData: IBankData[] = [
  { regle: '', action: '' },
 
 
];
@Component({
  selector: 'app-matricule',
  templateUrl: './matricule.component.html',
  styleUrls: ['./matricule.component.css']
})
export class MatriculeComponent implements OnInit {
  matriculeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.matriculeForm = this.fb.group({
      inputs: this.fb.array([])
    });

    // Initialize with 10 inputs
    for (let i = 0; i < 13; i++) {
      this.addInput();
    }
  }

  get inputs(): FormArray {
    return this.matriculeForm.get('inputs') as FormArray;
  }

  createInput(): FormGroup {
    return this.fb.group({
      inputValue: ['', [Validators.required, Validators.maxLength(1)]]
    });
  }

  addInput() {
    this.inputs.push(this.createInput());
  }

  deleteInput() {
    if (this.inputs.length > 1) {
        this.inputs.removeAt(this.inputs.length - 1);
    }
}
displayedColumns: string[] = [ 'regle','action'];
dataSource = bankData;
  
}
