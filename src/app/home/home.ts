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
  if (!isPlatformBrowser(this.platformId)) return;

  const leafletModule = await import('leaflet');
  const L: any = leafletModule.default;

  const gare = L.latLng(48.102, -1.6702);

  const map = L.map('map').setView([48.103, -1.672], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  type Group = 'Musée' | 'Cinéma' | 'Monument';

const colors: Record<Group, string> = {
  Musée: '#e74c3c',
  Cinéma: '#2ecc71',
  Monument: '#9b59b6'
};

const layers: Record<Group, any> = {
  Musée: L.layerGroup().addTo(map),
  Cinéma: L.layerGroup().addTo(map),
  Monument: L.layerGroup().addTo(map)
};

// -----------------------------
// FETCH (BACKEND ONLY)
// -----------------------------
const fetchPoints = async (type: string) => {
  const url = `http://148.60.11.118/points?type=${encodeURIComponent(type)}&limit=500`;
  return await this.http.get<any[]>(url).toPromise();
};

const musees = await fetchPoints('musée');
const cinemas = await fetchPoints('cinéma');
const monuments = await fetchPoints('monument');

// -----------------------------
// DISTANCE
// -----------------------------
const distanceKm = (lat: number, lng: number) => {
  const R = 6371;
  const dLat = (lat - gare.lat) * Math.PI / 180;
  const dLng = (lng - gare.lng) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(gare.lat * Math.PI / 180) *
    Math.cos(lat * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

// -----------------------------
// ADD MARKERS
// -----------------------------
const addMarkers = (data: any[], group: Group) => {
  data.forEach((p: any) => {

    const dist = distanceKm(p.latitude, p.longitude);

    const marker = L.circleMarker([p.latitude, p.longitude], {
      radius: Math.max(4, 10 - dist),
      color: colors[group],
      fillColor: colors[group],
      fillOpacity: 0.8
    }).bindPopup(`
      <b>${p.nom}</b><br/>
      ${p.type}<br/>
      ${dist.toFixed(2)} km
    `);

    layers[group].addLayer(marker);
  });
};

// -----------------------------
// APPLY DATA
// -----------------------------
addMarkers(musees || [], 'Musée');
addMarkers(cinemas || [], 'Cinéma');
addMarkers(monuments || [], 'Monument');

  // -----------------------------
  // GARE
  // -----------------------------
  L.marker(gare, {
    icon: L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    })
  }).addTo(map).bindPopup("Gare de Rennes");

  // -----------------------------
  // FILTRES (LEAFLET CONTROL)
  // -----------------------------
  L.control.layers(null, layers, {
    collapsed: false
  }).addTo(map);

  // -----------------------------
  // LÉGENDE SIMPLE
  // -----------------------------
  const legend = L.control({ position: 'bottomleft' });

  legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'legend');
    div.innerHTML = `
      <div style="background:#0b3d2e;color:white;padding:10px;border-radius:10px">
        <b>Légende</b><br/>
        🔴 Musée<br/>
        🟢 Cinéma<br/>
        🟣 Monument
      </div>
    `;
    return div;
  };

  legend.addTo(map);
}
}