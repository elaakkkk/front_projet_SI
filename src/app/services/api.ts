import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'http://148.60.11.118';

  constructor(private http: HttpClient) {}

  getItineraireById(pointId: string) {
    return this.http.get(`${this.baseUrl}/itineraires/${pointId}`);
  }

  getItineraireByName(nom: string) {
    return this.http.get(`${this.baseUrl}/itineraires/search/${encodeURIComponent(nom)}`);
  }

  getItineraireByCoords(lat: number, lon: number) {
    return this.http.get(`${this.baseUrl}/itineraires/?lat=${lat}&lon=${lon}`);
  }

  getStatsApercu(ville: string) {
    return this.http.get(`${this.baseUrl}/stats/apercu?ville=${encodeURIComponent(ville)}`);
  }
}