import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Co2 } from './co2/co2';
import { Itineraire } from './itineraire/itineraire';
import { Statistiques } from './statistiques/statistiques';
import { PageLieuxTouristiques } from './page-lieux-touristiques/page-lieux-touristiques';
import { Trains } from './trains/trains';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'co2', component: Co2 },
  { path: 'itineraire', component: Itineraire },
  { path: 'statistiques', component: Statistiques },
  { path: 'apercu', component: Statistiques },
  { path: '', component: Home },
  { path: 'itineraire', component: Itineraire },
  { path: 'statistiques', component: Statistiques },
  { path: 'lieux', component: PageLieuxTouristiques },
  { path: 'co2', component: Co2 },
  { path: 'trains', component: Trains },
];
