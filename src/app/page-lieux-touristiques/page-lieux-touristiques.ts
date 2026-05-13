import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
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

  constructor(private pointsService :PointsService,private cdr: ChangeDetectorRef){

  }
  ngOnInit(): void {
    this.chargerMetadata();
    this.chargerPoints();
    this.appliquerRechercheLocale();  
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
  this.pointsFiltres=[]

  const filtresApi: Filtres = {
    type: this.filtres.type,
    domaine: this.filtres.domaine,
    rayon_km: this.filtres.rayon_km,
    source: this.filtres.source,
    limit: 100
  };

  this.pointsService.getPoints(filtresApi).subscribe({
    next: (data) => {
      this.points = data;
      this.pointsFiltres=[...data];
      this.appliquerRechercheLocale();
      this.erreur=null;
      this.loading = false;
      this.cdr.detectChanges();
    },
    error: () => {
      this.points = [];
      this.pointsFiltres = [];
      this.erreur = 'Impossible de charger les lieux.';
      this.loading = false;
      this.cdr.detectChanges();
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
      this.chargerPoints();
    } else if (rechercheChangee) {
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
