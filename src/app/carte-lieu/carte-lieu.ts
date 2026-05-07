import { Component,Input } from '@angular/core';
import { Point } from '../../interfaces/point';
@Component({
  selector: 'app-carte-lieu',
  imports: [],
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
      'base_lieux':       '📍',
      'qualite_tourisme': '⭐',
      'festivals':        '🎪'
    };
    return icons[this.point.source ?? ''] ?? '📍';
  }

  getDistanceLabel(): string {
    if (this.point.distance_km == null) return '';
    return this.point.distance_km >= 1
      ? `${this.point.distance_km.toFixed(1)} km`
      : `${(this.point.distance_km * 1000).toFixed(0)} m`;
  }
}
