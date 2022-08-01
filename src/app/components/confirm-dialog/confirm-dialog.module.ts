import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "./confirm-dialog.component";

@NgModule({
    declarations: [ConfirmDialogComponent],
    imports: [FormsModule, CommonModule, MatButtonModule, ReactiveFormsModule, MatDialogModule],
    exports: [ConfirmDialogComponent],
})
export class ConfirmDialogModule {}
