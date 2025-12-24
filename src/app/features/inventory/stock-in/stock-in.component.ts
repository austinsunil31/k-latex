import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  currentTime: Date = new Date();
  timer!: any;

  searchText = '';

stockEntries: StockEntry[] = [
  { itemName: 'Rice Bag', quantity: 50, supplier: 'ABC Traders', time: '09:05:12 AM' },
  { itemName: 'Wheat Flour', quantity: 30, supplier: 'Golden Mills', time: '09:15:45 AM' },
  { itemName: 'Sugar', quantity: 25, supplier: 'Sweet Suppliers', time: '09:22:10 AM' },
  { itemName: 'Salt', quantity: 40, supplier: 'Sea Foods Ltd', time: '09:30:33 AM' },
  { itemName: 'Cooking Oil', quantity: 20, supplier: 'Sunrise Oils', time: '09:40:50 AM' },
  { itemName: 'Tea Powder', quantity: 15, supplier: 'Tata Tea', time: '09:48:05 AM' },
  { itemName: 'Coffee Powder', quantity: 10, supplier: 'Bru Coffee', time: '09:55:19 AM' },
  { itemName: 'Milk Packets', quantity: 60, supplier: 'Milma', time: '10:02:41 AM' },
  { itemName: 'Curd', quantity: 35, supplier: 'Milma', time: '10:10:08 AM' },
  { itemName: 'Butter', quantity: 18, supplier: 'Amul', time: '10:18:54 AM' },
  { itemName: 'Cheese', quantity: 22, supplier: 'Amul', time: '10:25:36 AM' },
  { itemName: 'Eggs', quantity: 100, supplier: 'Farm Fresh', time: '10:32:11 AM' },
  { itemName: 'Chicken', quantity: 45, supplier: 'Fresh Meats', time: '10:40:59 AM' },
  { itemName: 'Fish', quantity: 28, supplier: 'Ocean Catch', time: '10:48:22 AM' },
  { itemName: 'Potatoes', quantity: 70, supplier: 'Veg Mart', time: '10:55:40 AM' },
  { itemName: 'Onions', quantity: 65, supplier: 'Veg Mart', time: '11:03:18 AM' },
  { itemName: 'Tomatoes', quantity: 55, supplier: 'Green Farms', time: '11:10:27 AM' },
  { itemName: 'Chilli Powder', quantity: 12, supplier: 'Spice Hub', time: '11:18:44 AM' },
  { itemName: 'Turmeric Powder', quantity: 14, supplier: 'Spice Hub', time: '11:25:59 AM' },
  { itemName: 'Eggs', quantity: 100, supplier: 'Farm Fresh', time: '10:32:11 AM' },
  { itemName: 'Chicken', quantity: 45, supplier: 'Fresh Meats', time: '10:40:59 AM' },
  { itemName: 'Fish', quantity: 28, supplier: 'Ocean Catch', time: '10:48:22 AM' },
  { itemName: 'Potatoes', quantity: 70, supplier: 'Veg Mart', time: '10:55:40 AM' },
  { itemName: 'Onions', quantity: 65, supplier: 'Veg Mart', time: '11:03:18 AM' },
  { itemName: 'Tomatoes', quantity: 55, supplier: 'Green Farms', time: '11:10:27 AM' },
  { itemName: 'Chilli Powder', quantity: 12, supplier: 'Spice Hub', time: '11:18:44 AM' },
  { itemName: 'Turmeric Powder', quantity: 14, supplier: 'Spice Hub', time: '11:25:59 AM' },
  { itemName: 'Garam Masala', quantity: 9, supplier: 'Everest Spices', time: '11:33:07 AM' }
];

  // modal form model
  newStock: StockEntry = {
    itemName: '',
    quantity: 0,
    supplier: '',
    time: ''
  };

  ngOnInit() {
    this.timer = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  addStock() {
    const now = new Date();
    this.newStock.time = now.toLocaleTimeString();

    this.stockEntries.unshift({ ...this.newStock });

    // reset form
    this.newStock = {
      itemName: '',
      quantity: 0,
      supplier: '',
      time: ''
    };
  }

  get filteredStocks() {
    return this.stockEntries.filter(stock =>
      stock.itemName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      stock.supplier.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  saveStock() {
  if (!this.newStock.itemName || !this.newStock.quantity) {
    alert('Item name and quantity are required');
    return;
  }

  const now = new Date();

  const entry = {
    itemName: this.newStock.itemName,
    quantity: this.newStock.quantity,
    supplier: this.newStock.supplier,
    time: now.toLocaleTimeString()
  };

  // Add to top of table
  this.stockEntries.unshift(entry);

  // Reset form
  this.newStock = {
    itemName: '',
    quantity: 0,
    supplier: '',
    time: ''
  };
}

}
