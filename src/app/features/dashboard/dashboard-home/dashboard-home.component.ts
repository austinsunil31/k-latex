import { Component, OnInit } from '@angular/core';
import { LatexRateService } from '../../../core/services/latex-rate.service';
import { LatexRate } from '../../../core/models/latex-rate.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service.ts.service';

declare var bootstrap: any;

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
  imports: [FormsModule,CommonModule]
})
export class DashboardHomeComponent implements OnInit {

  last10Rates: LatexRate[] = [];
  todayLatexRate: number | null = null;

  constructor(private latexRateService: LatexRateService,    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadRates();
  }

  loadRates() {
    this.latexRateService.getLast10Rates().subscribe({
      next: (res) => this.last10Rates = res,
      error: (err) => console.error(err)
    });
  }

  saveLatexRate() {
    if (!this.todayLatexRate || this.todayLatexRate <= 0) {
      alert("Please enter a valid latex rate!");
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    const newRate: LatexRate = {
      rate_Date: today,
      latex_Rate: this.todayLatexRate
    };

    this.latexRateService.addRate(newRate).subscribe({
      next: () => {
        this.toast.show("Rate Added for today!");
        this.todayLatexRate = null;
        this.closeModal("addLatexRateModal");
        this.loadRates();
      },
      error: (err) => alert(err.error || "An error occurred")
    });
  }

  closeModal(modalId: string) {
    const modalEl = document.getElementById(modalId);
    if (modalEl) {
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();
    }
  }
}
