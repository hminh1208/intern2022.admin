import { Component, OnInit } from '@angular/core';
import { City } from '@core/models/city.model';
import { CityService } from '@core/services/basic/city.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
    selector: 'app-city',
    templateUrl: './city.component.html',
    styleUrls: ['./city.component.css'],
})
export class CityComponent implements OnInit {
    abbName= '';
    name= '';
    selectedId = '';
    cityList: City[] = [];
    showAdd= false;
    showUpdate= false;
    reactiveForm: any;
    constructor(private service: CityService, private toast: NgToastService) {}

    ngOnInit(): void {
        this.getList();
        // this.reactiveForm=new FormGroup({
        //     "abbName": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z]*')])
        // });
    }

    getList() {
        this.resetForm();
        this.service.getCity(0, 10).subscribe((value) => {
            // this.cityList = value;
        });
    }
    // get abbname(){
    //     return this.reactiveForm.get("abbName")
    // }
    delete(id: string) {
        this.service.deleteCity(id).subscribe((value) => {
            this.toast.success({detail:"Success Message", summary:"Delete Success", duration:5000})
            this.getList();
        });
    }
    clickAddCity(){
        this.resetForm();
        this.showAdd= true;
    }

    addItem(abbName: string, name: string) {
        this.showAdd= true;
        this.showUpdate= false;
        if(name===""|| abbName===""){
            this.toast.error({detail:"Error Message", summary:"Add Fail, Try again later!", duration:5000})
        }
        else{
            this.service.add({ name: name, abbName: abbName } as City).subscribe((value) => {
            this.toast.success({detail:"Success Message", summary:"Add City Success", duration:5000})
            this.getList();
        });}

    }

    edit(id: string){
        this.selectedId = id;
        this.showAdd= false;
        this.showUpdate= true;
        const city = this.cityList.find(x => x.id == id);
        if(city){
            this.name = city?.name;
            this.abbName = city?.abbName;
        }
    }

    saveEdit(){
        this.service.update({id: this.selectedId, name: this.name, abbName: this.abbName } as City).subscribe((value) => {
            this.toast.success({detail:"Success Message", summary:"Update Success", duration:5000})
            this.getList();
        });
    }

    private resetForm(){
        this.selectedId = '';
        this.name = '';
        this.abbName = '';
        this.showUpdate= false;
    }

}
