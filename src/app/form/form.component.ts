import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule,FormGroup,FormControl} from '@angular/forms';
//----------http api ภายนอก
import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable,of  } from 'rxjs';
import { catchError, map  } from 'rxjs/operators';
import { error } from 'node:console';
console.error()

//chat
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost/bo/product_select.php';

  constructor(private http: HttpClient) {}

  // Method to fetch products from PHP backend
  getProducts(): Observable<ProductProfile[]> {
    return this.http.get<ProductProfile[]>(this.apiUrl);
  }
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
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

  onSubmit() {
   // console.warn(this.productProfile.value);
    this.http.post<number>(
      //apiปลายทาง
        'http://localhost/classicmodel/products_insert.php', 
      //ส่งข้อมูลอะไร
        this.productProfileForm.value,
      //parameter เสริม
    ).subscribe({
        next:(resp:number)=>{
            console.log(resp);
        },
        error:(err)=> alert('errrrrrrrr')
    });
  }
  onSubmit2():void{
    const hd = new HttpHeaders()
    .set('content-type', 'application/x-www-form-urlencoded');
    this.http.post<number>('http://localhost/bo/product_insert.php',
       this.productProfileForm.value, 
      {
      reportProgress: true,
      observe: 'events',
      headers:hd
      },
  ).subscribe(event => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          console.log('Uploaded ' + event.loaded + ' out of ' + event.total + ' bytes')
          break;
        case HttpEventType.Response:
          console.log('Finished uploading!' + event.body);
          break;
      }
    });

    //   CallBack Function
    //   Arrow Function
    //   ()=>{}
    //   http12345 => {} //1พารามืเตอร์
    //   () => console.log //คำสั่งเดียว noปีกกา, no semicolon ได้
  }

  updateProduct() {
    const headers = { 'Content-Type': 'application/json' };
    this.http.put('http://localhost/bo/product_update.php', this.productProfileForm.value, { headers })
      .subscribe(response => {
        console.log('Product updated successfully', response);
      });
  }

  products$ !: ProductProfile[] | null;
  searchkey={'key':'a'};
  getProducts() {
    this.http
         .get<ProductProfile[]>(
            'http://localhost/classicmodel/products_select.php',
            {params: this.searchkey}
         ).pipe(
             catchError( () => of(null) ),
             map( (data) => {
                 if(data == null){ return [];}
                 else {return data;}
             })
        ).subscribe((data)=>{
             this.products$ = data;
           //  console.log(data);
             console.log(this.products$);
         }
        );
   }
   getProducts2() {
    this.http
         .post <ProductProfile[]>(
            'http://localhost/bo/product_select.php',
             this.searchkey,
             {
                 headers:{"Content-Type" : "application/json; charset=UTF-8"}
              },
        ).subscribe( 
            (resp:any) => {  this.products$ = resp ; },
        );
   }
   constructor(private http: HttpClient) {}
    // This service can now make HTTP requests via `this.http`.
}
//constructure อยู่ใน FormComponent

export interface ProductProfile{
  productCode : string;
  productName : string;
  productLine : string;
  productScale : string;
  productVendor : string;
  productDescription : string;
  quantityInStock : number;
  buyPrice : number;
  MSRP : number;
}