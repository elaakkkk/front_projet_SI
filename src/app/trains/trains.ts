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
  selectedDate = '';

  loading = false;
  error = '';

  constructor(private api: Api,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTrains();
  }

  getToday(): string {
    return new Date().toISOString().slice(0, 10).replaceAll('-', '');
  }

  loadTrains() {

    this.loading = true;

    this.error = '';

    const dateToSend =
      this.selectedDate?.trim()
        ? this.selectedDate.replaceAll('-', '')
        : this.getToday();
        
    this.api.getTrains(30, this.searchTrain, dateToSend)
      .subscribe({
        next: (data: any) => {
          this.trains = data || [];
          this.filteredTrains = this.trains;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.error = 'Erreur chargement trains';
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