import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  tabs = [
    { id: 'home', label: 'Accueil', route: '/' },
    { id: 'itineraire', label: 'Itinéraire', route: '/itineraire' },
    { id: 'statistiques', label: 'Statistiques', route: '/statistiques' }
  ];

  activeTab = 'home';

  constructor(private router: Router) {}

  setTab(tabId: string) {
    const selected = this.tabs.find(tab => tab.id === tabId);
    if (selected) {
      this.activeTab = selected.id;
      this.router.navigateByUrl(selected.route);
    }
  }

  goHome() {
    this.activeTab = 'home';
    this.router.navigateByUrl('/');
  }
}