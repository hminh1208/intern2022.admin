import { Component, OnInit } from '@angular/core';
import { City } from '@core/models/city.model';
import { CityService } from '@core/services/basic/basic-api.service';

@Component({
    selector: 'app-todo-cockpit',
    templateUrl: './todo-cockpit.component.html',
    styleUrls: ['./todo-cockpit.component.css'],
})
export class TodoCockpitComponent implements OnInit {
    title: string = '';
    CityList: City[] = [];

    constructor(private service: CityService) {}

    ngOnInit(): void {
        this.getList();
    }

    getList() {
        this.service.getCity().subscribe((value) => {
            console.log({ value });
            this.CityList = value;
        });
    }

    delete(id: string) {
        this.service.deleteCity(id).subscribe((value) => {
            this.getList();
        });
    }

    addItem(title: string) {
        this.service.addCity({ name: title, abbName: title } as City).subscribe((value) => {
            this.getList();
        });
    }
}
