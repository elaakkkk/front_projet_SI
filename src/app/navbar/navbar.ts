import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  @Output() tabChange = new EventEmitter<string>();

  activeTab = '';

  tabs = [
    { id: 'home', label: 'Accueil', route: '' },
    { id: 'points', label: 'Lieux', route: '' },
    { id: 'itin', label: 'Itinéraire', route: 'itineraire' },
    { id: 'apercu', label: 'Aperçu', route: 'statistiques' }
  ];

  constructor(private router: Router) {}

  setTab(tabId: string) {
    this.activeTab = tabId;
    this.tabChange.emit(tabId);

    const tab = this.tabs.find(t => t.id === tabId);
    if (tab) {
      this.router.navigate(['/' + tab.route]);
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }
}