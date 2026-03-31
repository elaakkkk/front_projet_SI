import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-itineraire',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './itineraire.html',
  styleUrl: './itineraire.scss',
})
export class Itineraire {
  pointDepart = 'Gare de Rennes';
  destination = '';
  mode = 'marche';

  resultats = [
    { mode: 'Marche', duree: '18 min', distance: '1.4 km' },
    { mode: 'Vélo', duree: '7 min', distance: '1.4 km' },
    { mode: 'Bus', duree: '10 min', distance: '1.6 km' },
    { mode: 'Métro', duree: '6 min', distance: '1.5 km' }
  ];

  calculerItineraire() {
    console.log('Calcul itinéraire vers :', this.destination, 'mode :', this.mode);
  }
}