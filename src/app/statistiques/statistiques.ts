import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';
import { Api } from '../services/api';

@Component({
  selector: 'app-statistiques',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './statistiques.html',
  styleUrl: './statistiques.scss',
})
export class Statistiques implements OnInit {
  villeSelectionnee = 'Rennes';
  statistiques: any[] = [];

  villes = ['Rennes', 'Brest', 'Quimper', 'Vannes', 'Saint-Malo'];

  constructor(private api: Api, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.chargerStatistiques();
  }

  changerVille(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.villeSelectionnee = select.value;
    this.chargerStatistiques();
    select.blur();
  }

  chargerStatistiques() {
    this.api.getStatsApercu(this.villeSelectionnee).subscribe((data: any) => {
      this.statistiques = [
        { titre: 'Nombre de lieux touristiques', valeur: data.total_points },
        { titre: 'Dans 1 km de la gare', valeur: data.dans_1km_de_la_gare },
        { titre: 'Dans 5 km de la gare', valeur: data.dans_5km_de_la_gare },
        { titre: 'Top 5 lieux proches', valeur: data.top5_plus_proches.length },
      ];

      this.cdr.detectChanges();
    });
  }
}