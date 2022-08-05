import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';
import { FormDialogComponent } from '@components/form-dialog/form-dialog.component';
import { City } from '@core/models/city.model';
import { CityService } from '@core/services/basic/city.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
    templateUrl: './city.page.html',
    styleUrls: ['./city.page.css'],
})
export class CityPage implements OnInit, AfterViewInit {
    shortName = '';
    name = '';
    selectedId = '';
    currentPage = 0;
    pageSize = 5;

    dataSource = new MatTableDataSource<City>();
    total = 0;
    displayedColumns: string[] = ['name', 'shortName', 'action'];

    constructor(
        private service: CityService,
        private toast: NgToastService,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.getList();
    }

    ngAfterViewInit() {
        return;
    }

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
                    noText: 'Cancel',
                    yesText: 'Delete',
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

    editCity(id: string) {
        this.selectedId = id;
        const city = this.dataSource.data.find((x) => x.id == id);
        if (city) {
            this.name = city?.name;
            this.shortName = city?.shortName;
        }
        const dialogRef = this.dialog.open(FormDialogComponent, {
            data: {
                id: this.selectedId,
                title: 'Edit City',
                noText: 'Cancel',
                yesText: 'Update',
                shortName: this.shortName,
                name: this.name,
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.service
                    .update({
                        id: result.id,
                        name: result.name,
                        shortName: result.shortName,
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
        });
    }

    addCity() {
        this.resetForm();
        const dialogRef = this.dialog.open(FormDialogComponent, {
            data: {
                title: 'Add City',
                noText: 'Cancel',
                yesText: 'Add',
                shortName: this.shortName,
                name: this.name,
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result.name == '' || result.shortName == '') {
                this.toast.error({
                    detail: 'Error Message',
                    summary: 'Add Fail, Try again later!',
                    duration: 5000,
                });
            } else {
                if (result) {
                    this.service
                        .add({
                            name: result.name,
                            shortName: result.shortName,
                        } as City)
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
            }
        });
    }

    public handlePage(e: any) {
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this.getList();
    }

    private resetForm() {
        this.selectedId = '';
        this.name = '';
        this.shortName = '';
    }

    applyFilter($event: any) {
        const filterValue = $event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
