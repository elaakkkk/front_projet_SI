import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [CommonModule, Navbar, RouterModule]
})
export class Home implements AfterViewInit {

  stats = {
    total_points: 985,
    dans_1km_de_la_gare: 40,
    carbone_economise: 1240
  };
  
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchStats();
    }
  }

  fetchStats() {
    this.http.get('http://148.60.11.118/stats/apercu').subscribe({
      next: (res: any) => {
        this.stats.total_points = res.total_points ;
        this.stats.dans_1km_de_la_gare = res.dans_1km_de_la_gare ;
        this.stats.carbone_economise = res.par_source?.carbone ;
      }
    });
  }

  goTo(page: string) {
    // navigation vers la page correspondante
    this.router.navigate([page]);
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router,private http: HttpClient) {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      // Import dynamique côté client seulement
      const leafletModule = await import('leaflet');
      const L = leafletModule.default;

      const map = L.map('map').setView([48.103, -1.672], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      const icons = {
        tourisme: L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', iconSize: [32,32], iconAnchor: [16,32] })
      };

      L.marker([48.103, -1.672], { icon: icons.tourisme }).addTo(map).bindPopup('Gare de Rennes');
    }
  }
}