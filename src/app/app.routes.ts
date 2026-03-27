import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Co2 } from './co2/co2';

export const routes: Routes = [
    { path: '', component: Home },
    // { path: 'itineraire', component: ItineraireComponent },
    // { path: 'lieux', component: LieuxComponent },
    { path: 'co2', component: Co2 },
    // { path: 'train', component: TrainComponent }
];
