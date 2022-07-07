import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputModule } from '@components/input/input.module';
import { TodoCockpitModule } from '@components/todo-cockpit/todo-cockpit.module';
import { HomePage } from './home.page';
@NgModule({
    declarations: [HomePage],
    imports: [
        CommonModule,
        DragDropModule,
        FormsModule,
        InputModule,
        TodoCockpitModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage,
                data: {
                    title: 'Home',
                    description:
                        'Angular starter for enterprise-grade front-end projects, built under a clean architecture that helps to scale and maintain a fast workflow.',
                    robots: 'index, follow',
                },
            },
        ]),
    ],
})
export class HomeModule {}
