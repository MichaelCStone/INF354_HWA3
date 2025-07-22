import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { Brand, ProductType } from '../../../classes/product';

@Component({
  selector: 'app-products-add',
  standalone: true,
  imports: [MaterialModule,CommonModule, ReactiveFormsModule],
  templateUrl: './products-add.component.html',
  styleUrl: './products-add.component.scss'
})
export class ProductsAddComponent {

  formData = new FormData();
   brandsData:Brand[]=[]
   productTypesData:ProductType[]=[]
   fileNameUploaded = ''

  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    file: ['', Validators.required],
    price: ['', Validators.required],
    brand: [null, Validators.required],
    producttype: [null, Validators.required],
    description: ['', Validators.required]
  })

  constructor(private service: ProductsService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.GetBrands()
    this.GetProductTypes()
  }

  GetBrands(){
    this.service.getBrands().subscribe(result => {
      let brandList:any[] = result
      brandList.forEach((element) => {
        this.brandsData.push(element)
      });
    });
  }

  GetProductTypes(){
    this.service.getProductTypes().subscribe(result => {
      let productTypeList:any[] = result
      productTypeList.forEach((element) => {
        this.productTypesData.push(element)
      });
    });
  }

  uploadFile = (files: any) => {
    let fileToUpload = <File>files[0];
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.fileNameUploaded = fileToUpload.name
  }

  onSubmit() 
  {
    if(this.productForm.valid)
    {
      this.formData.append('name', this.productForm.get('name')!.value);
      this.formData.append('price', this.productForm.get('price')!.value);
      this.formData.append('description', this.productForm.get('description')!.value);
      this.formData.append('brand', this.productForm.get('brand')!.value);
      this.formData.append('producttype', this.productForm.get('producttype')!.value);  
      this.service.addProduct(this.formData).subscribe(
        () => {
            this.navigateToProducts()
         },
        (error) => {
          
          if (error.error.text === 'Successfully Added Product') {
            this.navigateToProducts();
          } 
          else 
          {

            this.snackBar.open(error.error, 'error', { duration: 2000 });
          }
        });
    };
  }

  navigateToProducts()
  {
    let name = this.formData.append('name', this.productForm.get('name')!.value);
    this.clearData();
    this.router.navigateByUrl('products').then((navigated: boolean) => 
      {
        if(navigated) {
          this.snackBar.open(name + ` created successfully`, 'X', {duration: 5000});
        }
       });
  }

  clearData()
  {
    this.formData.delete("file");
    this.formData.delete("name");
    this.formData.delete("price");
    this.formData.delete("description");
    this.formData.delete("brand");
    this.formData.delete("producttype");
  }

}
