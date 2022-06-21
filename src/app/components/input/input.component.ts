import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
    @Input() defaultValue: string = '';
    @Input()
    set value(value: string) {
        this.defaultValue = value;
        this.inputChanged.emit(value);
    }
    get value(): string {
        return this.defaultValue;
    }

    @Output()
    inputChanged: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}

    ngOnInit(): void {}
}
