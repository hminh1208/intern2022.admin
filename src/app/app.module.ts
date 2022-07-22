import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebShellModule } from '@shell/web-shell.module';
import { NgToastModule } from 'ng-angular-popup';
import { CoreModule } from './@core/core.module';
import { AppComponent } from './app.component';
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, CoreModule, WebShellModule, BrowserAnimationsModule,ReactiveFormsModule, NgToastModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
