import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from '@components/confirm-dialog/confirm-dialog.module';
import { FormDialogModule } from '@components/form-dialog/form-dialog.module';
import { WebShellModule } from '@shell/web-shell.module';
import { NgToastModule } from 'ng-angular-popup';
import { CoreModule } from './@core/core.module';
import { AppComponent } from './app.component';
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, CoreModule, WebShellModule, BrowserAnimationsModule, NgToastModule, MatDialogModule, ConfirmDialogModule,FormDialogModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
