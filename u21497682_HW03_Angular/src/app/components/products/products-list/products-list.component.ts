import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../classes/product';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../shared/material.module';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [MaterialModule,CommonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements AfterViewInit, OnInit { 

  displayedColumns: string[] = ['image', 'name', 'price','brand', 'productTypeName', 'description'];
  dataSource = new MatTableDataSource<Product>();
  constructor(private service: ProductsService, private snackBar: MatSnackBar) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.service.getProducts().subscribe(
      { 
        next: (products) => {
          this.dataSource.data = products;
          this.snackBar.open('Success', 'success', { duration: 2000 });
        }, 
        error: (error) => { 
          this.snackBar.open(error.error, 'error', { duration: 2000 });
        } 
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
