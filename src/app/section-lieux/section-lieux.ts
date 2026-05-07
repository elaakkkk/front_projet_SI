import { Component,Input } from '@angular/core';
import { Point } from '../../interfaces/point';
import { CommonModule } from '@angular/common';
import { CarteLieu } from '../carte-lieu/carte-lieu';
@Component({
  selector: 'app-section-lieux',
  imports: [
    CommonModule, CarteLieu
  ],
  templateUrl: './section-lieux.html',
  styleUrl: './section-lieux.scss',
})
export class SectionLieux {
  @Input() points: Point[] = [];
  @Input() loading = false;
}
