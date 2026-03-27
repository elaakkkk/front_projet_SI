import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [CommonModule, Navbar]
})
export class Home implements AfterViewInit {

  stats = [
    { label: 'Lieux touristiques', value: 128 },
    { label: 'Gares SNCF', value: 42 },
    { label: 'Trajets train', value: 560 },
    { label: 'kg CO₂ économisés', value: 1240 }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      // Import dynamique côté client seulement
      const L = await import('leaflet');

      const map = L.map('map').setView([48.103, -1.672], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      const icons = {
        tourisme: L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', iconSize: [32,32], iconAnchor: [16,32] }),
        train: L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/69/69911.png', iconSize: [32,32], iconAnchor: [16,32] }),
        co2: L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/616/616408.png', iconSize: [32,32], iconAnchor: [16,32] })
      };

      L.marker([48.103, -1.672], { icon: icons.tourisme }).addTo(map).bindPopup('Gare de Rennes');
    }
  }
}