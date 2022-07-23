import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';
import { City } from '@core/models/city.model';
import { CityService } from '@core/services/basic/city.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
    templateUrl: './city.page.html',
    styleUrls: ['./city.page.css'],
})
export class CityPage implements OnInit, AfterViewInit {
    abbName: string = '';
    name: string = '';
    selectedId: string = '';
    isEdited: boolean = false;
    currentPage: number = 0;
    pageSize: number = 10;

    dataSource = new MatTableDataSource<City>();
    total: number = 0;
    displayedColumns: string[] = ['name', 'abbName', 'action'];

    constructor(
        private service: CityService,
        private toast: NgToastService,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.getList();
    }

    ngAfterViewInit() {}

    getList() {
        this.resetForm();
        this.service
            .getCity(this.currentPage, this.pageSize)
            .subscribe((response) => {
                this.dataSource = new MatTableDataSource<City>(
                    response.results,
                );
                this.total = response.total;
            });
    }

    delete(id: string) {
        this.dialog
            .open(ConfirmDialogComponent, {
                data: {
                    title: 'Alert',
                    description: 'Are you sure to delete this City',
                    noText: 'Cancle',
                    yesText: 'Delete'
                },
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.service.deleteCity(id).subscribe((response) => {
                        this.getList();

                        if (response) {
                            this.toast.success({
                                detail: 'SUCCESS',
                                summary: 'Delete Successfully',
                                duration: 3000,
                            });
                        }
                    });
                }
            });
    }

    addItem(abbName: string, name: string) {
        this.service
            .add({ name: name, abbName: abbName } as City)
            .subscribe((response) => {
                this.getList();
                if (response) {
                    this.toast.success({
                        detail: 'SUCCESS',
                        summary: 'Create Successfully',
                        duration: 3000,
                    });
                }
            });
    }

    edit(id: string) {
        this.selectedId = id;
        this.isEdited = true;
        var city = this.dataSource.data.find((x) => x.id == id);
        if (city) {
            this.name = city?.name;
            this.abbName = city?.abbName;
        }
    }

    saveEdit() {
        this.service
            .update({
                id: this.selectedId,
                name: this.name,
                abbName: this.abbName,
            } as City)
            .subscribe((response) => {
                this.getList();
                if (response) {
                    this.toast.success({
                        detail: 'SUCCESS',
                        summary: 'Update Successfully',
                        duration: 3000,
                    });
                }
            });
    }

    cancleEdit() {
        this.resetForm();
    }

    public handlePage(e: any) {
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this.getList();
    }

    private resetForm() {
        this.selectedId = '';
        this.isEdited = false;
        this.name = '';
        this.abbName = '';
    }
}
