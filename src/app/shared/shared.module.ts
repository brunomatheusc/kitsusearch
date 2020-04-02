import { NgModule } from '@angular/core';
import { ServiceModule } from './services/service.module';

@NgModule({
    imports: [
        ServiceModule
    ],
    exports: [
        ServiceModule
    ]
})

export class SharedModule {}
