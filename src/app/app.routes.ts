import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'details/:id', component: DetailComponent }
]