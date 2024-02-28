import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TdaService } from '../../services/tda/tda.service';
import { Tda } from '../../models/tda';
import { TdaSingle } from '../../models/tda-single';

@Component({
  selector: 'app-tda-processing',
  templateUrl: './tda-processing.component.html',
  styleUrl: './tda-processing.component.css'
})
export class TdaProcessingComponent implements OnInit {
  @Output() fileUploaded = new EventEmitter<File>();

  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  users: Tda[] = [];
  files: TdaSingle[] = [];

  constructor(private excelUploadService: TdaService) { }

  ngOnInit(): void {
    this.getFiles();
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

getFileById(id: string){
  this.excelUploadService.getContentById(id).subscribe((result) => {
    this.users = [];
    this.users = result;
  })
}
  
  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.excelUploadService.uploadExcel(file).subscribe((result) => {
        // this.fileUploaded.emit(result);
        this.users = result;
      });
    }
  }

}