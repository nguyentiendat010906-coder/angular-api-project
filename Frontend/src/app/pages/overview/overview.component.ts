import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { ProductService } from '../../services/product.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  totalProducts = 0;
  totalCustomers = 0;

  latestProducts: any[] = [];
  latestCustomers: any[] = [];

  inventoryChart: any;
  revenueChart: any;

  constructor(
    private productService: ProductService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.productService.getAllProducts().subscribe(products => {
      this.totalProducts = products.length;
      this.latestProducts = products.slice(-4).reverse();
      this.renderCharts();
    });

    this.customerService.getAllCustomers().subscribe(customers => {
      this.totalCustomers = customers.length;
      this.latestCustomers = customers.slice(-4).reverse();
      this.renderCharts();
    });
  }

  renderCharts() {
    this.inventoryChart?.destroy();
    this.revenueChart?.destroy();

    this.inventoryChart = new Chart('inventoryChart', {
      type: 'bar',
      data: {
        labels: ['Sản phẩm', 'Khách hàng'],
        datasets: [{
          data: [this.totalProducts, this.totalCustomers],
          backgroundColor: ['#3b82f6', '#10b981'],
          borderRadius: 8,
          barThickness: 50
        }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });

    this.revenueChart = new Chart('revenueChart', {
      type: 'line',
      data: {
        labels: ['T1','T2','T3','T4','T5','T6'],
        datasets: [{
          data: [3,2,4,3,4,4],
          borderColor: '#f59e0b',
          tension: 0.4,
          pointRadius: 5
        }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });
  }
}
