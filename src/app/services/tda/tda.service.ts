import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TdaSingle } from '../../models/tda-single';
import { TdaFilesComponent } from '../../components/tda-files/tda-files.component';
import { TdaContentListComponent } from '../../components/tda-content-list/tda-content-list.component';

@Injectable({
  providedIn: 'root'
})
export class TdaService {

  private baseUrl = 'http://localhost:8080';
  private filesUrl = 'files';
  private filteredContentUrl = 'filter'


  constructor(private http: HttpClient) { }

  uploadExcel(file: File): Observable<any> {
    return new Observable<any>((observer) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result?.toString().split(',')[1];
        this.http.post<any>(`${this.baseUrl}/upload`, { excelFile: base64String }).subscribe(
          (response) => {
            console.log(response);
            observer.next(response);
            observer.complete();
          },
          (error) => {
            console.log(error);
            observer.error(error);
          }
        );
      };
      reader.onerror = (error) => {
        console.log(error);
        observer.error(error);
      };
    });

  }

  getContentById(id: string): Observable<any> {
    return this.http.get<TdaContentListComponent[]>(`${this.baseUrl}/${this.filesUrl}/${id}`);
  }

  getFiles(): Observable<any> {
    return this.http.get<TdaSingle[]>(`${this.baseUrl}/${this.filesUrl}`).pipe(
      map((response) => {
        console.log(response);
        return response;
      })
    );
  }

  getFilteredContent(fileId: number, searchTerm: string): Observable<any> {
    return this.http.get<TdaContentListComponent[]>(`${this.baseUrl}/${this.filteredContentUrl}/${fileId}/${searchTerm.length < 1 ? '!' : searchTerm}`);
  }
}