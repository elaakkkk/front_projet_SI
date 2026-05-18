import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';
import { Api } from '../services/api';

@Component({
  selector: 'app-trains',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './trains.html',
  styleUrl: './trains.scss',
})
export class Trains implements OnInit {

  trains: any[] = [];
  filteredTrains: any[] = [];

  searchTrain = '';

  loading = false;
  error = '';

  constructor(private api: Api,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTrains();
  }

  loadTrains() {

  this.loading = true;
  this.error = '';

  this.api.getTrains(30).subscribe({

    next: (data: any) => {

      this.trains = data.demo || data;
      this.filteredTrains = this.trains;

      this.loading = false;
      this.cdr.detectChanges();
    },

    error: () => {
      this.error = 'Impossible de charger les trains.';
      this.loading = false;
    }
  });
}

  filterTrains() {

    const value = this.searchTrain.trim().toLowerCase();

    if (!value) {
      this.filteredTrains = this.trains;
      return;
    }

    this.filteredTrains = this.trains.filter(train =>
      train.destination.toLowerCase().includes(value)
    );
  }
}