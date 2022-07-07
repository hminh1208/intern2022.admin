import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { TodoCockpitComponent } from "./todo-cockpit.component";

@NgModule({
    declarations: [TodoCockpitComponent],
    imports: [FormsModule, CommonModule, MatButtonModule],
    exports: [TodoCockpitComponent],
})
export class TodoCockpitModule {}