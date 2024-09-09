import { Routes } from '@angular/router';
import {FormComponent} from './form/form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { DeleteComponent } from './delete/delete.component';

//Form
/*export const routes: Routes = [
{path: '', component: FormComponent},
];*/

//Update
/*export const routes: Routes = [
    {path: '', component: ProductFormComponent},
    ];*/

//Delete
export const routes: Routes = [
    {path: '', component: DeleteComponent},
    ];
