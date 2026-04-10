import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Co2 } from './co2/co2';
import { Itineraire } from './itineraire/itineraire';
import { Statistiques } from './statistiques/statistiques';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'itineraire', component: Itineraire },
    { path: 'statistiques', component: Statistiques },
    // { path: 'lieux', component: LieuxComponent },
    { path: 'co2', component: Co2 },
    // { path: 'train', component: TrainComponent }
];


