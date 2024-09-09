import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  CordID: string = '';

  constructor(private http: HttpClient) {}

  deleteItem() {
    const Code = this.CordID;
    console.log(`Deleting item with ID: ${Code}`);
    this.http.delete(`http://localhost/bo/product_delete.php?productCode=${Code}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting item', error);
          return of(null); // Handle the error gracefully
        })
      )
      .subscribe(response => {
        // Handle successful delete operation
        console.log('Item deleted successfully', response);
      });
  }
}