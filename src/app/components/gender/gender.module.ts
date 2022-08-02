import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { GenderComponent } from "./gender.component";

@NgModule({
    declarations: [GenderComponent],
    imports: [FormsModule, CommonModule, MatButtonModule, ReactiveFormsModule],
    exports: [GenderComponent],
})
export class GenderModule {}
