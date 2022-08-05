import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ConfirmDialogComponent } from "@components/confirm-dialog/confirm-dialog.component";
import { Gendermanagerment } from "@core/models/gender.model";
import { GenderService } from "@core/services/basic/gender.service";
import { NgToastService } from "ng-angular-popup";

@Component({
    templateUrl: './gender.page.html',
    styleUrls: ['./gender.page.css'],
})
export class GenderPage implements OnInit {
    name = '';
    selectedId = '';
    isEdited = false;
    currentPage = 0;
    pageSize = 5;

    dataSource = new MatTableDataSource<Gendermanagerment>();
    total = 0;
    displayedColumns: string[] = ['name', 'action'];

    constructor(
        private service: GenderService,
        private toast: NgToastService,
        private dialog: MatDialog,
    ) {}
    ngOnInit(): void {
        this.getList();
    }

    getList() {
        this.resetForm();
        this.service
            .getGender(this.currentPage, this.pageSize)
            .subscribe((response) => {
                this.dataSource = new MatTableDataSource<Gendermanagerment>(
                    response.results,
                );
                this.total = response.total;
            });
    }
    delete(id: string) {
        this.dialog
            .open(ConfirmDialogComponent, {
                data: {
                    title: 'Warning',
                    description: 'Are you sure to delete this Name',
                    noText: 'Cancel',
                    yesText: 'Delete'
                },
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.service.deleteGender(id).subscribe((response) => {
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
        this.service
            .add({ name: name} as Gendermanagerment)
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
        const gender = this.dataSource.data.find((x) => x.id == id);
        if (gender) {
            this.name = gender?.name;
        }
    }

    saveEdit() {
        this.service
            .update({
                id: this.selectedId,
                name: this.name,
            } as Gendermanagerment)
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
    }
}
