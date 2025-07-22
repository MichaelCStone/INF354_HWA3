import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../services/dashboard.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-product-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.scss'
})
export class ProductDashboardComponent implements OnInit {

  brandChart: any;
  typeChart: any;
  topProducts: any[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadBrandChart();
    this.loadTypeChart();
    this.loadTopProducts();
  }

  loadBrandChart(): void {
    this.dashboardService.getProductCountByBrand().subscribe(
      data => {
        const labels = data.map((item: any) => item.brandName);
        const counts = data.map((item: any) => item.count);
        
        this.brandChart = new Chart('brandPieChart', {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              data: counts,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
              ]
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Product Count by Brand'
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      },
      error => {
        console.error('Error loading brand chart data:', error);
      }
    );
  }

  loadTypeChart(): void {
    this.dashboardService.getProductCountByType().subscribe(
      data => {
        const labels = data.map((item: any) => item.typeName);
        const counts = data.map((item: any) => item.count);
        
        this.typeChart = new Chart('typePieChart', {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              data: counts,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
              ]
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Product Count by Type'
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      },
      error => {
        console.error('Error loading type chart data:', error);
      }
    );
  }

  loadTopProducts(): void {
    this.dashboardService.getTopExpensiveProducts().subscribe(
      data => {
        this.topProducts = data;
      },
      error => {
        console.error('Error loading top products:', error);
      }
    );
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(price);
  }
}