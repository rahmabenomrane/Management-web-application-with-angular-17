import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SupplierService } from 'src/app/modules/purchase/supplier-services/supplier.service';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector   : 'adresse',
  standalone : true,
  imports    : [
    CommonModule,
    FormsModule, 
    InputTextModule,
    DropdownModule,
    GoogleMapsModule
  ],
  templateUrl: './adresse.component.html',
  styleUrls  : ['./adresse.component.css']
})
export class AdresseComponent {
  
  @Output() adresseStatus = new EventEmitter<boolean>();

  validAdresse  = true;

  adressValue   : string;
  villeValue    : string;
  paysValue     : string;

  latitude      : number = 36.8476326;
  longitude     : number = 10.2664685;
  zoom          : number = 21;

  mpList        = [{ format: 'Personne morale', code: 'PM' }];

  options       : google.maps.MapOptions;
  markerPosition: google.maps.LatLngLiteral;

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.options = {
      mapId: "1",
      center: { lat: this.latitude, lng: this.longitude },
      zoom: this.zoom,
    };
    
    this.markerPosition = { lat: this.latitude, lng: this.longitude };
  }

  checkValidAdresse(): void {
    this.adresseStatus.emit(this.validAdresse);
    this.supplierService.setAdresse(this.adressValue);
    this.supplierService.setVille(this.villeValue);
    this.supplierService.setPays(this.paysValue);
  }

  updateMap(): void {
    const lat = parseFloat(this.latitude.toString());
    const lng = parseFloat(this.longitude.toString());
    const newZoom = parseInt(this.zoom.toString(), 10); 
  
    if (!isNaN(lat) && !isNaN(lng) && !isNaN(newZoom)) {
      this.options = {
        mapId: "1",
        center: { lat, lng },
        zoom: newZoom,  
      };
      this.markerPosition = { lat , lng };
    }
  }
}

