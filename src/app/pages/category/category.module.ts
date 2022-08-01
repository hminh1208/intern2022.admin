import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { CategoryRoutingModule } from "./category-routing.module";
import { CityPage } from "./pages/city/city.page";

@NgModule({
    declarations: [
        CityPage
    ],
    imports: [
        FormsModule,
        CommonModule,
        CategoryRoutingModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule
    ],
  })
export class CategoryModule {}
