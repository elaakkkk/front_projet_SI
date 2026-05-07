import { Component, OnInit } from '@angular/core';
import { Point } from '../../interfaces/point';
import { CommonModule } from '@angular/common';
import { PointsService } from '../points.service';
import { Filtre } from '../filtre/filtre';
import { Filtres } from '../../interfaces/filtres';
import { SectionLieux } from '../section-lieux/section-lieux';
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-page-lieux-touristiques',
  imports: [
    CommonModule,
    SectionLieux,
    Filtre,
    Navbar
],
  templateUrl: './page-lieux-touristiques.html',
  styleUrl: './page-lieux-touristiques.scss',
})
export class PageLieuxTouristiques implements OnInit{
  points:Point[]=[];
  pointsFiltres: Point[] = [];
  types: string[]= []
  domaines: string[]=[]

  filtres:Filtres={}
  loading=false
  erreur:string |null =null

  constructor(private pointsService :PointsService){

  }
  ngOnInit(): void {
    this.chargerMetadata();
    this.chargerPoints();
  }

  chargerMetadata(): void {
    this.pointsService.getMetadata().subscribe({
      next: ({ types, domaines }) => {
        this.types = types;
        this.domaines = domaines;
      },
      error: () => this.erreur = 'Impossible de charger les filtres.'
    });
  }

  chargerPoints(): void {
    this.loading = true;
    this.pointsService.getPoints(this.filtres).subscribe({
      next: (data) => {
        this.points = data;
        this.appliquerRecherche();
        this.loading = false;
      },
      error: () => {
        this.erreur = 'Impossible de charger les lieux.';
        this.loading = false;
      }
    });
  }
  appliquerRecherche(): void {
  const terme = this.filtres.recherche?.toLowerCase().trim() ?? '';
  if (!terme) {
    this.pointsFiltres = this.points;
    return;
  }
  this.pointsFiltres = this.points.filter(p =>
    p.nom?.toLowerCase().includes(terme) ||
    p.adresse?.toLowerCase().includes(terme)
  );
}


onFiltresChange(nouveauxFiltres: Filtres): void {
  this.filtres = { ...nouveauxFiltres };

  const aFiltreAPI =
    nouveauxFiltres.type !== undefined ||
    nouveauxFiltres.domaine !== undefined ||
    nouveauxFiltres.rayon_km !== undefined;

  if (aFiltreAPI) {
    this.chargerPoints();
  } else {
    this.appliquerRecherche();
  }
}


  onReset():void{
    this.filtres={}
    this.pointsFiltres=[];
    this.chargerPoints();
  }


}
