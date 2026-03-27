import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  @Output() tabChange = new EventEmitter<string>();

  activeTab = 'home';

  tabs = [
    { id: 'home', label: 'Accueil' },
    { id: 'points', label: 'Lieux' },
    { id: 'carbone', label: 'CO₂' },
    { id: 'trains', label: 'Trains' },
    { id: 'itin', label: 'Itinéraire' },
    { id: 'apercu', label: 'Aperçu' }
  ];

  setTab(tab: string) {
    this.activeTab = tab;
    this.tabChange.emit(tab);
  }

  goHome() {
    this.setTab('home');
  }
}