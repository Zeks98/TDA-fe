import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tda-fe';
  
  handleFileUploaded(file: File) {
    // Do something with the uploaded file
    console.log('File uploaded:', file);
    // You can also call other methods or perform additional operations here
  }
}
