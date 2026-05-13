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

  const filtresApi: Filtres = {
    type: this.filtres.type,
    domaine: this.filtres.domaine,
    rayon_km: this.filtres.rayon_km,
    source: this.filtres.source,
    limit: this.filtres.limit
  };

  this.pointsService.getPoints(filtresApi).subscribe({
    next: (data) => {
      this.points = data;
      this.appliquerRechercheLocale();
      this.loading = false;
    },
    error: () => {
      this.erreur = 'Impossible de charger les lieux.';
      this.loading = false;
    }
  });
}

 onFiltresChange(nouveauxFiltres: Filtres): void {
    const rechercheChangee =
      nouveauxFiltres.recherche !== this.filtres.recherche;
    const filtreApiChange =
      nouveauxFiltres.type     !== this.filtres.type    ||
      nouveauxFiltres.domaine  !== this.filtres.domaine ||
      nouveauxFiltres.rayon_km !== this.filtres.rayon_km;

    this.filtres = { ...nouveauxFiltres };

    if (filtreApiChange) {
      // Un filtre API a changé : recharger depuis le serveur
      this.chargerPoints();
    } else if (rechercheChangee) {
      // Recherche texte seule : filtrage local, pas d'appel HTTP
      this.appliquerRechercheLocale();
    }
  }
   private appliquerRechercheLocale(): void {
    const terme = (this.filtres.recherche ?? '').toLowerCase().trim();
    if (!terme) {
      this.pointsFiltres = [...this.points];
      return;
    }
    this.pointsFiltres = this.points.filter((p) => {
      const nom     = p.nom?.toLowerCase()    ?? '';
      const adresse = p.adresse?.toLowerCase() ?? '';
      const type    = p.type?.toLowerCase()    ?? '';
      const domaine = p.domaine?.toLowerCase() ?? '';
      return (
        nom.includes(terme)     ||
        adresse.includes(terme) ||
        type.includes(terme)    ||
        domaine.includes(terme)
      );
    });
  }

  onReset():void{
  this.filtres = {};
  this.chargerPoints();
  }


}
