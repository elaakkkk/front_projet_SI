import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';
import { Api } from '../services/api';

@Component({
  selector: 'app-itineraire',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './itineraire.html',
  styleUrl: './itineraire.scss',
})
export class Itineraire {
  pointDepart = 'Gare de Rennes';
  destination = '';
  mode = 'velo';

  resultats: any[] = [];
  messageErreur = '';

  constructor(private api: Api, private cdr: ChangeDetectorRef) {}

  calculerItineraire() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const valeur = this.destination.trim();

    this.resultats = [];
    this.messageErreur = '';

    if (!valeur) {
      this.messageErreur = 'Veuillez entrer une destination.';
      this.cdr.detectChanges();
      return;
    }

    if (valeur.includes(',')) {
      const parties = valeur.split(',');
      const lat = parseFloat(parties[0].trim());
      const lon = parseFloat(parties[1].trim());

      if (isNaN(lat) || isNaN(lon)) {
        this.messageErreur = 'Coordonnées invalides. Exemple : 48.1173,-1.6778';
        this.cdr.detectChanges();
        return;
      }

      this.api.getItineraireByCoords(lat, lon).subscribe({
        next: (data: any) => this.afficherResultats(data),
        error: () => {
          this.messageErreur = 'Erreur backend avec les coordonnées.';
          this.cdr.detectChanges();
        },
      });

      return;
    }

    this.api.getItineraireByName(valeur).subscribe({
      next: (data: any) => this.afficherResultats(data),
      error: () => {
        this.api.getItineraireById(valeur).subscribe({
          next: (data: any) => this.afficherResultats(data),
          error: () => {
            this.messageErreur = 'Aucun lieu trouvé avec cette destination.';
            this.cdr.detectChanges();
          },
        });
      },
    });
  }

  afficherResultats(data: any) {
    this.resultats = [
      { mode: 'Marche', duree: `${data.modes.marche.duree_minutes} min`, distance: `${data.distance_km} km` },
      { mode: 'Vélo', duree: `${data.modes.velo.duree_minutes} min`, distance: `${data.distance_km} km` },
      { mode: 'Bus', duree: `${data.modes.bus.duree_minutes} min`, distance: `${data.distance_km} km` },
      { mode: 'Métro', duree: `${data.modes.metro.duree_minutes} min`, distance: `${data.distance_km} km` },
    ];

    this.cdr.detectChanges();
  }
}