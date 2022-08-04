import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';
import { Gender } from '@core/models/gender.model';
import { GenderService } from '@core/services/basic/gender.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
    templateUrl: './gender.page.html',
    styleUrls: ['./gender.page.css'],
})
export class GenderPage implements OnInit {
    name: string = '';
    selectedId: string = '';
    isEdited: boolean = false;
    currentPage: number = 0;
    pageSize: number = 5;

    dataSource = new MatTableDataSource<Gender>();
    total: number = 0;
    displayedColumns: string[] = ['name', 'action'];

    constructor(
        private GenderService: GenderService,
        private toast: NgToastService,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.getList();
    }

    getList() {
        this.resetForm();
        this.GenderService
            .getGender(this.currentPage, this.pageSize)
            .subscribe((response) => {
                this.dataSource = new MatTableDataSource<Gender>(
                    response.results,
                );
                this.total = response.total;
            });
    }

    delete(id: string) {
        var gender = this.dataSource.data.find((x) => x.id == id);
        this.dialog
            .open(ConfirmDialogComponent, {
                data: {
                    title: 'Alert',
                    description: 'Are you sure to delete ' + gender?.name,
                    noText: 'Cancle',
                    yesText: 'Delete'
                },
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.GenderService.deleteGender(id).subscribe((response) => {
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

    addItem(name: string) {
        this.GenderService
            .add({ name: name } as Gender)
            .subscribe((response) => {
                this.getList();
                if (response) {
                    this.toast.success({
                        detail: 'SUCCESS',
                        summary: 'Create Successfully',
                        duration: 3000,
                    });
                }
                else{
                    this.toast.error({
                        detail: 'ERROR',
                        summary: 'Name already exists',
                        duration: 3000,
                    })
                }
            }
            );
    }

    edit(id: string) {
        this.selectedId = id;
        this.isEdited = true;
        var gender = this.dataSource.data.find((x) => x.id == id);
        if (gender) {
            this.name = gender?.name;
        }
    }

    saveEdit() {
        this.GenderService
            .update({
                id: this.selectedId,
                name: this.name,
            } as Gender)
            .subscribe((response) => {
                this.getList();
                if (response) {
                    this.toast.success({
                        detail: 'SUCCESS',
                        summary: 'Update Successfully',
                        duration: 3000,
                    });
                }
                else{
                    this.toast.error({
                        detail: 'ERROR',
                        summary: 'Name already exists',
                        duration: 3000,
                    })
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
    }
}
