import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TdaService } from '../../services/tda/tda.service';
import { Tda } from '../../models/tda';
import { TdaSingle } from '../../models/tda-single';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tda-processing',
  templateUrl: './tda-processing.component.html',
  styleUrl: './tda-processing.component.css'
})

export class TdaProcessingComponent implements OnInit {
  @Output() fileUploaded = new EventEmitter<File>();

  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  users: Tda[] | undefined;
  files: TdaSingle[] = [];
  fileId: number = 0;
  searchTerm: string = "";
  searchTermChanged: Subject<string> = new Subject<string>();
  currentPage = 1;
  pageSize = 10;
  currentDocumentId: string | undefined;
  pages: Array<number> = new Array<number>;

  constructor(private excelUploadService: TdaService) { }

  ngOnInit(): void {
    this.getFiles();
    this.searchTermChanged.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((searchTerm: string) => {
      this.searchData();
    });
  }

  getFiles() {
    this.excelUploadService.getFiles().subscribe({
      next: response => {
        if (response != null) {

          this.files = response;
        }
      }
    });
  }

  getFileById(id: string) {
    this.currentDocumentId = id;
    this.excelUploadService.getContentById(id, 'firstName', this.currentPage, this.pageSize).subscribe((result) => {
      this.fileId = Number.parseInt(id);
      this.users = [];
      this.users = result.data;
      this.pages = Array.from({ length: result.totalPages }, (_, i) => i + 1);
      console.log(this.pages);
    })
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.excelUploadService.uploadExcel(file).subscribe((result) => {
        this.users = result;
      });
    }
  }

  onSearchTermChange(searchTerm: string): void {
    this.searchTermChanged.next(searchTerm);
  }

  searchData(): void {
    this.excelUploadService.getFilteredContent(this.fileId, this.searchTerm, 'firstName').subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  editRow(updateUser: Tda): void {
    updateUser.isEdit = true;
    this.excelUploadService.updateRow(updateUser.id, updateUser).subscribe(
      (data: any) => {
        this.users?.map(item => {
          if (item.id == updateUser.id) {
            return { ...item, data };
          }

          return item;
        })

      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    )
  }

  saveRow(user: Tda): void {
    user.isEdit = false;

  }

  toggleEditMode(user: Tda): void {
    user.isEdit = !user.isEdit;
  }

  saveChanges(user: Tda): void {
    user.isEdit = true;
    this.excelUploadService.updateRow(user.id, user).subscribe(
      (data: Tda) => {
        this.users?.map(item => {
          if (item.id == user.id) {
            this.toggleEditMode(user);
            return { ...item, data };
          }

          return item;
        })
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    )
  }


  deleteRow(id: number) {
    this.excelUploadService.deleteRow(id).subscribe(
      (data: any) => {
        if (data == true) {
          let itemIndex = this.users?.findIndex(x => x.id == id);
          this.users?.splice(itemIndex!, 1);
        }

      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    )
  }
  setCurrentPage(selectedPage: number): void {
    this.currentPage = selectedPage;
    this.getFileById(this.currentDocumentId!);
  }

  nextPage(): void {
    this.currentPage++;
    this.getFileById(this.currentDocumentId!);
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getFileById(this.currentDocumentId!);
    }

  }
}