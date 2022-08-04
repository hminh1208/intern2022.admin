import { Component, OnInit } from '@angular/core';
import { Gendermanagerment } from '@core/models/gender.model';
import { GenderService } from '@core/services/basic/gender.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})

export class GenderComponent implements OnInit {
    name= '';

    selectedId = '';
    genderList: Gendermanagerment[] = [];
    showAdd= false;
    showUpdate= false;
    reactiveForm: any;
    constructor(private service: GenderService, private toast: NgToastService) {}

    ngOnInit(): void {
        this.getList();
    }

    getList() {
        this.resetForm();
        this.service.getGender(0, 10).subscribe((value) => {
            // this.cityList = value;
        });
    }
    delete(id: string) {
        this.service.deleteGender(id).subscribe((value) => {
            this.toast.success({detail:"Success Message", summary:"Delete Success", duration:5000})
            this.getList();
        });
    }
    clickAddGender(){
        this.resetForm();
        this.showAdd= true;
    }

    addItem(name: string) {
        this.showAdd= true;
        this.showUpdate= false;
        if(name===""){
            this.toast.error({detail:"Error Message", summary:"Add Fail, Try again later!", duration:5000})
        }
        else{
            this.service.add({ name: name} as Gendermanagerment).subscribe((value) => {
            this.toast.success({detail:"Success Message", summary:"Add Gender Success", duration:5000})
            this.getList();
        });}

    }

    edit(id: string){
        this.selectedId = id;
        this.showAdd= false;
        this.showUpdate= true;

        const gender = this.genderList.find(x => x.id == id);
        if(gender){
            this.name = gender?.name;
        }
    }

    saveEdit(){
        this.service.update({id: this.selectedId, name: this.name} as Gendermanagerment).subscribe((value) => {
            this.toast.success({detail:"Success Message", summary:"Update Success", duration:5000})
            this.getList();
        });
    }
    private resetForm(){
        this.selectedId = '';
        this.name = '';
        this.showUpdate= false;
    }
}
