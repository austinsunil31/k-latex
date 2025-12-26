import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LatexClientService } from '../../../core/services/latex-client.service';
import { LatexClient } from '../../../core/models/latex-clients.model';
import { ToastService } from '../../../core/services/toast.service.ts.service';

interface StockEntry {
  itemName: string;
  quantity: number;
  supplier: string;
  time: string;
}

@Component({
  selector: 'app-stock-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-in.component.html',
  styleUrl: './stock-in.component.scss'
})
export class StockInComponent implements OnInit, OnDestroy {
  constructor(private latexclientService: LatexClientService,private toastService: ToastService) {}
clients: LatexClient[] = [];
isHandledByClient: boolean | null = null;
currentTime: Date = new Date();
timer!: any;
selectedClientNo: string = '';
selectedClientName: string = '';
latexQuantity: number | null = null;
noOfCan: number | null = null;
searchText = '';
todayStocks: any[] = [];
editId: number | null = null;
editClientNo: string = '';
editClientName: string = '';
editLatexQuantity: number | null = null;
editCanCount: number | null = null;
drcWeight: number | null = null;


  // modal form model
  newStock: StockEntry = {
    itemName: '',
    quantity: 0,
    supplier: '',
    time: ''
  };

  ngOnInit() {
      this.getTodayEntries();
    this.timer = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }


  get filteredStocks() {
  if (!this.searchText) {
    return this.todayStocks;
  }

  const text = this.searchText.toLowerCase();

  return this.todayStocks.filter(stock =>
    (stock.client_no?.toLowerCase().includes(text)) ||
    (stock.total_weight?.toString().includes(text)) ||
    (stock.final_value?.toString().includes(text))
  );
}

 

onPupUpOpenClick()
{
this.getAllClients()
}

getAllClients(){
  this.latexclientService.getAllClients().subscribe({
  next: (res) => {
    this.clients = res.data;
    console.log(this.clients);
  },
  error: (err) => {
    console.error(err);
  }
});
}

onClientNoChange() {
  const client = this.clients.find(c => c.client_no === this.selectedClientNo);
  if (client) {
    this.selectedClientName = client.name;
    this.isHandledByClient = client.isHandledByClient
  } else {
    this.toastService.show('Client not found');
  }
}

onClientNameChange() {
  const client = this.clients.find(c => c.name === this.selectedClientName);
  if (client) {
    this.selectedClientNo = client.client_no;
    this.isHandledByClient = client.isHandledByClient
  } else {
    this.toastService.show('Client not found');
  }
}

isFormValid(): boolean {
  return (
    !!this.selectedClientNo &&
    !!this.selectedClientName &&
    this.latexQuantity !== null &&
    this.latexQuantity > 0 &&
    this.noOfCan !== null && this.noOfCan > 0 && this.isHandledByClient != null
  );
}

saveLatexEntry() {
  const payload = {
    client_no: this.selectedClientNo,
    clientName: this.selectedClientName,
    total_weight: this.latexQuantity,
    can_count: this.noOfCan,
    //Sample_drc: 5.43,
    isHandledByClient: this.isHandledByClient
  };

  console.log('Submitting latex entry', payload);

  this.latexclientService.addLatexStockIn(payload).subscribe({
    next: (response) => {

      alert('Latex entry saved successfully!');

      this.resetLatexPopup();
    },
    error: (error) => {
      console.error('Error saving entry:', error);

      alert('Failed to save latex entry. Try again.');
    }
  });
}


resetLatexPopup() {
  this.selectedClientNo = '';
  this.selectedClientName = '';
  this.latexQuantity = null;
  this.noOfCan = 1;
  this.isHandledByClient = null
}

getTodayEntries() {
  this.latexclientService.getTodayStockEntries().subscribe({
    next: (response) => {
      this.todayStocks = response.data;
    },
    error: () => {
      this.todayStocks = [];
    }
  });
}

openEditModal(stock: any) {
  this.editId = stock.id;
  this.editClientNo = stock.client_no;
  this.editClientName = stock.name; // Ensure backend sends name
  this.editLatexQuantity = stock.total_weight;
  this.editCanCount = stock.can_count;
}

updateLatexEntry() {
  const payload = {
    id: this.editId,
    total_weight: this.editLatexQuantity,
    can_count: this.editCanCount
  };

  this.latexclientService.updateLatexStock(payload).subscribe({
    next: () => {
      this.toastService.show("Entry Updated Successfully!");
      this.getTodayEntries();
      this.resetEdit();
    },
    error: () => {
      this.toastService.show("Failed to update entry!");
    }
  });
}

resetEdit() {
  this.editId = null;
  this.editClientNo = '';
  this.editClientName = '';
  this.editLatexQuantity = null;
  this.editCanCount = null;
    this.drcWeight = null;
}

updateDrcEntry() {
  if (!this.editId || !this.drcWeight) {
    this.toastService.show("Invalid DRC input!");
    return;
  }

  const payload = {
    Sample_Drc: this.drcWeight,
  };

  this.latexclientService.updateSampleDrc(this.editId, payload).subscribe({
    next: () => {
      this.toastService.show("DRC updated successfully!");
      this.getTodayEntries();
      this.resetEdit();
    },
    error: () => {
      this.toastService.show("Failed to update DRC!");
    }
  });
}


openEditDrcModal(stock: any) {
  this.editId = stock.id;
  this.editClientNo = stock.client_no;
  this.drcWeight = 0; 
}


}
