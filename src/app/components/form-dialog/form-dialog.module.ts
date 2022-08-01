import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormDialogComponent } from "./form-dialog.component";

@NgModule({
    declarations: [FormDialogComponent],
    imports: [
        FormsModule, 
        CommonModule, 
        MatButtonModule, 
        ReactiveFormsModule, 
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [FormDialogComponent],
})
export class FormDialogModule {}