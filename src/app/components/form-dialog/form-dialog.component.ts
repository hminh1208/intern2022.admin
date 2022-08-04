import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-form-dialog',
    templateUrl: './form-dialog.component.html',
})
export class FormDialogComponent  {
    constructor(
        public dialogRef: MatDialogRef<FormDialogComponent>,
       @Inject(MAT_DIALOG_DATA) public data: any,

    ) {}

    onNoClick(): void {
        this.dialogRef.close();
      }
   
}