import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-statistiques',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './statistiques.html',
  styleUrl: './statistiques.scss',
})
export class Statistiques {
  villeSelectionnee = 'Rennes';

  statistiques = [
    { titre: 'Nombre de lieux touristiques', valeur: 128 },
    { titre: 'Trajets disponibles', valeur: 560 },
    { titre: 'Gares proches', valeur: 42 },
    { titre: 'CO₂ économisé (kg)', valeur: 1240 }
  ];

  villes = ['Rennes', 'Brest', 'Quimper', 'Vannes', 'Saint-Malo'];

  changerVille() {
    console.log('Ville choisie :', this.villeSelectionnee);
  }
}