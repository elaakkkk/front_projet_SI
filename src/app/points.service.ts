import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from './environments/environment';
import { Point } from '../interfaces/point';
import { Filtres } from '../interfaces/filtres';

@Injectable({ providedIn: 'root' })
export class PointsService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPoints(filtres: Filtres = {}): Observable<Point[]> {
    let params = new HttpParams();
    if (filtres.type)              params = params.set('type', filtres.type);
    if (filtres.domaine)           params = params.set('domaine', filtres.domaine);
    if (filtres.source)            params = params.set('source', filtres.source);
    if (filtres.rayon_km != null)  params = params.set('rayon_km', filtres.rayon_km.toString());
    if (filtres.limit != null)     params = params.set('limit', filtres.limit.toString());
    return this.http.get<Point[]>(`${this.base}/points/`, { params });
  }

  getTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.base}/points/types`);
  }

  getDomaines(): Observable<string[]> {
    return this.http.get<string[]>(`${this.base}/points/domaines`);
  }

  getMetadata(): Observable<{ types: string[]; domaines: string[] }> {
    return forkJoin({ types: this.getTypes(), domaines: this.getDomaines() });
  }
}
