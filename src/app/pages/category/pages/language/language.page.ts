import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';
import { Language } from '@core/models/language.model';
import { LanguageService } from '@core/services/basic/language.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
    templateUrl: './language.page.html',
    styleUrls: ['./language.page.css'],
})
export class LanguagePage implements OnInit, AfterViewInit {
    abbName = '';
    name = '';
    selectedId = '';
    isEdited = false;
    currentPage = 0;
    pageSize = 5;

    dataSource = new MatTableDataSource<Language>();
    total = 0;
    displayedColumns: string[] = ['name', 'abbName', 'action'];
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private service: LanguageService,
        private toast: NgToastService,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.getList();
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    getList() {
        this.resetForm();
        this.service
            .getLanguage(this.currentPage, this.pageSize)
            .subscribe((response) => {
                this.dataSource = new MatTableDataSource<Language>(
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
                    description: 'Are you sure to delete this Language',
                    noText: 'Cancle',
                    yesText: 'Delete',
                },
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.service.deleteLanguage(id).subscribe((response) => {
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
            .add({ name: name, abbName: abbName } as Language)
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
        const language = this.dataSource.data.find((x) => x.id == id);
        if (language) {
            this.name = language?.name;
            this.abbName = language?.abbName;
        }
    }

    saveEdit() {
        this.service
            .update({
                id: this.selectedId,
                name: this.name,
                abbName: this.abbName,
            } as Language)
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

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
