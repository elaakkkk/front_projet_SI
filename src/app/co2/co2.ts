import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Navbar } from '../navbar/navbar';

interface Emissions {
  co2_kg: number;
  co2_g_par_km: number;
}

interface Result {
  destination: string;
  nb_personnes: number;
  emissions: {
    voiture: Emissions;
    train: Emissions;
    avion: Emissions;
    velo: Emissions;
    marche: Emissions;
  };
  economie_train_vs_voiture_kg: number;
  equivalent: string;
  source: string;
}

@Component({
  selector: 'app-co2',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, DecimalPipe, Navbar],
  templateUrl: './co2.html',
  styleUrls: ['./co2.scss']
})
export class Co2 {
  destination: string = '';
  nbPersonnes: number = 1;
  result: Result | null = null;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  calculate() {
    if (!this.destination) {
      this.errorMessage = 'Veuillez entrer une ville de destination.';
      this.result = null;
      return;
    }

    const params = new HttpParams()
      .set('destination', this.destination)
      .set('nb_personnes', this.nbPersonnes.toString());

    this.http.get<Result>('http://148.60.11.118/stats/carbone', { params })
      .pipe(
        catchError(err => {
          this.errorMessage = 'Impossible de récupérer les données pour cette destination.';
          this.result = null;
          return of(null);
        })
      )
      .subscribe((data: any) => {
        if (!data || !data.emissions) {
          this.errorMessage = `Aucune donnée disponible pour "${this.destination}".`;
          this.result = null;
        } else {
          this.result = data;
          this.errorMessage = '';
        }
      });
  }
  getBulbHours(): number {

    if (!this.result) return 0;

    // ~0.05 kg CO2 / heure
    return Math.round(
      this.result.emissions.voiture.co2_kg / 0.05
    );
  }

  getMealsEquivalent(): number {

    if (!this.result) return 0;

    // ~2.5 kg CO2 par repas
    return Math.round(
      this.result.emissions.voiture.co2_kg / 2.5
    );
  }

  getTvHours(): number {

    if (!this.result) return 0;

    // ~0.08 kg CO2 / heure TV
    return Math.round(
      this.result.emissions.voiture.co2_kg / 0.08
    );
  }

  getCarKmEquivalent(): number {

    if (!this.result) return 0;

    // ~0.2 kg CO2 / km voiture
    return Math.round(
      this.result.emissions.voiture.co2_kg / 0.2
    );
  }

  getTreeDays(): number {

    if (!this.result) return 0;

    // arbre absorbe ~0.06 kg / jour
    return Math.round(
      this.result.economie_train_vs_voiture_kg / 0.06
    );
  }
}