import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LatexClientService } from '../../../core/services/latex-client.service';
import { ToastService } from '../../../core/services/toast.service.ts.service';

@Component({
  selector: 'app-users-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users-home.component.html',
  styleUrl: './users-home.component.scss'
})
export class UsersHomeComponent implements OnInit {

  clients: any[] = [];
  filteredClients: any[] = [];
  searchText = '';

  newClient = {
    name: '',
    mobile_num: '',
    plot_location: '',
    isHandledByClient: false
  };

  constructor(
    private clientService: LatexClientService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getAllActiveClients().subscribe({
      next: (res: any) => {
        this.clients = res.Data ?? res.data;
        this.filteredClients = this.clients;
      },
      error: () => this.toast.show("Failed to load clients")
    });
  }

  onSearch() {
    const value = this.searchText.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      client.name.toLowerCase().includes(value) ||
      client.client_no.toLowerCase().includes(value)
    );
  }

  addClient() {
    if (!this.newClient.name || !this.newClient.mobile_num || !this.newClient.plot_location) {
      this.toast.show("All fields except handled checkbox are mandatory!");
      return;
    }

    this.clientService.addClient(this.newClient).subscribe({
      next: () => {
        this.toast.show("Client added successfully!");
        this.newClient = { name: '', mobile_num: '', plot_location: '', isHandledByClient: false };
        this.loadClients();
      },
      error: () => this.toast.show("Error adding client!")
    });
  }
}
