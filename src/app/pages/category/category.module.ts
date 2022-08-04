import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { CategoryRoutingModule } from "./category-routing.module";
import { CityPage } from "./pages/city/city.page";
import { GenderPage } from "./pages/gender/gender.page";
import { LanguagePage } from "./pages/language/language.page";

@NgModule({
    declarations: [
        CityPage,
        LanguagePage,
        GenderPage
    ],
    imports: [
        FormsModule,
        CommonModule,
        CategoryRoutingModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule
    ],
    exports: [
        MatSortModule
    ]
  })
export class CategoryModule {}
