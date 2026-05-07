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
  
  modes: any[] = [];
  recommande: string = '';
  
  messageErreur = '';
  destinationTrouvee: string = '';
  distanceTrouvee: number = 0;

  icons: any = {
    marche: '🚶',
    velo: '🚴',
    bus: '🚌',
    metro: '🚇'
  };

  constructor(private api: Api, private cdr: ChangeDetectorRef) {}

  calculerItineraire() {

    (document.activeElement as HTMLElement)?.blur();

    const valeur = this.destination.trim();

    this.modes = [];
    this.messageErreur = '';

    if (!valeur) {
      this.messageErreur = 'Veuillez entrer une destination.';
      return;
    }

    // 📍 COORDONNÉES
    if (valeur.includes(',')) {
      const [latStr, lonStr] = valeur.split(',');
      const lat = parseFloat(latStr.trim());
      const lon = parseFloat(lonStr.trim());

      if (isNaN(lat) || isNaN(lon)) {
        this.messageErreur = 'Coordonnées invalides. Exemple : 48.1173,-1.6778';
        return;
      }

      this.api.getItineraireByCoords(lat, lon).subscribe({
        next: (data: any) => this.afficherResultats(data),
        error: () => {
          this.messageErreur = 'Erreur backend avec les coordonnées.';
        },
      });

      return;
    }

    // 🔎 NOM
    this.api.getItineraireByName(valeur).subscribe({
      next: (data: any) => this.afficherResultats(data),
      error: () => {
        this.messageErreur = 'Aucun lieu trouvé avec cette destination.';
      },
    });
  }

  afficherResultats(data: any) {

    // 🧠 support backend ancien + multi-résultats
    let item;

    if (data.resultats && data.resultats.length > 0) {

      // 🔥 tri intelligent par distance
      const sorted = [...data.resultats].sort(
        (a, b) => a.distance_km - b.distance_km
      );

      item = sorted[0]; // meilleur résultat

    } else {
      item = data;
    }

    if (!item?.modes) {
      this.messageErreur = 'Données invalides reçues du serveur.';
      return;
    }

    this.destinationTrouvee = item.point?.nom || 'Destination inconnue' ;
    this.distanceTrouvee = item.distance_km;
    const modesBackend = item.modes;

    this.modes = Object.keys(modesBackend).map((key) => ({
      mode: key,
      duree: modesBackend[key].duree_minutes,
      distance: item.distance_km
    }));

    this.recommande = item.recommande;

    this.cdr.detectChanges();
  }
}