import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Itineraire } from './itineraire/itineraire';
import { Statistiques } from './statistiques/statistiques';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'itineraire', component: Itineraire },
  { path: 'statistiques', component: Statistiques }
];