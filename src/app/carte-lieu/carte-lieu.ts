import { Component,Input } from '@angular/core';
import { Point } from '../../interfaces/point';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-carte-lieu',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './carte-lieu.html',
  styleUrl: './carte-lieu.scss',
})
export class CarteLieu {

  @Input() point!: Point;


  getSourceLabel(): string {
    const labels: Record<string, string> = {
      'base_lieux':        'BASE LIEUX',
      'qualite_tourisme':  'QUALITÉ TOURISME',
      'festivals':         'FESTIVAL'
    };
    return labels[this.point.source ?? ''] ?? this.point.source ?? '';
  }

  getSourceIcon(): string {
    const icons: Record<string, string> = {
      'base_lieux':       'place',
      'qualite_tourisme': 'star',
      'festivals':        'celebration'
    };
    return icons[this.point.source ?? ''] ??  'place';
  }

  getDistanceLabel(): string {
    if (this.point.distance_km == null) return '';
    return this.point.distance_km >= 1
      ? `${this.point.distance_km.toFixed(1)} km`
      : `${(this.point.distance_km * 1000).toFixed(0)} m`;
  }
  voirItineraire(): void {
     console.log('point complet', this.point);
    const lat=this.point.latitude;
    const lon=this.point.longitude;
    console.log('coords', lat, lon);
    if (lat==null || lon==null) return ;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    console.log('done')
    window.open(url, '_blank');
  
  }
}
