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
    title: string = '';
    showContent: boolean = false;
    todoList: Todo[] = [];

    constructor(
        private themeService: ThemeService,
        private service: TodoService,
    ) {}

    ngOnInit() {}

    inputChanged(value: any) {
        this.title = value;
    }

    hideContent() {
        this.showContent = !this.showContent;
    }

    onClickChangeTheme(theme: ThemeList): void {
        this.themeService.setTheme(theme);
    }
}
