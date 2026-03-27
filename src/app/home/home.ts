import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports:[CommonModule, Navbar]
})
export class Home {

  stats = [
    { label: 'Lieux touristiques', value: 128 },
    { label: 'Gares SNCF', value: 42 },
    { label: 'Trajets train', value: 560 },
    { label: 'kg CO₂ économisés', value: 1240 }
  ];

}