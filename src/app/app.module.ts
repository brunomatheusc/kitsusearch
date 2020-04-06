import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { PaginationComponent } from './pagination/pagination.component';

import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ListComponent,
        DetailComponent,
        PaginationComponent,
        HomeComponent,
        LoaderComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(ROUTES),
        FontAwesomeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
