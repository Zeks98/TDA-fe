import { Component } from '@angular/core';
import { TdaService } from '../../services/tda/tda.service';

@Component({
  selector: 'app-tda-files',
  templateUrl: './tda-files.component.html',
  styleUrl: './tda-files.component.css'
})
export class TdaFilesComponent {
  files: string[] = []; 

  constructor(private tdaService: TdaService) { }

  ngOnInit(): void {
    this.tdaService.getFiles().subscribe(data => {
      this.files = data;
    });
  }

  onFileClick(fileName: string): void {
  }
}
