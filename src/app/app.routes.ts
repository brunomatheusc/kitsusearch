import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

export const ROUTES: Routes = [
    { path: '', component: ListComponent },
    { path: 'details/:id', component: DetailComponent }
]