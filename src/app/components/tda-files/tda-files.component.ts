import { Component } from '@angular/core';
import { TdaService } from '../../services/tda/tda.service';

@Component({
  selector: 'app-tda-files',
  templateUrl: './tda-files.component.html',
  styleUrl: './tda-files.component.css'
})
export class TdaFilesComponent {
  files: string[] = []; // Assuming you're receiving file names

  constructor(private tdaService: TdaService) { }

  ngOnInit(): void {
    this.tdaService.getFiles().subscribe(data => {
      this.files = data;
    });
  }

  onFileClick(fileName: string): void {
    // Logic to handle file click
    // You can navigate to another component or perform any action you want
    console.log('File clicked:', fileName);
  }
}
