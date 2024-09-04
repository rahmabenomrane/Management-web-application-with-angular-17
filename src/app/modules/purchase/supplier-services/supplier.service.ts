import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SupplierService {
  folderRefValue    : string;
  typeValue         : any;
  formatValue       : any;
  cinValue          : any;
  tauxTaxeValue     : string;
  zoneTaxeValue     : string;
  usageTaxeValue    : string;
  ribValue          : string;
  adresseValue      : string;
  villeValue        : string;
  paysValue         : string;
  telValue          : string;
  deviseValue       : string;
  CAValue           : string;
  conditionValue    : string;
  formeJurValue     : string;
  mfFileName        : any;
  
  getRIB(): string {
    return this.ribValue;
  }

  setRIB(value: string) {
    this.ribValue = value;
  }

  getFormeJur(): string {
    return this.formeJurValue;
  }

  setFormeJur(value: string) {
    this.formeJurValue = value;
  }

  getCondition(): string {
    return this.conditionValue;
  }

  setCondition(value: string) {
    this.conditionValue = value;
  }

  getCompteAchat(): string {
    return this.CAValue;
  }

  setCompteAchat(value: string) {
    this.CAValue = value;
  }

  getDevise(): string {
    return this.deviseValue;
  }

  setDevise(value: string) {
    this.deviseValue = value;
  }

  getTel(): string {
    return this.telValue;
  }

  setTel(value: string) {
    this.telValue = value;
  }

  getPays(): string {
    return this.paysValue;
  }

  setPays(value: string) {
    this.paysValue = value;
  }

  getVille(): string {
    return this.villeValue;
  }

  setVille(value: string) {
    this.villeValue = value;
  }

  getAdresse(): string {
    return this.adresseValue;
  }

  setAdresse(value: string) {
    this.adresseValue = value;    
  }

  getFolderRef(): string {
    return this.folderRefValue;
  }

  setFolderRef(value: string) {
    this.folderRefValue = value;
  }

  getSupplierType(): any {
    return this.typeValue;
  }

  setSupplierType(value: any) {
    this.typeValue = value;
  }

  getFormat(): any {
    return this.formatValue;
  }

  setFormat(value: any) {
    this.formatValue = value;
  }

  getCin(): any {
    return this.cinValue;
  }

  setCin(value: any) {
    this.cinValue = value;
  }

  getMfFileName(): any {
    return this.mfFileName;
  }

  setMfFileName(value: any) {
    this.mfFileName = value;
  }

  getTauxTaxeValue(): any {
    return this.tauxTaxeValue;
  }

  setTauxTaxeValue(value: any) {
    this.tauxTaxeValue = value;
  }

  getZoneTaxeValue(): any {
    return this.zoneTaxeValue;
  }

  setZoneTaxeValue(value: any) {
    this.zoneTaxeValue = value;
  }

  getUsageTaxeValue(): any {
    return this.usageTaxeValue;
  }

  setUsageTaxeValue(value: any) {
    this.usageTaxeValue = value;
  }
}
