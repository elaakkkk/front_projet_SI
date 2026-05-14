import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-stats',
  standalone: true,
  templateUrl: './statistiques.html',
  styleUrls: ['./statistiques.scss'],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    Navbar
  ],
})
export class Statistiques implements OnInit {

  // ======================
  // VILLES BRETAGNE
  // ======================
  villes: string[] = [
    'Rennes',
    'Brest',
    'Quimper',
    'Saint-Malo',
    'Vannes',
    'Lorient',
    'Dinan'
  ];

  ville: string = 'Rennes';

  // ======================
  // CACHE (🔥 SPEED BOOST)
  // ======================
  private cache = new Map<string, any>();

  // ======================
  // DATA
  // ======================
  stats: any = null;

  loading = false;
  error = '';

  parTypeEntries: any[] = [];
  parDomaineEntries: any[] = [];
  parSourceEntries: any[] = [];

  apiUrl = 'http://148.60.11.118/stats/apercu';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStats();
  }

  // ======================
  // LOAD DATA (OPTIMIZED)
  // ======================
  loadStats(): void {

    const ville = this.ville.trim();
    if (!ville) return;

    // 🔥 CACHE HIT → ultra rapide
    if (this.cache.has(ville)) {
      this.setData(this.cache.get(ville));
      return;
    }

    this.loading = true;
    this.error = '';

    this.http.get(`${this.apiUrl}?ville=${ville}`)
      .subscribe({

        next: (data: any) => {

          // 💾 save cache
          this.cache.set(ville, data);

          this.setData(data);
          this.loading = false;
        },

        error: () => {
          this.error = 'Erreur lors du chargement des statistiques';
          this.loading = false;
        }
      });
  }

  // ======================
  // CENTRAL DATA MAPPING
  // ======================
  private setData(data: any): void {

    this.stats = data;

    this.parTypeEntries = Object.entries(data.par_type || {})
      .map(([key, value]) => ({
        key,
        value: Number(value)
      }));

    this.parDomaineEntries = Object.entries(data.par_domaine || {})
      .map(([key, value]) => ({
        key,
        value: Number(value)
      }));

    this.parSourceEntries = Object.entries(data.par_source || {})
      .map(([key, value]) => ({
        key,
        value: Number(value)
      }));
  }

  // ======================
  // SELECT CITY (FAST)
  // ======================
  selectVille(v: string): void {
    this.ville = v;
    this.loadStats();
  }

  // ======================
  // PERCENTAGE OPTIMIZED
  // ======================
  getPercentage(value: number, arr: any[]): number {
    if (!arr.length) return 0;

    let max = 1;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].value > max) max = arr[i].value;
    }

    return (value / max) * 100;
  }

  getSourcesCount(): number {
    return Object.keys(this.stats?.par_source || {}).length;
  }

  getSourcesNames(): string {
    return Object.keys(this.stats?.par_source || {}).join(' + ');
  }

  trackByKey(index: number, item: any): string {
    return item.key;
  }
}