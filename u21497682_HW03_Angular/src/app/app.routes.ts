import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductsAddComponent } from './components/products/products-add/products-add.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDashboardComponent } from './components/products/product-dashboard/product-dashboard.component';

export const routes: Routes = [ 
    {path: '', redirectTo: 'login', pathMatch:'full'},
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'products', component:ProductsListComponent},
    {path: 'add-product', component:ProductsAddComponent},
    {path: 'dashboard', component:ProductDashboardComponent},
];
