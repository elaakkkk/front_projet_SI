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
  recherche = '';

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
  onRechercheChange(recherche: string): void {
  this.recherche = recherche;
  this.appliquerRecherche();
}
/*
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
        this.points = [...data];
        this.pointsFiltres = [...data];
        this.appliquerRecherche();
        this.loading = false;
      },
      error: () => {
        this.erreur = 'Impossible de charger les lieux.';
        this.loading = false;
      }
    });
  }
    */
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
  const terme = this.recherche.toLowerCase().trim() ?? '';
  if (!terme) {
    this.pointsFiltres = [...this.points];
    return;
  }
  this.pointsFiltres = this.points.filter(p =>{
    const nom = p.nom?.toLowerCase()??'';
    const adresse=p.adresse?.toLowerCase()??'';
    const type = p.type?.toLowerCase() ?? '';
    const domaine = p.domaine?.toLowerCase() ?? '';
    return nom.includes(terme) || adresse.includes(terme) || type.includes(terme) || domaine.includes(terme);
  }
  );
}

/*

onFiltresChange(nouveauxFiltres: Filtres): void {
  this.filtres = { ...nouveauxFiltres };


  if(nouveauxFiltres.localSearchOnly){
    this.appliquerRecherche();
    return;
  }

  const aFiltreAPI =
    nouveauxFiltres.type !== undefined ||
    nouveauxFiltres.domaine !== undefined ||
    nouveauxFiltres.rayon_km !== undefined ||
    nouveauxFiltres.source!== undefined;

  this.chargerPoints();  

  
  
  if (aFiltreAPI) {
    this.chargerPoints();
  } else {
    this.appliquerRecherche();
  }

    
}
  */
 onFiltresChange(nouveauxFiltres: Filtres): void {
  const rechercheAvant = this.filtres.recherche;

  // Cas recherche seule
  if (
    nouveauxFiltres.recherche !== undefined &&
    nouveauxFiltres.type === undefined &&
    nouveauxFiltres.domaine === undefined &&
    nouveauxFiltres.rayon_km === undefined
  ) {
    this.filtres.recherche = nouveauxFiltres.recherche;
    this.appliquerRecherche();
    return;
  }

  // Cas filtre API
  this.filtres = {
    ...nouveauxFiltres,
    recherche: rechercheAvant
  };

  this.chargerPoints();
}



  onReset():void{
    //this.filtres={}
    //this.pointsFiltres=[];
    //this.chargerPoints();

  this.filtres = {};
  this.recherche = '';
  this.chargerPoints();
  }


}
