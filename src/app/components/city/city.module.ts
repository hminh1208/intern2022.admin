import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { CityComponent } from "./city.component";

@NgModule({
    declarations: [CityComponent],
    imports: [FormsModule, CommonModule, MatButtonModule],
    exports: [CityComponent],
})
export class CityModule {}
