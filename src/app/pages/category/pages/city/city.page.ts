import { Component, OnInit } from '@angular/core';
import { City } from '@core/models/city.model';
import { CityService } from '@core/services/basic/basic-api.service';

@Component({
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.css'],
})
export class CityPage implements OnInit {
    abbName= '';
    name = '';
    selectedId = '';
    cityList: City[] = [];
    isEdited= false;

    constructor(private service: CityService) {}

    ngOnInit(): void {
        this.getList();
    }

    getList() {
        this.resetForm();
        this.service.getCity().subscribe((value) => {
            this.cityList = value;
        });
    }

    delete(id: string) {
        this.service.deleteCity(id).subscribe((value) => {
            this.getList();
        });
    }

    addItem(abbName: string, name: string) {
        this.service.add({ name: name, abbName: abbName } as City).subscribe((value) => {
            this.getList();
        });
    }

    edit(id: string){
        this.selectedId = id;
        this.isEdited = true;
        const city = this.cityList.find(x => x.id == id);
        if(city){
            this.name = city?.name;
            this.abbName = city?.abbName;
        }
    }

    saveEdit(){
        this.service.update({id: this.selectedId, name: this.name, abbName: this.abbName } as City).subscribe((value) => {
            this.getList();
        });
    }

    cancleEdit(){
        this.resetForm()
    }

    private resetForm(){
        this.selectedId = '';
        this.isEdited = false;
        this.name = '';
        this.abbName = '';
    }
}
