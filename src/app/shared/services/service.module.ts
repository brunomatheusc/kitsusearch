import { NgModule } from '@angular/core';
import { AppService } from './app.service';
import { ApiService } from './api.service';

@NgModule({
    providers: [
        AppService,
        ApiService
    ]
})

export class ServiceModule {}
