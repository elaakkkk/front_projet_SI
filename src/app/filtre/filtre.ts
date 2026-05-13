import { Component,Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Filtres } from '../../interfaces/filtres';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-filtre',
  imports: [
    FormsModule,CommonModule
  ],
  templateUrl: './filtre.html',
  styleUrl: './filtre.scss',
})
export class Filtre implements OnInit {

  @Input() types: string[] = [];
  @Input() filtres: Filtres = {
  };
  @Input() domaines: string[] = [];

  @Output() filtresChange = new EventEmitter<Filtres>();
  @Output() reinitialiser = new EventEmitter<void>();

  // État local du formulaire
  typeSelectionne: string = '';
  domaineSelectionne: string = '';
  rayonKm: number | null = null;
  recherche: string = '';

  ngOnInit(): void {
    // Sync avec les filtres reçus en Input (utile si la page recharge)
    this.typeSelectionne    = this.filtres.type    ?? '';
    this.domaineSelectionne = this.filtres.domaine ?? '';
    this.rayonKm            = this.filtres.rayon_km ?? null;
    this.recherche=this.filtres.recherche??'';
  }

  onRechercheChange(value: string): void {
  this.recherche = value;
  this.emettreFiltres(true);
  
}

  onTypeChange(value: string): void {
    this.typeSelectionne = value;
    this.emettreFiltres(false);
  }

  onDomaineChange(value: string): void {
    this.domaineSelectionne = value;
    this.emettreFiltres(false);
  }

  onRayonChange(value: number | string | null): void {
  this.rayonKm = value !== null && value !== '' ? Number(value) : null;
  this.emettreFiltres(false);
}

  onReinitialiser(): void {
    this.typeSelectionne    = '';
    this.domaineSelectionne = '';
    this.rayonKm            = null;
    this.recherche          = '';
    this.reinitialiser.emit();
  }

  private emettreFiltres(localSearchOnly:boolean = false): void {
    const filtres: Filtres = {};
    if (this.typeSelectionne)    filtres.type     = this.typeSelectionne;
    if (this.domaineSelectionne) filtres.domaine  = this.domaineSelectionne;
    if (this.rayonKm)            filtres.rayon_km = this.rayonKm;
    if (this.recherche)            filtres.recherche = this.recherche;
    if (localSearchOnly){
        filtres.localSearchOnly=true}
    this.filtresChange.emit(filtres);
  }
}
