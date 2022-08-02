<<<<<<< HEAD
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { CategoryRoutingModule } from "./category-routing.module";
import { CityPage } from "./pages/city/city.page";
import { GenderPage } from "./pages/gender/gender.page";

@NgModule({
    declarations: [
        CityPage,
        GenderPage
    ],
=======
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CategoryRoutingModule } from './category-routing.module';
import { CityPage } from './pages/city/city.page';
@NgModule({
    declarations: [CityPage],
>>>>>>> 4c3dd5adfc32f3d75908bbab800a69b8bd6c6b30
    imports: [
        FormsModule,
        CommonModule,
        CategoryRoutingModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
    ],
})
export class CategoryModule {}
