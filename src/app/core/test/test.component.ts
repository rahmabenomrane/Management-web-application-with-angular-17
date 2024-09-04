import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { ProcessFooterComponent } from '../process-footer/process-footer.component';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { StepperModule } from 'primeng/stepper';
import { InputOtpModule } from 'primeng/inputotp';
import { InputTextModule } from 'primeng/inputtext';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'test',
  standalone: true,
  imports: [GoogleMapsModule,EditorModule, FormsModule, ProcessFooterComponent, CardModule, DropdownModule, StepperModule,InputOtpModule,InputTextModule ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  options: google.maps.MapOptions = {
    mapId: "DEMO_MAP_ID",
    center: { lat: -31, lng: 147 },
    zoom: 4,
  };
}
