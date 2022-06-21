import { Component } from '@angular/core';
import { Todo } from '@core/models/todo.model';
import { TodoService } from '@core/services/basic/basic-api.service';
import { ThemeList, ThemeService } from '@core/services/theme';
import { ROUTER_UTILS } from '@core/utils/router.utils';

@Component({
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.css'],
})
export class HomePage {
    path = ROUTER_UTILS.config;
    theme = ThemeList;
    title: string = 'Add item';
    showContent: boolean = false;
    todoList: Todo[] = [];

    constructor(
        private themeService: ThemeService,
        private service: TodoService,
    ) {}

    ngOnInit() {
        this.getList();
    }

    getList() {
        this.service.getTodoItem().subscribe((value) => {
            console.log({ value });
            this.todoList = value;
        });
    }

    inputChanged(value: any) {
        this.title = value;
    }

    delete(id: string) {
        this.service.deleteItem(id).subscribe((value) => {
            this.getList();
        });
    }

    addItem(title: string) {
        this.service.addItem({ title } as Todo).subscribe((value) => {
            this.getList();
        });
    }
    hideContent() {
        this.showContent = !this.showContent;
    }

    onClickChangeTheme(theme: ThemeList): void {
        this.themeService.setTheme(theme);
    }
}
