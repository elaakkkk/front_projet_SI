import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [CommonModule, Navbar, RouterModule]
})
export class Home implements AfterViewInit {
  stats = {
    total_points: 128,
    dans_1km_de_la_gare: 42,
    carbone_economise: 1240
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  goTo(route: string) {
    this.router.navigate([route]);
  }

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');

      const map = L.map('map').setView([48.103, -1.672], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      const icon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });

      L.marker([48.103, -1.672], { icon }).addTo(map).bindPopup('Gare de Rennes');
    }
  }
}