import { Component, OnInit } from '@angular/core';
import { Todo } from '@core/models/todo.model';
import { TodoService } from '@core/services/basic/basic-api.service';

@Component({
    selector: 'app-todo-cockpit',
    templateUrl: './todo-cockpit.component.html',
    styleUrls: ['./todo-cockpit.component.css'],
})
export class TodoCockpitComponent implements OnInit {
    title: string = '';
    todoList: Todo[] = [];

    constructor(private service: TodoService) {}

    ngOnInit(): void {
        this.getList();
    }

    getList() {
        this.service.getTodoItem().subscribe((value) => {
            console.log({ value });
            this.todoList = value;
        });
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
}
