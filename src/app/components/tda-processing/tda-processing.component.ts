import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { TdaService } from '../../services/tda/tda.service';

@Component({
  selector: 'app-tda-processing',
  templateUrl: './tda-processing.component.html',
  styleUrl: './tda-processing.component.css'
})
export class TdaProcessingComponent {
  @Output() fileUploaded = new EventEmitter<File>();

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  constructor(private excelUploadService: TdaService) { }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.excelUploadService.uploadExcel(file).subscribe((result) => {
        this.fileUploaded.emit(result);
      });
    }
  }


}
