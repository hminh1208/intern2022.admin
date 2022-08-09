import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    shortName = '';
    name = '';
    selectedId = '';
    isAdd = false;
    isEdited = false;
    currentPage = 0;
    pageSize = 5;

    dataSource = new MatTableDataSource<Language>();
    total = 0;
    displayedColumns: string[] = ['name', 'shortName', 'action'];
    sortValue = '';
    sortViews: string[] = ['name', 'name_desc', 'shortName', 'shortName_desc'];

    constructor(
        private service: LanguageService,
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

    newItem() {
        this.isAdd = true;
    }

    addItem(shortName: string, name: string) {
        this.isAdd = false;
        this.service
            .add({ name: name, shortName: shortName } as Language)
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
            this.shortName = language?.shortName;
        }
    }

    saveEdit() {
        this.service
            .update({
                id: this.selectedId,
                name: this.name,
                shortName: this.shortName,
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

    cancle() {
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
        this.isAdd = false;
        this.name = '';
        this.shortName = '';
    }

    applyFilter(event: Event) {
        const searchString = (event.target as HTMLInputElement).value;

        if(searchString === ''){
            this.getList();
        }
        else{
            this.resetForm();
            this.service
                .searchLanguage(this.currentPage, this.pageSize, searchString)
                .subscribe((response) => {
                    this.dataSource = new MatTableDataSource<Language>(
                        response.results,
                    );
                    this.total = response.total;
                });
        }
    }

    onChange(event: Event) {
        console.log(this.sortValue);

        this.resetForm();
        this.service
            .sortLanguage(this.currentPage, this.pageSize, this.sortValue)
            .subscribe((response) => {
                this.dataSource = new MatTableDataSource<Language>(
                    response.results,
                );
                this.total = response.total;
            });
    }
}
