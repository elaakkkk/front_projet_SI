import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Api {

  private baseUrl = 'http://148.60.11.118';

  constructor(private http: HttpClient) {}

  // 📍 GET /itineraires/{pointId}
  getItineraireById(pointId: string) {
    return this.http.get(`${this.baseUrl}/itineraires/${pointId}`);
  }

  // 🔎 GET /itineraires/search/{nom}
  getItineraireByName(nom: string) {
    return this.http.get(`${this.baseUrl}/itineraires/search/${encodeURIComponent(nom)}`);
  }

  // 🌍 GET /itineraires?lat=...&lon=...
  getItineraireByCoords(lat: number, lon: number) {

    const params = new HttpParams()
      .set('lat', String(lat))
      .set('lon', String(lon));

    return this.http.get(`${this.baseUrl}/itineraires/`, { params });
  }

  // 📊 Stats
  getStatsApercu(ville: string) {
    const params = new HttpParams()
      .set('ville', encodeURIComponent(ville));

    return this.http.get(`${this.baseUrl}/stats/apercu`, { params });
  }
  // 🚆 GET /sncf/trains
  getTrains(limit: number = 10, destination?: string) {

  let params = new HttpParams()
    .set('limit', limit.toString());

  if (destination?.trim()) {
    params = params.set('destination', destination);
  }

  return this.http.get(`${this.baseUrl}/sncf/trains`, { params });
}
}