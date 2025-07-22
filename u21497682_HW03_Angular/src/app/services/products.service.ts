import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand, Product, ProductType } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient) { }

  apiUrl = 'http://localhost:5240/api';


  getProducts()
  {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/Store/getProducts`)
  }

  getBrands()
  {
    return this.httpClient.get<Brand[]>(`${this.apiUrl}/Store/getBrands`)
  }


  getProductTypes()
  {
    return this.httpClient.get<ProductType[]>(`${this.apiUrl}/Store/getProductTypes`)
  }


  addProduct(file:FormData)
  {
    return this.httpClient.post(`${this.apiUrl}/Store/AddProduct`, file)
  }

  
}
