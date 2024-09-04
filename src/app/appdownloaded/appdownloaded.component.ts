import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // Ajout de CommonModule pour les directives Angular de base
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { CardModule } from 'primeng/card';
import { BreakpointObserver } from '@angular/cdk/layout';

import { PrimeNGConfig } from 'primeng/api';

import { Carousel } from 'primeng/carousel';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

@Component({
  selector: 'app-appdownloaded',
  standalone: true,
  imports: [CommonModule, CarouselModule, ButtonModule, TagModule,CardModule], // Ajout des modules nécessaires
  templateUrl: './appdownloaded.component.html',
  styleUrls: ['./appdownloaded.component.scss'] // Correction de 'styleUrl' en 'styleUrls'
})
export class AppdownloadedComponent implements OnInit  { // Ajout de l'implémentation OnInit


 
  products: Product[] = [
    { id: '1000', name: 'Bamboo Watch', description: 'Product Description', price: 65, category: 'Accessories', quantity: 24, inventoryStatus: 'INSTOCK', rating: 5 },
    { id: '1001', name: 'Black Watch', description: 'Product Description', price: 72, category: 'Accessories', quantity: 61, inventoryStatus: 'INSTOCK', rating: 4 },
    { id: '1002', name: 'Blue Band', description: 'Product Description', price: 79, category: 'Fitness', quantity: 2, inventoryStatus: 'LOWSTOCK', rating: 3 },
    { id: '1003', name: 'Blue T-Shirt', description: 'Product Description', price: 29, category: 'Clothing', quantity: 25, inventoryStatus: 'INSTOCK', rating: 5 },
    { id: '1004', name: 'Bracelet', description: 'Product Description', price: 15, category: 'Accessories', quantity: 73, inventoryStatus: 'INSTOCK', rating: 4 },
    { id: '1005', name: 'Blue T-Shirt', description: 'Product Description', price: 29, category: 'Clothing', quantity: 25, inventoryStatus: 'INSTOCK', rating: 5 },
    { id: '1006', name: 'Bracelet', description: 'Product Description', price: 15, category: 'Accessories', quantity: 73, inventoryStatus: 'INSTOCK', rating: 4 },
    { id: '1007', name: 'Blue T-Shirt', description: 'Product Description', price: 29, category: 'Clothing', quantity: 25, inventoryStatus: 'INSTOCK', rating: 5 },
    { id: '1008', name: 'Bracelet', description: 'Product Description', price: 15, category: 'Accessories', quantity: 73, inventoryStatus: 'INSTOCK', rating: 4 },
    
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  responsiveOptions2: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
];


  constructor(private breakpointObserver: BreakpointObserver,private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true; // Enable ripple effect if needed
  
  }

  @ViewChild('carousel') carousel: Carousel;
  activeIndex: number = 0; // Indice de la diapositive active

  // Méthode pour naviguer vers la diapositive précédente
  prevSlide() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    } else {
      this.activeIndex = this.products.length - 1; // Pour revenir à la dernière diapositive
    }
  }

  // Méthode pour naviguer vers la diapositive suivante
  nextSlide() {
    if (this.activeIndex < this.products.length - 1) {
      this.activeIndex++;
    } else {
      this.activeIndex = 0; // Pour revenir à la première diapositive
    }
  }

  
  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return null; // Ajout d'un cas par défaut pour gérer les valeurs inattendues
    }
  }
}
