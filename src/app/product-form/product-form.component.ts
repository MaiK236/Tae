import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent  {
  productProfileForm = new FormGroup({
    c1: new FormControl(''),
    c2: new FormControl(''),
    c3: new FormControl(''),
    c4: new FormControl(''),
    c5: new FormControl(''),
    c6: new FormControl(''),
    c7: new FormControl(''),
    c8: new FormControl(''),
    c9: new FormControl('')
  });

  constructor(private http: HttpClient) { }

  products$ !: ProductProfile[] | null;
  searchkey={'key':'a'};

  updateProduct() {
    const headers = { 'Content-Type': 'application/json' };
    this.http.put('http://localhost/bo/product_update.php', this.productProfileForm.value, { headers })
      .subscribe(response => {
        console.log('Product updated successfully', response);
      });
  }
  getProducts2() {
    this.http
         .post <ProductProfile[]>(
            'http://localhost/bo/product_select1.php',
             this.searchkey,
             {
                 headers:{"Content-Type" : "application/json; charset=UTF-8"}
              },
        ).subscribe( 
            (resp:any) => {  this.products$ = resp ; },
        );
   }
}
  
export interface ProductProfile {
  productCode: string;
  productName: string;
  productLine: string;
  productScale: string;
  productVendor: string;
  productDescription: string;
  quantityInStock: number;
  buyPrice: number;
  MSRP: number;
}